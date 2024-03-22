import 'dart:io';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:lottie/lottie.dart';

import 'package:link/main.dart';
import 'package:progress_dialog_null_safe/progress_dialog_null_safe.dart';

class MissingPerson extends StatefulWidget {
  const MissingPerson({Key? key}) : super(key: key);

  @override
  State<MissingPerson> createState() => _MissingPersonState();
}

class _MissingPersonState extends State<MissingPerson> {
  void Imgeinput() {
    print("Image: ");
  }

  DateTime? _dob;
  DateTime? _missingDate;
  XFile? _selectedImage;
  String? _imageUrl;
  final TextEditingController _name = TextEditingController();
  final TextEditingController _contact = TextEditingController();
  final TextEditingController _discription = TextEditingController();
  final TextEditingController _lastLocation = TextEditingController();
  final TextEditingController _dobController = TextEditingController();
  final TextEditingController _missingDateController = TextEditingController();

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _dob ?? DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );

    if (picked != null && picked != _dob) {
      setState(() {
        _dob = picked;
        _dobController.text = "${picked.toLocal()}".split(' ')[0];
      });
    }
  }

  Future<void> _selectMissingDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _missingDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
    );

    if (picked != null && picked != _missingDate) {
      setState(() {
        _missingDate = picked;
        _missingDateController.text = "${picked.toLocal()}".split(' ')[0];
      });
    }
  }

  Future<void> _pickImage() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        _selectedImage = XFile(pickedFile.path);
      });
    }
  }

 Future<void> submit(BuildContext context) async {
  if (_selectedImage == null) {
    print("Please select a photo");
    Fluttertoast.showToast(
        msg: "Please select a photo and  Please try again.",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.red,
      );
    return;
  }

  User? user = FirebaseAuth.instance.currentUser;
  if (user != null) {
    String userID = user.uid;

    // Show loading animation
      final ProgressDialog pr = ProgressDialog(context);
      pr.style(
        message: 'Submitting...',
        progressWidget: Lottie.asset(
          'assets/writing.json',
          width: 100,
        ),
      );
      pr.show();

    try {
      // Upload photo to storage with metadata
      final photoMetadata = SettableMetadata(contentType: 'image/jpeg');
      final fileStorageRef = FirebaseStorage.instance
          .ref()
          .child("missingperson/${DateTime.now().millisecondsSinceEpoch}.jpg");
      await fileStorageRef.putFile(File(_selectedImage!.path), photoMetadata);

      // Get the download URL of the uploaded photo
      final photoURL = await fileStorageRef.getDownloadURL();

      // Add missing person report to the database with UserID
      final missingPersonRef =
          FirebaseFirestore.instance.collection("MissingPerson");
      await missingPersonRef.add({
        "UserID": userID,
        "missingPersonName": _name.text,
        "phone": _contact.text,
        "dob": _dobController.text,
        "details": _discription.text,
        "missingFrom": _missingDateController.text,
        "lastLocation": _lastLocation.text,
        "photoURL": photoURL,
        "timestamp": DateTime.now(),
        "vStatus": 0,
      });

      // Reset form after submission
      setState(() {
        _selectedImage = null;
        _name.clear();
        _contact.clear();
        _dob = null;
        _dobController.clear();
        _discription.clear();
        _missingDate = null;
        _missingDateController.clear();
        _lastLocation.clear();
      });

      // Hide loading animation
      pr.hide();

      // Show toast message
      Fluttertoast.showToast(
        msg: "Submission successful",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.green,
        textColor: Colors.white,
      );

      // Redirect to dashboard
      Navigator.pushReplacementNamed(context, '/dashboard');
    } catch (error) {
      // Hide loading animation
      pr.hide();

      // print("Error submitting missing person report: $error");

      // Show error toast message
      // Fluttertoast.showToast(
      //   msg: "Error submitting report. Please try again.",
      //   toastLength: Toast.LENGTH_SHORT,
      //   gravity: ToastGravity.BOTTOM,
      //   backgroundColor: Colors.red,
      //   textColor: Colors.white,
      // );
    }
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
          "MissingPerson",
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
                  GestureDetector(
                    onTap: () {
                      _pickImage();
                    },
                    child: Column(
                      children: [
                        Stack(
                          alignment: Alignment.bottomRight,
                          children: [
                            CircleAvatar(
                              backgroundImage: _selectedImage != null
                                  ? FileImage(File(_selectedImage!.path))
                                  : _imageUrl != null
                                      ? NetworkImage(_imageUrl!)
                                      : const AssetImage(
                                          "assets/images/Missing/missing_report.png")
                                  as ImageProvider,
                              radius: 70,
                            ),
                            if (_selectedImage != null || _imageUrl != null)
                              CircleAvatar(
                                backgroundColor: Colors.white,
                                radius: 18,
                                child: IconButton(
                                  icon: Icon(
                                    Icons.edit,
                                    size: 18,
                                    color: Colors.black,
                                  ),
                                  onPressed: () {
                                    // Handle edit image
                                  },
                                ),
                              ),
                              
                          ],
                        ),
                        // IconButton(
                        //   onPressed: () {
                        //     Imgeinput();
                        //   },
                        //   icon: Image.asset(
                        //     "assets/images/Missing/missing_report.png",
                        //     width: 100,
                        //   ),
                        // ),
                      ],
                    ),
                  ),
                  Text("Uplaod Images"),
                  SizedBox(height: 10),
                  Padding(
                    padding: const EdgeInsets.all(15.0),
                    child: Column(
                      children: [
                        TextFormField(
                          decoration: InputDecoration(
                            hintText: 'Name',
                          ),
                          controller: _name,
                        ),
                        SizedBox(height: 10),
                        TextFormField(
                          keyboardType: TextInputType.phone,
                          inputFormatters: [
                            FilteringTextInputFormatter.allow(
                                RegExp(r'[0-9]')),
                            LengthLimitingTextInputFormatter(10),
                          ],
                          decoration: InputDecoration(
                            labelText: 'Mobile Number',
                            hintText:
                                'Enter 10-digit mobile number of missing person',
                          ),
                          controller: _contact,
                        ),
                        GestureDetector(
                          onTap: () {
                            _selectDate(context);
                          },
                          child: AbsorbPointer(
                            child: TextFormField(
                              keyboardType: TextInputType.datetime,
                              controller: _dobController,
                              decoration: InputDecoration(
                                labelText: 'Date of Birth',
                                hintText: 'Date of Birth',
                              ),
                              validator: (value) {
                                if (_dob == null) {
                                  return 'Please select a date of birth of missing person';
                                }
                                return null;
                              },
                            ),
                          ),
                        ),
                        SizedBox(height: 10),
                        TextFormField(
                          maxLines: 4,
                          decoration: InputDecoration(
                            hintText: 'describe the missing person',
                            labelText: "Description",
                          ),
                          controller: _discription,
                        ),
                        SizedBox(height: 10),
                        GestureDetector(
                          onTap: () {
                            _selectMissingDate(context);
                          },
                          child: AbsorbPointer(
                            child: TextFormField(
                              keyboardType: TextInputType.datetime,
                              controller: _missingDateController,
                              decoration: InputDecoration(
                                labelText: "Missing from",
                                hintText:
                                    'date from which the person is missing',
                              ),
                              validator: (value) {
                                if (_missingDate == null) {
                                  return 'Please select the date from which the person has gone missing';
                                }
                                return null;
                              },
                            ),
                          ),
                        ),
                        SizedBox(height: 10),
                        TextFormField(
                          decoration: InputDecoration(
                            hintText: 'Last known location of the person',
                            labelText: 'Last location',
                          ),
                          controller: _lastLocation,
                        ),
                        SizedBox(height: 10),
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: appcolor.primary,
                              foregroundColor: appcolor.white,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(8),
                                ),
                              ),
                            ),
                            onPressed: () {
                              submit(context);
                            },
                            child: Text("Submit"),
                          ),
                        ),
                      ],
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
