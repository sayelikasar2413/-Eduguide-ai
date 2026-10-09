from flask import Flask, jsonify, request
from flask_cors import CORS
from urllib.parse import unquote

from database.mongodb import test_connection, colleges_collection
from database.college_database import add_college, get_all_colleges


app = Flask(__name__)
CORS(app)


# =========================================
# HOME
# =========================================

@app.route("/")
def home():
    return jsonify({
        "message": "EduGuide AI Backend is running"
    })


# =========================================
# TEST MONGODB
# =========================================

@app.route("/api/test-db")
def test_db():
    connected = test_connection()

    if connected:
        return jsonify({
            "success": True,
            "message": "MongoDB connected successfully!"
        })

    return jsonify({
        "success": False,
        "message": "MongoDB connection failed."
    }), 500


# =========================================
# TEST COLLEGE
# =========================================

@app.route("/api/test-college")
def test_college():

    college = {
        "name": "MIT ADT University",
        "location": "Pune",
        "course": "B.Tech Computer Science",
        "fees": 200000
    }

    college_id = add_college(college)

    return jsonify({
        "success": True,
        "message": "College added successfully!",
        "college_id": college_id
    })


# =========================================
# GET ALL COLLEGES
# =========================================

@app.route("/api/colleges")
def get_colleges():

    colleges = get_all_colleges()

    return jsonify({
        "success": True,
        "count": len(colleges),
        "colleges": colleges
    })


# =========================================
# COMPARE COLLEGES
# IMPORTANT:
# This route MUST come before
# /api/colleges/<college_name>
# =========================================

@app.route("/api/colleges/compare")
def compare_colleges():

    names = request.args.get("names", "")

    # No names provided
    if not names:
        return jsonify({
            "success": False,
            "message": "No colleges selected for comparison."
        }), 400

    # Convert URL encoded names back to normal text
    college_names = [
        unquote(name).strip()
        for name in names.split(",")
        if name.strip()
    ]

    # Need at least 2 colleges
    if len(college_names) < 2:
        return jsonify({
            "success": False,
            "message": "Please provide at least two colleges to compare."
        }), 400

    # Get selected colleges from MongoDB
    colleges = list(
        colleges_collection.find(
            {
                "name": {
                    "$in": college_names
                }
            },
            {
                "_id": 0
            }
        )
    )

    # Check whether enough colleges were found
    if len(colleges) < 2:
        return jsonify({
            "success": False,
            "message": "The selected colleges could not be found in the database."
        }), 404

    return jsonify({
        "success": True,
        "count": len(colleges),
        "colleges": colleges
    })


# =========================================
# GET SINGLE COLLEGE
# IMPORTANT:
# Keep this AFTER /compare
# =========================================

@app.route("/api/colleges/<college_name>")
def get_single_college(college_name):

    college_name = unquote(college_name)

    college = colleges_collection.find_one(
        {
            "name": college_name
        },
        {
            "_id": 0
        }
    )

    if not college:
        return jsonify({
            "success": False,
            "message": "College not found."
        }), 404

    return jsonify({
        "success": True,
        "college": college
    })


# =========================================
# PERSONALIZED RECOMMENDATIONS
# =========================================

def get_personalized_recommendations(
    profile,
    preferences,
    colleges
):

    course = str(
        preferences.get("course", "")
    ).strip().lower()

    location = str(
        preferences.get("location", "")
    ).strip().lower()

    percentage = float(
        profile.get("percentage", 0) or 0
    )

    scored_colleges = []

    for college in colleges:

        score = 0

        college_name = college.get(
            "name",
            "Unknown College"
        )

        college_location = str(
            college.get(
                "location",
                college.get("city", "")
            )
        ).lower()

        college_courses = college.get(
            "courses",
            []
        )

        # -----------------------------
        # COURSE MATCH
        # -----------------------------

        course_match = False

        if course:

            for college_course in college_courses:

                if course in str(
                    college_course
                ).lower():

                    course_match = True
                    break

        if course_match:
            score += 50

        # -----------------------------
        # LOCATION MATCH
        # -----------------------------

        location_match = False

        if location:

            if (
                location == "any"
                or location in college_location
            ):
                location_match = True

        if location_match:
            score += 30

        # -----------------------------
        # ACADEMIC MATCH
        # -----------------------------

        academic_match = False

        if percentage >= 75:

            academic_match = True
            score += 20

        elif percentage >= 60:

            academic_match = True
            score += 10

        # -----------------------------
        # BUDGET
        # -----------------------------

        # Budget is not scored because
        # verified fee data is not available
        # for all colleges.

        budget_match = None

        scored_colleges.append({

            "name": college_name,

            "location": college.get(
                "location",
                college.get("city", "")
            ),

            "type": college.get(
                "type",
                "Not available"
            ),

            "courses": college_courses,

            "match_score": score,

            "course_match": course_match,

            "location_match": location_match,

            "academic_match": academic_match,

            "budget_match": budget_match
        })

    # Highest score first
    scored_colleges.sort(
        key=lambda item: item["match_score"],
        reverse=True
    )

    return scored_colleges[:5]


