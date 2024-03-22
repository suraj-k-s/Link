import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:link/main.dart';
import 'package:lottie/lottie.dart';

class MyLawyer extends StatefulWidget {
  const MyLawyer({Key? key}) : super(key: key);

  @override
  _MyLawyerState createState() => _MyLawyerState();
}

class _MyLawyerState extends State<MyLawyer> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  List<Map<String, dynamic>> _lawyers = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    fetchLawyers();
  }

  Future<void> fetchLawyers() async {
    try {
      final currentUser = _auth.currentUser;
      if (currentUser != null) {
        final uid = currentUser.uid;
        print('Current User ID: $uid');

        final lawyerConnectionsRef =
            _firestore.collection('Collection_lawyer_connection');
        final lawyerConnectionsSnapshot = await lawyerConnectionsRef.get();
        print('Lawyer Connections Snapshot: $lawyerConnectionsSnapshot');

        final lawyerConnections = lawyerConnectionsSnapshot.docs
            .where((doc) => doc['userID'] == uid && doc['cStatus'] == 1)
            .map((doc) => doc.data() as Map<String, dynamic>)
            .toList();
        print('Filtered Lawyer Connections: $lawyerConnections');

        final lawyersDetails = <Map<String, dynamic>>[];
        for (final connection in lawyerConnections) {
          final lawyerId = connection['lawyerID'];
          print('Fetching details for Lawyer ID: $lawyerId');

          final lawyerSnapshot = await _firestore
              .collection('lawyer_collection')
              .where('userId', isEqualTo: lawyerId)
              .get();
          final lawyerData = lawyerSnapshot.docs
              .map((doc) => doc.data() as Map<String, dynamic>)
              .firstOrNull;
          print('Lawyer Data Snapshot: $lawyerData');

          if (lawyerData != null) {
            // Check if data exists
            lawyersDetails.add({
              'id': lawyerSnapshot.docs.first.id,
              ...lawyerData,
            });
          }
        }
        print('Lawyers Details: $lawyersDetails');

        final specializationRef = _firestore.collection('Lawyer_Category');
        final specializationSnapshot = await specializationRef.get();
        print('Specialization Snapshot: $specializationSnapshot');

        final specializationMap = Map.fromEntries(specializationSnapshot.docs
            .map(
                (doc) => MapEntry(doc.id, doc.data() as Map<String, dynamic>)));
        print('Specialization Map: $specializationMap');

        final combinedLawyers = lawyersDetails
            .map((lawyer) => {
                  ...lawyer,
                  'catName': specializationMap[lawyer['specialization']] ?? {},
                })
            .toList();
        print('Combined Lawyers: $combinedLawyers');

        // Delay setting _loading to false for a minimum of 2 seconds
        await Future.delayed(Duration(seconds: 2));
        setState(() {
          _lawyers = combinedLawyers;
          _loading = false;
        });
      }
    } catch (error) {
      print('Error fetching lawyers: $error');
      setState(() {
        _loading = false;
      });
    }
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
        title: Text("My Lawyers",
            style: TextStyle(color: appcolor.white, fontSize: 30)),
      ),
      body: Container(
        decoration: BoxDecoration(color: appcolor.secondary),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(30),
              topRight: Radius.circular(30),
            ),
            color: appcolor.white,
          ),
          child: _loading
              ? Center(
                  child: Lottie.asset(
                    'assets/lawLoading.json', // Your Lottie animation file
                    width: 150,
                    height: 150,
                    fit: BoxFit.cover,
                  ),
                )
              : Container(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ListView.builder(
                      itemCount: _lawyers.length,
                      itemBuilder: (context, index) {
                        final lawyer = _lawyers[index];
                        return Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: appcolor.accent,
                            ),
                            child: ListTile(
                              title: Text(lawyer['full_name']),
                              subtitle: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                      'Area: ${lawyer['catName']['categoryName']}'),
                                  Text('Qualification: ${lawyer['qualification']}'),
                                  Text('ID: ${lawyer['userId']}'),
                                ],
                              ),
                              leading: CircleAvatar(
                                backgroundImage:
                                    NetworkImage(lawyer['profile_picture'] ?? ''),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
        ),
      ),
    );
  }
}
