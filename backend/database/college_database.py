from database.mongodb import colleges_collection


def add_college(college_data):
    result = colleges_collection.insert_one(college_data)
    return str(result.inserted_id)


def get_all_colleges():
    return list(colleges_collection.find({}, {"_id": 0}))


def get_college_by_name(name):
    return colleges_collection.find_one(
        {"name": name},
        {"_id": 0}
    )