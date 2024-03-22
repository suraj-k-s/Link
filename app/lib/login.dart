import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:link/dashboard.dart';
import 'package:link/register.dart';
import 'package:progress_dialog_null_safe/progress_dialog_null_safe.dart';

class Login extends StatefulWidget {
  const Login({Key? key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController _name = TextEditingController();
  final TextEditingController _password = TextEditingController();
  bool _obs_text = true;
  late ProgressDialog _progressDialog;

  @override
  void initState() {
    super.initState();
    _progressDialog = ProgressDialog(context);
  }

  void redirectToRegister() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => RegisterScreen()),
    );
  }

  Future<void> login() async {
    _progressDialog.show();

    try {
      final FirebaseAuth auth = FirebaseAuth.instance;
      UserCredential userCredential = await auth.signInWithEmailAndPassword(
        email: _name.text,
        password: _password.text,
      );
      clear();
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => Dashboard()),
      );
    } catch (e) {
      clear();
      _progressDialog.hide();
      String errorMessage = 'Login failed';

      if (e is FirebaseAuthException) {
        errorMessage = e.code;
      }

      Fluttertoast.showToast(
        msg: errorMessage,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      );
    }
  }

  Future<void> handleForgotPassword(String email) async {
    try {
      final auth = FirebaseAuth.instance;
      await auth.sendPasswordResetEmail(email: email);
      print("Password reset email sent to $email");
      Fluttertoast.showToast(
        msg: "Password reset link sent to $email", // Display toast message
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.green,
        textColor: Colors.white,
      );
    } catch (error) {
      print('Error sending password reset email: $error');
      Fluttertoast.showToast(
        msg: "Error sending password reset email",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      );
    }
  }

  void clear() {
    _name.clear();
    _password.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(35.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: 60,
              ),
              Text(
                "Welcome To",
                style: TextStyle(
                  color: Colors.black, // Change to your desired color
                  fontWeight: FontWeight.w800,
                  fontSize: 50,
                ),
              ),
              Text(
                "Link",
                style: TextStyle(
                  color: Colors.black, // Change to your desired color
                  fontWeight: FontWeight.w800,
                  fontSize: 160,
                ),
              ),
              SizedBox(
                height: 100,
              ),
              TextFormField(
                decoration: InputDecoration(
                  hintText: "Email",
                  border: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.blue), // Change to your desired color
                    borderRadius: BorderRadius.circular(8),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.blue), // Change to your desired color
                    borderRadius: BorderRadius.all(Radius.circular(8)),
                  ),
                ),
                controller: _name,
                keyboardType: TextInputType.emailAddress,
              ),
              SizedBox(height: 30),
              TextFormField(
                obscureText: _obs_text,
                decoration: InputDecoration(
                  hintText: "Password",
                  suffixIcon: InkWell(
                    child: Icon(Icons.remove_red_eye_outlined),
                    onTap: () {
                      setState(() {
                        _obs_text = !_obs_text;
                      });
                    },
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.blue), // Change to your desired color
                    borderRadius: BorderRadius.all(Radius.circular(8)),
                  ),
                ),
                controller: _password,
                keyboardType: TextInputType.visiblePassword,
              ),
              SizedBox(height: 30),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  GestureDetector(
                    onTap: () {
                      handleForgotPassword(_name.text); // Call the function to handle forgotten password
                    },
                    child: Text(
                      "Forgotten password",
                      style: TextStyle(
                        color: Colors.blue, // Change to your desired color
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Row(
                    children: [
                      Text(
                        "New Here ? ",
                        style: TextStyle(fontSize: 17),
                      ),
                      GestureDetector(
                        onTap: redirectToRegister,
                        child: Text(
                          "Register",
                          style: TextStyle(
                            color: Colors.blue, // Change to your desired color
                            fontSize: 17,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                  ElevatedButton(
                    onPressed: login,
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Text(
                        "Login",
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      ),
                    ),
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Colors.blue), // Change to your desired color
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5.0),
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
    );
  }
}
