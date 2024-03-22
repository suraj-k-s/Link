places = [
    { "id": "MYHP9DKFW7Jvt6KADIDw", "Place": "Harippad", "District": "XuftjG2a2Sf98U2uKoxj" },
    { "id": "SSyP0uZH2oaLnIMAq0BQ", "Place": "Kayamkulam", "District": "XuftjG2a2Sf98U2uKoxj" },
    # Add other places here...
]

districts =  [
    { id: 1, districtId: "4h2M50LE3ebqtnO8GCZL", district: "Malappuram" },
    { id: 2, districtId: "QgOcprfZPnFM2HFtSWe8", district: "Thrissur" },
    { id: 3, districtId: "UqC0KyhGm6sYnd6iTepi", district: "Ernakulam" },
    { id: 4, districtId: "VqhylatW0r62ROZkP9h8", district: "Kozhikode" },
    { id: 5, districtId: "XuftjG2a2Sf98U2uKoxj", district: "Alappuzha" },
    { id: 6, districtId: "YH5JYQWztYZNTVzOWWBx", district: "Palakkad" },
    { id: 7, districtId: "cKQWi5hGSBCUfCxIr08P", district: "Kannur" },
    { id: 8, districtId: "eDOzGPkKmDF6ilQX7sZm", district: "Kasaragod" },
    { id: 9, districtId: "grr355AflhAF9NLxuVrB", district: "Kottayam" },
    { id: 10, districtId: "mstITEDb23ZN4d91ZWm2", district: "Pathanamthitta" },
    { id: 11, districtId: "rXdsEZ12xPhSLWweRmH9", district: "Idukki" },
    { id: 12, districtId: "sK5tQp5rV1qN9wOCx459", district: "Kollam" },
    { id: 13, districtId: "u3ZcnJ9snjLnZQVcqXA8", district: "Thiruvananthapuram" },
    { id: 14, districtId: "w1JULaUJKT6s4jZFFZcw", district: "Wayanad" }
]

generated_data = []

for place in places:
    district = next((d for d in districts if d["districtId"] == place["District"]), None)
    if district:
        data = {
            "address": f"{place['Place']}, {district['district']}",
            "email": f"{place['Place'].lower()}@gmail.com",
            "houseOfficer": "Kutten Pilla",
            "houseOfficerId": None,
            "password": f"{place['Place']}@1234",
            "phone": 123456789,
            "placeId": place["id"],
            "stationName": f"{place['Place']} PS"
        }
        generated_data.append(data)

print(generated_data)
