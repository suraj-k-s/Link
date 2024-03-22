import 'package:flutter/material.dart';
import 'package:link/login.dart';
import 'package:lottie/lottie.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
void initState(){
  
  super.initState();
  Future.delayed(const Duration(seconds: 2),(){
    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => Login(),));
  });
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Lottie.asset('assets/Loader.json', width: 1000),),
    );
  }
}
