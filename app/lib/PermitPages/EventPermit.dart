import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:link/PermitPages/aprovedPermit.dart'; // Import AprovedPermit page

class EventPermit extends StatefulWidget {
  const EventPermit({Key? key}) : super(key: key);

  @override
  State<EventPermit> createState() => _EventPermitState();
}

class _EventPermitState extends State<EventPermit> {
  DateTime? _start;
  DateTime? _end;
  String _selectedPermit = '';
  final TextEditingController _name = TextEditingController();
  final TextEditingController _contact = TextEditingController();
  final TextEditingController _applicantAddress = TextEditingController();
  final TextEditingController _detail = TextEditingController();
  final TextEditingController _startController = TextEditingController();
  final TextEditingController _endController = TextEditingController();

  List<Map<String, dynamic>> permitList = [];

  @override
  void initState() {
    super.initState();
    fetchPermits();
  }

  Future<void> fetchPermits() async {
    try {
      final QuerySnapshot querySnapshot =
          await FirebaseFirestore.instance.collection('Permit').get();
      final List<Map<String, dynamic>> permits = querySnapshot.docs
          .map((doc) => {
                'permit': doc['permit'].toString(),
                'id': doc.id
              } as Map<String, dynamic>)
          .toList();

      setState(() {
        permitList = permits;
      });
      print(permits);
    } catch (error) {
      print('Error fetching permits: $error');
      // Handle the error here
    }
  }

  Future<void> _selectDate(
      BuildContext context, TextEditingController controller) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime(3000),
    );

    if (picked != null) {
      setState(() {
        controller.text = "${picked.toLocal()}".split(' ')[0];
      });
    }
  }

 void submit() async {
  // Get current user
  User? user = FirebaseAuth.instance.currentUser;
  if (user != null) {
    String uid = user.uid; // Get the UID of the current user
    try {
      // Show loading dialog
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return Center(
            child: CircularProgressIndicator(),
          );
        },
      );

      // Perform the submission after 2 seconds
      await Future.delayed(Duration(seconds: 1));

      // Assuming other fields are filled and ready to submit
      final permitRequestRef = await FirebaseFirestore.instance
          .collection('permitRequests')
          .add({
        'UserID': uid,
        'permitType': _selectedPermit,
        'applicantName': _name.text,
        'applicantAddress': _applicantAddress.text,
        'reason': _detail.text,
        'eventDateStart': _startController.text,
        'eventDateEnd': _endController.text,
        'contactNumber': _contact.text,
        'timestamp': DateTime.now(),
      });

      // Close loading dialog
      Navigator.of(context).pop();

      // Show success toast
      Fluttertoast.showToast(
        msg: "Submitted successfully",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        backgroundColor: Colors.green,
        textColor: Colors.white,
        fontSize: 16.0,
      );

      // Clear all text fields
      setState(() {
        _selectedPermit = '';
        _name.clear();
        _contact.clear();
        _applicantAddress.clear();
        _detail.clear();
        _startController.clear();
        _endController.clear();
      });

      // Navigate to AprovedPermit
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => AprovedPermit()),
      );
    } catch (error) {
      // Handle error
      print("Error submitting permit request: $error");
    }
  } else {
    // User is not logged in, handle accordingly
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 80,
        backgroundColor: Colors.blue,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(
            Icons.arrow_back_ios_new_sharp,
            color: Colors.white,
            size: 30,
          ),
        ),
        title: Text(
          "EventPermit",
          style: TextStyle(color: Colors.white, fontSize: 30),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          decoration: BoxDecoration(color: Colors.blue),
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(30),
                topRight: Radius.circular(30),
              ),
              color: Colors.white,
            ),
            child: Padding(
              padding: const EdgeInsets.all(15.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 10),
                  DropdownButtonFormField<String>(
                    value: _selectedPermit,
                    hint: Text("Select Permit"),
                    items: [
                      DropdownMenuItem<String>(
                        value: "", // Add an item with an empty string value
                        child: Text('Select Permit')
                        //disable
                        

                        ,
                      ),
                      ...permitList.map((permit) {
                        return DropdownMenuItem<String>(
                          value: permit['id'],
                          child: Text(permit['permit']),
                        );
                      }).toList(),
                    ],
                    onChanged: (String? value) {
                      setState(() {
                        _selectedPermit = value ?? '';
                      });
                    },
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    controller: _name,
                    decoration: InputDecoration(
                      hintText: "Enter your name",
                      labelText: "Applicant Name",
                    ),
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    keyboardType: TextInputType.phone,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    controller: _contact,
                    maxLength: 10,
                    decoration: InputDecoration(
                      hintText: "Enter your phone number",
                      labelText: "Phone Number",
                    ),
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    controller: _applicantAddress,
                    decoration: InputDecoration(
                      hintText: "Enter your address",
                      labelText: "Applicant Address",
                    ),
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    controller: _detail,
                    maxLines: 4,
                    decoration: InputDecoration(
                      hintText: 'Describe the event details',
                      labelText: "Detail",
                    ),
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                        child: GestureDetector(
                          onTap: () {
                            _selectDate(context, _startController);
                          },
                          child: AbsorbPointer(
                            child: TextFormField(
                              controller: _startController,
                              decoration: InputDecoration(
                                labelText: 'Event Start Date',
                              ),
                            ),
                          ),
                        ),
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: GestureDetector(
                          onTap: () {
                            _selectDate(context, _endController);
                          },
                          child: AbsorbPointer(
                            child: TextFormField(
                              controller: _endController,
                              decoration: InputDecoration(
                                labelText: 'Event End Date',
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue, // Changed color to blue
                        foregroundColor: Colors.white, // Changed text color to white
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(
                            Radius.circular(8),
                          ),
                        ),
                      ),
                      onPressed: () {
                        submit();
                      },
                      child: Text("Submit"),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
