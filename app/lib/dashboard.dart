import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:link/EmergencyPages/emergency.dart';
import 'package:link/FinePages/fine.dart';
import 'package:link/LawyerPages/lawyer.dart';
import 'package:link/LawyerPages/myCase.dart';
import 'package:link/login.dart';
import 'package:link/main.dart';
import 'package:link/MissingPages/missing.dart';
import 'package:link/PermitPages/permit.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  String name = "User";
  String pic = '';
  @override
  void initState() {
    super.initState();
    loadData();
  }

  void loadData() async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final uid = user.uid;
        final userData = await FirebaseFirestore.instance
            .collection('collection_user')
            .doc(uid)
            .get();
        setState(() {
          name = userData['user_name'];
          pic = userData['user_photo'];
        });
      }
    } catch (e) {
      print('Error loading user data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: <Widget>[
          SliverAppBar(
            toolbarHeight: 180,
            automaticallyImplyLeading: false,
            pinned: false,
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "LINK",
                  style: TextStyle(
                      fontSize: 60,
                      fontWeight: FontWeight.w600,
                      color: appcolor.text),
                ),
                SizedBox(height: 10),
                Text(
                  "Get the help you need, when you  need it.",
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w400,
                      color: appcolor.text2),
                ),
              ],
            ),
            backgroundColor: Colors.transparent,
            actions: [
              GestureDetector(
                onTap: () {
                  Navigator.pushReplacement(context,MaterialPageRoute(builder: (context) => Login(),)
                    
                  );
                },
                
                                        
                child: Icon(
                  Icons.exit_to_app_sharp,
                  size: 40,
                ),
              ),
              SizedBox(
                width: 20,
              )
            ],
          ),
          SliverList(
            delegate: SliverChildListDelegate(
              [
                Container(
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(30),
                        topRight: Radius.circular(30),
                      ),
                      color: appcolor.secondary,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.only(
                          top: 40, bottom: 40, right: 20, left: 20),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          pic != ""
                              ? ClipRRect(
                                  borderRadius: BorderRadius.circular(
                                      40), // Adjust the radius as needed
                                  child: Image.network(
                                    pic,
                                    height: 80,
                                    width: 80,
                                    fit: BoxFit.cover,
                                    errorBuilder: (BuildContext context,
                                        Object error, StackTrace? stackTrace) {
                                      return Icon(
                                        Icons.error,
                                        color: Colors
                                            .red, // You can customize the color of the error icon
                                        size: 80,
                                      );
                                    },
                                  ))
                              : Icon(
                                  Icons.account_circle,
                                  size: 80,
                                  color: appcolor.white,
                                ),
                          Flexible(
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(left: 10),
                                  child: Container(
                                    constraints: BoxConstraints(maxWidth: 125),
                                    child: Text(
                                      name,
                                      style: TextStyle(
                                        color: appcolor.white,
                                        fontSize: 26,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(right: 8),
                                  child: GestureDetector(
                                    onTap: () async {
                                      await Future.delayed(Duration(seconds: 5));
                                     
                                    },
                                    onLongPress: () {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        SnackBar(
                                          content: Text('Emergency request sent!'),
                                          duration: Duration(seconds: 3),
                                        ),
                                      );
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                        color: appcolor.red,
                                        borderRadius: BorderRadius.circular(8),
                                        boxShadow: [
                                          BoxShadow(
                                            color: Color(0xFF000000).withOpacity(0.1),
                                            offset: Offset(3, 3),
                                            blurRadius: 0,
                                            spreadRadius: 2,
                                          ),
                                        ],
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(25.0),
                                        child: Column(
                                          children: [
                                            Text(
                                              "EMERGENCY",
                                              style: TextStyle(
                                                  color: appcolor.white,
                                                  fontWeight: FontWeight.w600),
                                            ),
                                            Text("press  for requess",
                                                style: TextStyle(fontSize: 9)),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                )
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
                Container(
                  decoration: BoxDecoration(color: appcolor.secondary),
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadiusDirectional.circular(20),
                      color: appcolor.white,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: SingleChildScrollView(
                        child: Column(
                          children: [
                            SizedBox(height: 30),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => const Missing(),
                                        ),
                                      );
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(8),
                                        boxShadow: [
                                          BoxShadow(
                                            color:
                                                Colors.black.withOpacity(0.2),
                                            blurRadius: 7,
                                            spreadRadius: 3,
                                            offset: Offset(0, 2),
                                          ),
                                        ],
                                        color: appcolor.white,
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            Row(
                                              children: [
                                                Image.asset(
                                                  "assets/images/Dashboard/missing.png",
                                                  width: 100,
                                                ),
                                                SizedBox(
                                                  width: 40,
                                                )
                                              ],
                                            ),
                                            Text("COMPLAINT"),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => Lawyer(),
                                        ),
                                      );
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(8),
                                        boxShadow: [
                                          BoxShadow(
                                            color:
                                                Colors.black.withOpacity(0.2),
                                            blurRadius: 7,
                                            spreadRadius: 3,
                                            offset: Offset(0, 2),
                                          ),
                                        ],
                                        color: appcolor.white,
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            Row(
                                              children: [
                                                Image.asset(
                                                  "assets/images/Dashboard/lawyer.png",
                                                  width: 100,
                                                ),
                                                SizedBox(
                                                  width: 40,
                                                )
                                              ],
                                            ),
                                            Text("LAWYER"),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => const Permit(),
                                        ),
                                      );
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(8),
                                        boxShadow: [
                                          BoxShadow(
                                            color:
                                                Colors.black.withOpacity(0.2),
                                            blurRadius: 7,
                                            spreadRadius: 3,
                                            offset: Offset(0, 2),
                                          ),
                                        ],
                                        color: appcolor.white,
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            Row(
                                              children: [
                                                Image.asset(
                                                  "assets/images/Dashboard/permit.png",
                                                  width: 100,
                                                ),
                                                SizedBox(
                                                  width: 40,
                                                )
                                              ],
                                            ),
                                            Text("PERMIT"),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => const Fine(),
                                        ),
                                      );
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(8),
                                        boxShadow: [
                                          BoxShadow(
                                            color:
                                                Colors.black.withOpacity(0.2),
                                            blurRadius: 7,
                                            spreadRadius: 3,
                                            offset: Offset(0, 2),
                                          ),
                                        ],
                                        color: appcolor.white,
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            Row(
                                              children: [
                                                Image.asset(
                                                  "assets/images/Dashboard/fine.png",
                                                  width: 100,
                                                ),
                                                SizedBox(
                                                  width: 40,
                                                )
                                              ],
                                            ),
                                            Text("FINE"),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => const MyCase(),
                                        ),
                                      );
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(8),
                                        boxShadow: [
                                          BoxShadow(
                                            color:
                                                Colors.black.withOpacity(0.2),
                                            blurRadius: 7,
                                            spreadRadius: 3,
                                            offset: Offset(0, 2),
                                          ),
                                        ],
                                        color: appcolor.white,
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            Row(
                                              children: [
                                                Image.asset(
                                                  "assets/images/Dashboard/fileCase.png",
                                                  width: 100,
                                                ),
                                                SizedBox(
                                                  width: 40,
                                                )
                                              ],
                                            ),
                                            Text("CASE"),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => const Emergency(),
                                        ),
                                      );
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(8),
                                        boxShadow: [
                                          BoxShadow(
                                            color:
                                                Colors.black.withOpacity(0.2),
                                            blurRadius: 7,
                                            spreadRadius: 3,
                                            offset: Offset(0, 2),
                                          ),
                                        ],
                                        color: appcolor.white,
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            Row(
                                              children: [
                                                Image.asset(
                                                  "assets/images/Dashboard/alert-em.png",
                                                  width: 100,
                                                ),
                                                SizedBox(
                                                  width: 40,
                                                )
                                              ],
                                            ),
                                            Text("EMERGENCY"),
                                          ],
                                        ),
                                      ),
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
                ),
                Container(
                  decoration: BoxDecoration(color: appcolor.secondary),
                  child: Row(
                    children: [
                      SizedBox(
                        height: 22,
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
