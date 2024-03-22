import 'dart:io';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:image_picker/image_picker.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:file_picker/file_picker.dart';
import 'package:link/login.dart';
import 'package:progress_dialog_null_safe/progress_dialog_null_safe.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _firstName = TextEditingController();
  final TextEditingController _lastName = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  final TextEditingController _phoneNumberController = TextEditingController();
  final TextEditingController _dobController = TextEditingController();
  final TextEditingController _aadharNumberController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();
  final TextEditingController _placeController = TextEditingController();
  final TextEditingController _pincodeController = TextEditingController();

  late ProgressDialog _progressDialog;

  bool _obs_text = true;
  List<Map<String, dynamic>> distList = [];
  List<Map<String, dynamic>> placesList = [];

  String? gender;
  String? selectedDistrict;
  String? selectedPlace;
  String? filePath;
  XFile? _selectedImage;
  String? _imageUrl;

  void redirectToLogin() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const Login()),
    );
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

  Future<void> _pickFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles();

      if (result != null) {
        setState(() {
          filePath = result.files.single.path;
        });
      } else {
        print('File picking canceled.');
      }
    } catch (e) {
      print('Error picking file: $e');
    }
  }

  Future<void> fetchDistData() async {
    try {
      QuerySnapshot<Map<String, dynamic>> querySnapshot =
          await FirebaseFirestore.instance.collection('districts').get();

      List<Map<String, dynamic>> dist = querySnapshot.docs
          .map((doc) => {
                'id': doc.id,
                'district': doc['district'].toString(),
              })
          .toList();

      setState(() {
        distList = dist;
      });
      print(dist);
    } catch (e) {
      print('Error fetching department data: $e');
    }
  }

  Future<void> fetchPlaceData(distId) async {
    placesList = [];
    selectedPlace = null;
    print(distId);
    try {
      QuerySnapshot<Map<String, dynamic>> querySnapshot1 =
          await FirebaseFirestore.instance
              .collection('Place')
              .where('District', isEqualTo: distId)
              .get();
      List<Map<String, dynamic>> placeList = querySnapshot1.docs
          .map((doc) => {
                'id': doc.id,
                'place': doc['Place'].toString(),
              })
          .toList();
      setState(() {
        placesList = placeList;
      });
      print(placesList);
    } catch (e) {
      print(e);
    }
  }

  void register() async {
    print("Registering...");
    print("Name: ${_firstName.text} ${_lastName.text}");
    print("Email: ${_emailController.text}");
    print("Password: ${_passwordController.text}");
    print("Password: ${_confirmPasswordController.text}");
    print("Phone Number: ${_phoneNumberController.text}");
    print("Date of Birth: ${_dobController.text}");
    print("Gender: $gender");
    print("Aadhar Number: ${_aadharNumberController.text}");
    print("Address: ${_addressController.text}");

    print("Place: $selectedPlace");
    print("Pin Code: ${_pincodeController.text}");
auth();
    setState(() {
      gender = null;
    });
  }

  void auth() async {
    try {
      _progressDialog.show();
      UserCredential userCredential =
          await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: _emailController.text,
        password: _passwordController.text,
      );

      if (userCredential != null) {
        print('usr');
        await _storeUserData(userCredential.user!.uid);
        Fluttertoast.showToast(
          msg: "Registration Successful",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.green,
          textColor: Colors.white,
        );
        _progressDialog.hide();
        login();
        print("push ");
      }
    } catch (e) {
      _progressDialog.hide();
      Fluttertoast.showToast(
        msg: "Registration Failed",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      );
      print("Error registering user: $e");
      // Handle error, show message, or take appropriate action
    }
  }
  void login(){
    Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const Login()),
        );
  }

  _storeUserData(String userId) async {
    try {
      final FirebaseFirestore firestore = FirebaseFirestore.instance;
print("trying to insert to db ");
      await firestore.collection('collection_user').doc(userId).set({
        "user_name": _firstName.text + " " + _lastName.text,
        "user_email": _emailController.text,
        "user_mobile": _phoneNumberController.text,
        "user_address": _addressController.text,
        "user_gender": gender,
        "user_place": selectedPlace,
        "user_dob": _dobController.text,
        // Add more fields as needed
      });
      await _uploadImage(userId);

      
    } catch (e) {
      print(e);
    }
  }
  Future<void> _uploadImage(String userId) async {
    try {
      if (_selectedImage != null) {
        Reference ref =
            FirebaseStorage.instance.ref().child('User_Photo/$userId.jpg');
        UploadTask uploadTask = ref.putFile(File(_selectedImage!.path));
        TaskSnapshot taskSnapshot = await uploadTask.whenComplete(() => null);

        String imageUrl = await taskSnapshot.ref.getDownloadURL();

        await FirebaseFirestore.instance
            .collection('collection_user')
            .doc(userId)
            .update({
          'user_photo': imageUrl,
        });
      }

      if (filePath != null) {
        //FileUpload
        // Step 1: Get the file name from the path
        String fileName = filePath!.split('/').last;

        // Step 2: Upload file to Firebase Storage with the original file name
        Reference fileRef = FirebaseStorage.instance
            .ref()
            .child('idProof/$userId/$fileName');
        UploadTask fileUploadTask = fileRef.putFile(File(filePath!));
        TaskSnapshot fileTaskSnapshot =
            await fileUploadTask.whenComplete(() => null);

        // Step 3: Get download URL of the uploaded file
        String fileUrl = await fileTaskSnapshot.ref.getDownloadURL();

        // Step 4: Update user's collection in Firestore with the file URL
        await FirebaseFirestore.instance
            .collection('collection_user')
            .doc(userId)
            .update({
          'user_adhar': fileUrl,
        });
      }
      clear();
    } catch (e) {
      print("Error uploading image: $e");
      // Handle error, show message or take appropriate action
    }
    }

  void clear() {
    gender = null;
    selectedDistrict = null;
    selectedPlace = null;
    placesList = [];
    filePath = null;
    _selectedImage = null;
    _firstName.clear();
    _lastName.clear();
    _emailController.clear();
    _phoneNumberController.clear();
    _dobController.clear();
    _aadharNumberController.clear();
    _addressController.clear();
    _placeController.clear();
    _pincodeController.clear();
    _passwordController.clear();
    _confirmPasswordController.clear();
    
  }

  void initState() {
    super.initState();
    fetchDistData();
    _progressDialog = ProgressDialog(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Padding(
          padding: EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Welcome To Link",
                style: TextStyle(
                  color: Color.fromRGBO(21, 101, 192, 1),
                  fontWeight: FontWeight.w800,
                  fontSize: 40,
                ),
              ),
              Text(
                "the complete legal app",
                style: TextStyle(color: Colors.black54, fontSize: 17),
              ),
            ],
          ),
        ),
        toolbarHeight: 125,
      ),
      body: Form(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
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
                                icon: const Icon(
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
                    ],
                  ),
                ),
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: _firstName,
                        decoration: const InputDecoration(labelText: "Full Name"),
                      ),
                    ),
                    const SizedBox(
                      width: 15,
                    ),
                    Expanded(
                        child: TextFormField(
                      controller: _lastName,
                      decoration: const InputDecoration(labelText: "Last name"),
                    ))
                  ],
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(labelText: "Email"),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _phoneNumberController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(labelText: "Phone Number"),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _dobController,
                                    keyboardType: TextInputType.datetime,

                  decoration: const InputDecoration(labelText: "Date of Birth"),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    const Text("Gender : "),
                    const SizedBox(
                      width: 28,
                    ),
                    const Text("Male"),
                    Radio(
                        value: "male",
                        groupValue: gender,
                        onChanged: (value) {
                          setState(() {
                            gender = value!;
                          });
                        }),
                    const Text("Femlae"),
                    Radio(
                        value: "Female",
                        groupValue: gender,
                        onChanged: (value) {
                          setState(() {
                            gender = value!;
                          });
                        }),
                    const Text("Other"),
                    Radio(
                        value: "Other",
                        groupValue: gender,
                        onChanged: (value) {
                          setState(() {
                            gender = value!;
                          });
                        })
                  ],
                ),
                TextFormField(
                  controller: _aadharNumberController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: "Aadhar Number"),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _pickFile,
                  child: const Text('Upload File'),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _addressController,
                  decoration: const InputDecoration(labelText: "Address"),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    const Text("District"),
                    const SizedBox(
                      width: 15,
                    ),
                    Flexible(
                      child: DropdownButtonFormField<String>(
                        value: selectedDistrict,
                        items: distList.map<DropdownMenuItem<String>>(
                          (Map<String, dynamic> dist) {
                            return DropdownMenuItem<String>(
                              value: dist['id'],
                              child: Text(dist['district']),
                            );
                          },
                        ).toList(),
                        onChanged: (String? value) {
                          fetchPlaceData(value);
                          setState(() {
                            selectedDistrict = value!;
                          });
                        },
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    const Text("Place"),
                    const SizedBox(
                      width: 15,
                    ),
                    Flexible(
                      child: DropdownButtonFormField<String>(
                        value: selectedPlace,
                        items: placesList.map<DropdownMenuItem<String>>(
                          (Map<String, dynamic> place) {
                            return DropdownMenuItem<String>(
                              value: place['id'],
                              child: Text(place['place']),
                            );
                          },
                        ).toList(),
                        onChanged: (String? value) {
                          setState(() {
                            selectedPlace = value!;
                          });
                        },
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _pincodeController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: "Pin Code"),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  obscureText: _obs_text,
                  decoration: InputDecoration(
                      hintText: "Password",
                      suffix: InkWell(
                        child: const Icon(Icons.remove_red_eye_outlined),
                        onTap: () {
                          _obs_text = !_obs_text;
                          setState(() {});
                        },
                      )),
                  controller: _passwordController,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  obscureText: _obs_text,
                  decoration: InputDecoration(
                      hintText: "Confirm password",
                      suffix: InkWell(
                        child: const Icon(Icons.remove_red_eye_outlined),
                        onTap: () {
                          _obs_text = !_obs_text;
                          setState(() {});
                        },
                      )),
                  controller: _confirmPasswordController,
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () {
                    register();
                  },
                  child: const Text(
                    "Register",
                    style: TextStyle(color: Colors.white),
                  ),
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(
                        const Color.fromRGBO(21, 101, 192, 1)),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5.0),
                      ),
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(
                      height: 50,
                    ),
                    const Text(
                      "already joined ? ",
                      style: TextStyle(fontSize: 17),
                    ),
                    GestureDetector(
                      onTap: redirectToLogin,
                      child: const Text(
                        "Login ",
                        style: TextStyle(
                          color: Colors.blueAccent,
                          fontSize: 17,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
