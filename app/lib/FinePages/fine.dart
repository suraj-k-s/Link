import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:link/main.dart';
import 'package:lottie/lottie.dart'; // Import Lottie package

class Fine extends StatefulWidget {
  const Fine({Key? key}) : super(key: key);

  @override
  State<Fine> createState() => _FineState();
}

class _FineState extends State<Fine> {
  List<Map<String, dynamic>> fineDetails = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fineDetail();
    // Delay setting isLoading to false by 3 seconds
    Future.delayed(Duration(seconds: 3), () {
      setState(() {
        isLoading = false;
      });
    });
  }

  Future<void> fineDetail() async {
    try {
      final uid = FirebaseAuth.instance.currentUser!.uid;
      final fines =
          FirebaseFirestore.instance.collection("collection_UserFine");
      final query = fines.where("UserID", isEqualTo: uid);
      final querySnapshot = await query.get();
      final List<Map<String, dynamic>> details = querySnapshot.docs.map((doc) {
        final data = doc.data() as Map<String, dynamic>;
        return {
          ...data,
          'id': doc.id,
        };
      }).toList();

      setState(() {
        fineDetails = details;
      });
    } catch (error) {
      print('Error fetching fine details: $error');
      // Handle error
    }
  }

  String _formatTimestamp(dynamic timestamp) {
    if (timestamp == null) {
      return ''; // Return empty string if timestamp is null
    }

    if (timestamp is Timestamp) {
      final date = timestamp.toDate(); // Convert Timestamp to DateTime
      final formattedDate = '${date.year}-${date.month}-${date.day}'; // Format DateTime to display only date
      return formattedDate;
    }

    // If timestamp is not a Timestamp object, return its string representation
    return timestamp.toString();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 80,
        backgroundColor: appcolor.secondary,
        surfaceTintColor: appcolor.secondary,
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
        title:
            Text("Fine", style: TextStyle(color: appcolor.white, fontSize: 30)),
      ),
      body: Container(
        decoration: BoxDecoration(color: appcolor.secondary),
        child: Container(
          decoration: BoxDecoration(borderRadius: BorderRadius.only(
                topLeft: Radius.circular(30),
                topRight: Radius.circular(30),
              ),
              color: appcolor.white,),
          child: isLoading
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
                          children: [
                            if (fineDetails.isEmpty) // Check if fineDetails list is empty
                              Padding(
                                padding: const EdgeInsets.all(15.0),
                                child: Text("No fine",
                                    style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.w500,
                                        color: appcolor.text2)),
                              )
                            else
                              Column(
                                children: [
                                 SizedBox(height: 10  ,),
                                  Column(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceAround,
                                    children: [
                                      ...fineDetails.map((detail) {
                                        final categoryData =
                                            _getImageAssetForCategory(
                                                detail['category']);
                                        final imageAsset = categoryData['image'];
                                        final name = categoryData['name'];
                                        return Padding(
                                          padding: const EdgeInsets.all(15.0),
                                          child: GestureDetector(
                                            child: Container(
                                              key: Key(detail['id']),
                                              decoration: BoxDecoration(
                                                borderRadius:
                                                    BorderRadius.circular(15),
                                                boxShadow: [
                                                  BoxShadow(
                                                    color: Colors.black
                                                        .withOpacity(0.2),
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
                                                    Image.asset(
                                                      imageAsset!,
                                                      width: 100,
                                                    ),
                                                    Expanded(
                                                      child: Container(
                                                        padding: EdgeInsets.only(
                                                            left: 10),
                                                        child: Column(
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .spaceAround,
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Text(
                                                              name!,
                                                              style: TextStyle(
                                                                fontSize: 20,
                                                                fontWeight:
                                                                    FontWeight.w600,
                                                              ),
                                                            ),
                                                            Text(
                                                              "Fine Amount: ${detail['fineAmount']}",
                                                              style: TextStyle(
                                                                  fontSize: 15),
                                                            ),
                                                            Text(
                                                              "Timestamp: ${_formatTimestamp(detail['timestamp'])}",
                                                              style: TextStyle(
                                                                  fontSize: 15),
                                                            ),
                                                            Text(
                                                              detail['paid'] ==
                                                                      null
                                                                  ? "Status: Pending"
                                                                  : detail['paid'] ==
                                                                          1
                                                                      ? "Status: Paid"
                                                                      : "",
                                                              style: TextStyle(
                                                                fontSize: 15,
                                                                color: detail['paid'] ==
                                                                            null ||
                                                                        detail['paid'] ==
                                                                            0
                                                                    ? Colors
                                                                        .orange // Display orange color for pending status
                                                                    : Colors
                                                                        .green, // Display green color for paid status
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                          ),
                                        );
                                      }).toList(),
                                    ],
                                  ),
                                ],
                              ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
        ),
      ),
    );
  }

  Map<String, String?> _getImageAssetForCategory(String? category) {
    String name = '';
    String? image;

    if (category != null) {
      switch (category) {
        case 'wHpwJJl8UFVIjORI5Mdd':
          name = "OverSpeed";
          image = 'assets/images/Fine/OverSpeed.png';
          break;
        case 'fcIxcFKSLlGBMpobrJDF':
          name = "No seatbelt/helmet";
          image = 'assets/images/Fine/helmet.png';
          break;
        case 'gMgESzIBGFRybePL3Lle':
          name = "Red light";
          image = 'assets/images/Fine/redLight.png';
          break;
        case 'nv5CxAxnxG5dALZHLWkT':
          name = "WrecklessDriving";
          image = 'assets/images/Fine/WrecklessDriving.png';
          break;
        case 'rwu5A8UxERjm8UmclZhl':
          name = "No mask";
          image = 'assets/images/Fine/NoMask.png';
          break;
        case 'cCT0CeSxmwJYQj6TF2Fx':
          name = "No mask";
          image = 'assets/images/Fine/NoParking.png';
          break;
        case 'ikTMQOlrYRaKLHxj0ofT':
          name = "Smoking";
          image = 'assets/images/Fine/NoSmoking.png';
          break;
        case 'xSG3L9WCCvmp1ToDLGFh':
          name = "Littering";
          image = 'assets/images/Fine/Littering.png';
          break;
        case 'jyCQHGEEIjw2YNCHotuL':
          name = "Alcohol";
          image = 'assets/images/Fine/NoAlcohol.png';
          break;
        case 'dPbhMn1ghlDxCho89l8t':
          name = "Noise";
          image = 'assets/images/Fine/Noise.png';
          break;
        default:
          name = "error";
          image = 'assets/images/Fine/Noise.png';
      }
    }

    return {"name": name, "image": image}; // Returning both name and image path
  }
}
