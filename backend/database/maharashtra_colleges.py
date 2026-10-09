from mongodb import colleges_collection

maharashtra_colleges = [
    {
        "name": "COEP Technological University",
        "location": "Pune, Maharashtra",
        "city": "Pune",
        "state": "Maharashtra",
        "website": "https://www.coeptech.ac.in/",
        "source": "Official College Website / Maharashtra CET Cell"
    },

    {
        "name": "Veermata Jijabai Technological Institute",
        "location": "Mumbai, Maharashtra",
        "city": "Mumbai",
        "state": "Maharashtra",
        "website": "https://vjti.ac.in/",
        "source": "Official College Website"
    },

    {
        "name": "Institute of Chemical Technology",
        "location": "Mumbai, Maharashtra",
        "city": "Mumbai",
        "state": "Maharashtra",
        "website": "https://www.ictmumbai.edu.in/",
        "source": "Official College Website"
    },

    {
        "name": "Pimpri Chinchwad College of Engineering",
        "location": "Pune, Maharashtra",
        "city": "Pune",
        "state": "Maharashtra",
        "website": "https://www.pccoepune.com/",
        "source": "Official College Website"
    },

    {
        "name": "Pune Institute of Computer Technology",
        "location": "Pune, Maharashtra",
        "city": "Pune",
        "state": "Maharashtra",
        "website": "https://pict.edu/",
        "source": "Maharashtra CET Cell"
    },

    {
        "name": "Sardar Patel Institute of Technology",
        "location": "Mumbai, Maharashtra",
        "city": "Mumbai",
        "state": "Maharashtra",
        "website": "https://www.spit.ac.in/",
        "source": "Official College Website"
    }
]


def add_maharashtra_colleges():
    for college in maharashtra_colleges:

        existing = colleges_collection.find_one({
            "name": college["name"]
        })

        if existing:
            print(f"Already exists: {college['name']}")
        else:
            colleges_collection.insert_one(college)
            print(f"Added: {college['name']}")


if __name__ == "__main__":
    add_maharashtra_colleges()