# =========================================
# CHATBOT
# =========================================

@app.route("/api/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        if not data:

            return jsonify({
                "success": False,
                "message": "No request data received."
            }), 400

        question = str(
            data.get("question", "")
        ).strip()

        if not question:

            return jsonify({
                "success": False,
                "message": "Please enter a question."
            }), 400

        question_lower = question.lower()

        profile = data.get(
            "profile",
            {}
        )

        preferences = data.get(
            "preferences",
            {}
        )

        colleges = list(
            colleges_collection.find(
                {},
                {
                    "_id": 0
                }
            )
        )

        # =====================================
        # COLLEGE RECOMMENDATION QUESTIONS
        # =====================================

        college_question = (

            "college" in question_lower

            or "recommend" in question_lower

            or "suitable" in question_lower

            or "best for me" in question_lower

        )

        if college_question:

            recommendations = (
                get_personalized_recommendations(
                    profile,
                    preferences,
                    colleges
                )
            )

            if not recommendations:

                return jsonify({
                    "success": True,
                    "answer":
                        "I could not find suitable "
                        "college recommendations "
                        "from the current database."
                })

            course = preferences.get(
                "course",
                "your selected course"
            )

            location = preferences.get(
                "location",
                "your preferred location"
            )

            percentage = profile.get(
                "percentage",
                "your academic percentage"
            )

            answer_lines = [

                "Based on your current profile, "
                "these colleges are the strongest matches:",

                "",

                f"Course: {course}",

                f"Location: {location}",

                f"Academic Percentage: {percentage}%",

                ""
            ]

            for index, college in enumerate(
                recommendations,
                start=1
            ):

                answer_lines.append(
                    f"{index}. "
                    f"{college['name']} — "
                    f"{college['match_score']}% match"
                )

                reasons = []

                if college["course_match"]:
                    reasons.append("course match")

                if college["location_match"]:
                    reasons.append("location match")

                if college["academic_match"]:
                    reasons.append(
                        "academic profile considered"
                    )

                if reasons:

                    answer_lines.append(
                        "   Reason: "
                        + ", ".join(reasons)
                    )

            answer_lines.append("")

            answer_lines.append(
                "These are prototype match scores "
                "based on the available college data. "
                "They are not admission guarantees."
            )

            return jsonify({
                "success": True,
                "answer": "\n".join(answer_lines)
            })


        # =====================================
        # COLLEGE COUNT
        # =====================================

        if (
            "how many" in question_lower
            and "college" in question_lower
        ):

            college_names = [

                college.get("name")

                for college in colleges

                if college.get("name")

            ]

            answer = (

                f"EduGuide AI currently has "
                f"{len(colleges)} colleges "
                f"in its database.\n\n"

                "Available colleges:\n"

                + "\n".join(
                    f"• {name}"
                    for name in college_names
                )

            )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # COURSES
        # =====================================

        if (
            "course" in question_lower
            or "branch" in question_lower
        ):

            courses = set()

            for college in colleges:

                for course in college.get(
                    "courses",
                    []
                ):

                    courses.add(course)

            if courses:

                answer = (

                    "Courses currently available "
                    "in the database:\n\n"

                    + "\n".join(
                        f"• {course}"
                        for course in sorted(courses)
                    )

                )

            else:

                answer = (
                    "Course information is "
                    "not available yet."
                )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # LOCATION
        # =====================================

        if (
            "pune" in question_lower
            or "mumbai" in question_lower
            or "location" in question_lower
            or "city" in question_lower
        ):

            matching_colleges = []

            for college in colleges:

                location_value = str(
                    college.get(
                        "location",
                        ""
                    )
                ).lower()

                city_value = str(
                    college.get(
                        "city",
                        ""
                    )
                ).lower()

                if (
                    "pune" in question_lower
                    and (
                        "pune" in location_value
                        or city_value == "pune"
                    )
                ):

                    matching_colleges.append(
                        college.get("name")
                    )

                elif (
                    "mumbai" in question_lower
                    and (
                        "mumbai" in location_value
                        or city_value == "mumbai"
                    )
                ):

                    matching_colleges.append(
                        college.get("name")
                    )

            if matching_colleges:

                answer = (

                    "Colleges matching your "
                    "location query:\n\n"

                    + "\n".join(
                        f"• {name}"
                        for name in matching_colleges
                    )

                )

            else:

                answer = (
                    "I could not find colleges "
                    "matching that location."
                )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # ELIGIBILITY
        # =====================================

        if (
            "eligibility" in question_lower
            or "eligible" in question_lower
        ):

            answer = (

                "Eligibility depends on the "
                "college, course, academic "
                "qualification, and applicable "
                "entrance examination.\n\n"

                "EduGuide AI can provide more "
                "specific eligibility information "
                "after verified admission "
                "requirement data is added."

            )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # ADMISSION
        # =====================================

        if (
            "admission" in question_lower
            or "application" in question_lower
        ):

            answer = (

                "The general admission process is:\n\n"

                "1. Check eligibility.\n"
                "2. Check entrance examination requirements.\n"
                "3. Select suitable colleges.\n"
                "4. Prepare documents.\n"
                "5. Submit the application.\n"
                "6. Track the application.\n"
                "7. Complete final admission.\n\n"

                "Always verify the latest procedure "
                "and deadlines from the official source."

            )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # DOCUMENTS
        # =====================================

        if (
            "document" in question_lower
            or "documents" in question_lower
        ):

            answer = (

                "Common admission documents may include:\n\n"

                "• 10th Marksheet\n"
                "• 12th Marksheet\n"
                "• Identity Proof\n"
                "• Domicile Certificate, if required\n"
                "• Category Certificate, if applicable\n"
                "• Entrance Exam Scorecard\n\n"

                "Exact requirements depend on "
                "the college and admission process."

            )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # FEES
        # =====================================

        if (
            "fee" in question_lower
            or "fees" in question_lower
            or "budget" in question_lower
        ):

            answer = (

                "Fees are college and course specific. "
                "The current database does not yet "
                "contain verified fee information for "
                "all colleges, so I will not invent "
                "fee values.\n\n"

                "You can still use the budget "
                "preference while exploring colleges."

            )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # SCHOLARSHIPS
        # =====================================

        if (
            "scholarship" in question_lower
            or "scholarships" in question_lower
        ):

            answer = (

                "Scholarship availability depends "
                "on the college, course, eligibility "
                "criteria, and applicable government "
                "or institutional schemes.\n\n"

                "Please verify the latest scholarship "
                "information from the official source."

            )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # GREETING
        # =====================================

        if (
            "hello" in question_lower
            or "hi" in question_lower
            or "hey" in question_lower
        ):

            answer = (

                "Hello! 👋 I am EduGuide AI.\n\n"

                "I can help you explore colleges, "
                "courses, eligibility, admission "
                "procedures, documents, fees, "
                "scholarships, and personalized "
                "college recommendations."

            )

            return jsonify({
                "success": True,
                "answer": answer
            })


        # =====================================
        # DEFAULT CHATBOT RESPONSE
        # =====================================

        answer = (

            "I can help you with:\n\n"

            "• Personalized college recommendations\n"
            "• College search\n"
            "• Courses\n"
            "• Locations\n"
            "• Eligibility\n"
            "• Admission process\n"
            "• Documents\n"
            "• Fees and budget\n"
            "• Scholarships\n\n"

            "Try asking: "
            "\"Which colleges are suitable for me?\""

        )

        return jsonify({
            "success": True,
            "answer": answer
        })


    except Exception as e:

        print("CHATBOT ERROR:")
        print(e)

        return jsonify({
            "success": False,
            "message":
                "Something went wrong while "
                "processing your question."
        }), 500


# =========================================
# RUN SERVER
# =========================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )