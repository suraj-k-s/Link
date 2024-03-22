import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:link/main.dart';
import 'package:lottie/lottie.dart';

class SearchLawyer extends StatefulWidget {
  const SearchLawyer({Key? key}) : super(key: key);

  @override
  _SearchLawyerState createState() => _SearchLawyerState();
}

class _SearchLawyerState extends State<SearchLawyer> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  List<Map<String, dynamic>> _lawyers = [];
  List<Map<String, dynamic>> _userRequests = [];
  bool _loading = true;
  String _searchId = '';

  @override
  void initState() {
    super.initState();
    fetchLawyers();
    getUserRequests();
  }

  Future<void> fetchLawyers() async {
    try {
      final lawyersCollection = _firestore.collection('lawyer_collection');
      final lawyersSnapshot = await lawyersCollection.get();
      final lawyersList = lawyersSnapshot.docs.map((doc) => ({
        'id': doc.id,
        ...doc.data(),
      })).toList();

      final specializationRef = _firestore.collection('Lawyer_Category');
      final specializationSnapshot = await specializationRef.get();
      final specializationMap = Map.fromEntries(specializationSnapshot.docs
          .map((doc) => MapEntry(doc.id, doc.data() as Map<String, dynamic>)));

      await Future.delayed(Duration(seconds: 2)); // Minimum 2 second delay

      setState(() {
        _lawyers = lawyersList.map((lawyer) => {
          ...lawyer,
          'catName': specializationMap[lawyer['specialization']] ?? {},
        }).toList();
        _loading = false;
      });
    } catch (error) {
      print('Error fetching lawyers: $error');
      setState(() {
        _loading = false;
      });
    }
  }

  Future<void> getUserRequests() async {
    try {
      final userId = _auth.currentUser!.uid;
      final querySnapshot = await _firestore
          .collection('Collection_lawyer_connection')
          .where('userID', isEqualTo: userId)
          .get();

      final requestsList = querySnapshot.docs.map((doc) => ({
        'id': doc.id,
        ...doc.data(),
      })).toList();

      setState(() {
        _userRequests = requestsList;
      });
    } catch (error) {
      print('Error fetching user requests: $error');
    }
  }

  Widget buildRequestButton(String lawyerId) {
    final userRequest = _userRequests.firstWhere(
      (request) => request['lawyerID'] == lawyerId,
      orElse: () => {},
    );

    if (userRequest.isNotEmpty) {
      if (userRequest['cStatus'] == 1) {
        return ElevatedButton(
          onPressed: null, // Button is disabled
          child: Text('Accepted'),
        );
      } else {
        return ElevatedButton(
          onPressed: () async{
            await handleCancelRequest(userRequest['id']);
          },
          style: ElevatedButton.styleFrom(
            primary: Colors.red,
          ),
          child: Text('Cancel Request'),
        );
      }
    } else {
      return ElevatedButton(
        onPressed: () async{
          await handleRequest(lawyerId);
        },
        child: Text('Request'),
      );
    }
  }

 Future<void> handleRequest(String lawyerId) async {
  try {
    final userId = _auth.currentUser!.uid;
    final existingRequest = _userRequests.firstWhere(
      (request) => request['lawyerID'] == lawyerId,
      orElse: () => {},
    );

    if (existingRequest.isNotEmpty) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Request Already Sent'),
            content: Text('You have already sent a request to this lawyer.'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: Text('OK'),
              ),
            ],
          );
        },
      );
      return;
    }

    await _firestore.collection('Collection_lawyer_connection').add({
      'userID': userId,
      'lawyerID': lawyerId,
      'cStatus': 0,
    });

    setState(() {
      getUserRequests();
      fetchLawyers();
    });

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Request Sent'),
          content: Text('Request sent successfully!'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  } catch (error) {
    print('Error sending request: $error');
  }
}


  Future<void> handleCancelRequest(String requestId) async {
  try {
    await _firestore
        .collection('Collection_lawyer_connection')
        .doc(requestId)
        .delete();

    setState(() {
      // Remove the request from _userRequests list
      _userRequests.removeWhere((request) => request['id'] == requestId);
    });
  } catch (error) {
    print('Error cancelling request: $error');
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
      body: SingleChildScrollView(
        child: Container(
          
          color: appcolor.secondary,
          child: Container(
            decoration: BoxDecoration(
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(30),
                      topRight: Radius.circular(30)),
                  color: appcolor.white,
                ),
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Search by ID',
                      prefixIcon: Icon(Icons.search),
                    ),
                    onChanged: (value) {
                      setState(() {
                        _searchId = value;
                      });
                    },
                  ),
                ),
                _loading
                    ? Center(child: Lottie.asset('assets/lawLoading.json', width: 100))
                    : _lawyers.isEmpty
                        ? Center(child: Text('No lawyers found.'))
                        : ListView.builder(
                            shrinkWrap: true,
                            physics: NeverScrollableScrollPhysics(),
                            itemCount: _lawyers.length,
                            itemBuilder: (context, index) {
                              final lawyer = _lawyers[index];
                              if (_searchId.isNotEmpty &&
                                  !_lawyers[index]['userId']
                                      .contains(_searchId)) {
                                return SizedBox.shrink();
                              }
                              return Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Card(
                                  elevation: 3,
                                  child: ListTile(
                                    title: Text(lawyer['full_name']),
                                    subtitle: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Specialization: ${lawyer['catName']['categoryName']}'),
                                        Text('Qualification: ${lawyer['qualification']}'),
                                        Text('ID: ${lawyer['userId']}'),
                                      ],
                                    ),
                                    leading: CircleAvatar(
                                      backgroundImage: NetworkImage(
                                          lawyer['profile_picture'] ?? ''),
                                    ),
                                    trailing: buildRequestButton(lawyer['userId']),
                                  ),
                                ),
                              );
                            },
                          ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
