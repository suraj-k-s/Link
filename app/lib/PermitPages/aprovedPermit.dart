import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:link/main.dart';
import 'package:lottie/lottie.dart'; // Import Lottie package

class AprovedPermit extends StatefulWidget {
  const AprovedPermit({Key? key}) : super(key: key);

  @override
  State<AprovedPermit> createState() => _AprovedPermitState();
}

class _AprovedPermitState extends State<AprovedPermit> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  late User? _user;
  List<Map<String, dynamic>> _permitRequests = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _user = _auth.currentUser;
    if (_user != null) {
      fetchPermitRequests(_user!.uid);
    }
    // Delay setting loading to false by 1 second
    Future.delayed(Duration(seconds: 3), () {
      setState(() {
        _loading = false;
      });
    });
  }

  Future<void> fetchPermitRequests(String userId) async {
    try {
      final permitRequestsRef = _firestore.collection('permitRequests');
      final permitRequestsSnapshot = await permitRequestsRef.get();

      // Print the number of documents retrieved
      print(
          'Number of permit requests retrieved: ${permitRequestsSnapshot.size}');

      final permitRequestsList = permitRequestsSnapshot.docs.map((doc) {
        final data = doc.data();
        print('Document ID: ${doc.id}');
        print('Document Data: $data');
        return {
          'id': doc.id,
          ...data,
        };
      }).toList();

      // Filter permit requests based on UserID
      final filteredPermitRequests = permitRequestsList
          .where(
            (permit) => permit['UserID'] == userId,
          )
          .toList();

      // Print the filtered permit requests
      print('Filtered Permit Requests: $filteredPermitRequests');

      setState(() {
        _permitRequests = filteredPermitRequests;
      });
    } catch (error) {
      print('Error fetching permit requests: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 80,
        backgroundColor: appcolor.secondary,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(
            Icons.arrow_back_ios_new_sharp,
            color: appcolor.accent,
            size: 30,
          ),
        ),
        title: Text(
          "APPROVED PERMIT",
          style: TextStyle(color: appcolor.white, fontSize: 30),
        ),
      ),
      body: Container(
        decoration: BoxDecoration(color: appcolor.secondary),
        child: Container(decoration: BoxDecoration(borderRadius: BorderRadius.only(
                topLeft: Radius.circular(30),
                topRight: Radius.circular(30),
              ),
              color: appcolor.white,),
          child: _loading
              ? Center(
                  child: Lottie.asset(
                    'assets/checking.json', // Path to your Lottie animation file
                    width: 300,
                  ),
                )
              : SingleChildScrollView(
                  child: Container(
                    decoration: BoxDecoration(color: appcolor.secondary),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(30),
                          topRight: Radius.circular(30),
                        ),
                        color: appcolor.white,
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: Column(
                          children: _permitRequests.map((permit) {
                            return buildPermitContainer(
                              permit['permitType'].toString(),
                              permit['permitType'].toString(), // Use 'title' field here
                              permit['eventDateEnd'].toString(),
                              permit['eventDateStart'].toString(),
                              permit['pStatus'], // No need to convert to string
                            );
                          }).toList(),
                        ),
                      ),
                    ),
                  ),
                ),
        ),
      ),
    );
  }

  Widget buildPermitContainer(
    String? permitType,
    String? title,
    String? eventDateEnd,
    String? eventDateStart,
    dynamic pStatus,
  ) {
    String? imagePath;
    String? imageName;
    String statusText = ''; // Variable to hold the status text
    Color statusColor = Colors.black; // Variable to hold the status color

    // Set image asset path based on permit type
    switch (permitType) {
      case "5lC6zB0Z64i0YbIhAAb6":
        imagePath = "assets/images/Permit/event.png";
        imageName = "Event/Function";
        break;
      case "kBz1iAAIQDxZbK3fR6Sd":
        imagePath = "assets/images/Permit/travel.png";
        imageName = "Travel";
        break;
      case "7ATAg6F13nPEthpWRbZ5":
        imagePath = "assets/images/Permit/sound.png";
        imageName = "Sound";
        break;
      case "dCBjsagFc6HDEomHDaGa":
        imagePath = "assets/images/Permit/other.png";
        imageName = "Other";
        break;
      case "KRYy5zr8RiqmZ0Qm884U":
        imagePath = "assets/images/Permit/dj.png";
        imageName = "DJ";
        break;
      case "piepHvSTpmaKkbCRa3un":
        imagePath = "assets/images/Permit/construction.png";
        imageName = "Construction";
        break;
      case "F6ms6SYECJ9FzO9DyKQg":
        imagePath = "assets/images/Permit/parade.png";
        imageName = "Parade/March";
        break;
      default:
        // Set a default image path if permit type is unknown
        imagePath = "assets/images/Permit/default.webp";
        imageName = "Error";
    }

    // Set status text and color based on pStatus value
    if (pStatus == null) {
      statusText = 'Pending';
      statusColor = Colors.orange;
    } else if (pStatus == 1) {
      statusText = 'Approved';
      statusColor = Colors.green;
    } else if (pStatus == 2) {
      statusText = 'Rejected';
      statusColor = Colors.red;
    }

    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Container(
        key: Key(permitType!),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              blurRadius: 7,
              spreadRadius: 3,
              offset: Offset(0, 2),
            ),
          ],
          color: appcolor.white,
        ),
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Row(
            children: [
              if (imagePath != null)
                Image.asset(
                  imagePath,
                  width: 100, // Set the width here
                ),
              SizedBox(width: 10), // Add some space between image and text
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    imageName ?? '',
                    style: TextStyle(
                        fontSize: 20,
                        color: appcolor.text2,
                        fontWeight: FontWeight.w900),
                  ),
                  SizedBox(
                    height: 5,
                  ),
                  Text(
                    'From: ${eventDateStart ?? ''}',
                    style: TextStyle(
                      fontSize: 14,
                    ),
                  ),
                  Text(
                    'Till: ${eventDateEnd ?? ''}',
                    style: TextStyle(
                      fontSize: 14,
                    ),
                  ),
                  Text(
                    ' $statusText',
                    style: TextStyle(
                        fontSize: 18,
                        color: statusColor,
                        fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
