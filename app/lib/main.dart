import 'package:flutter/material.dart';
import 'package:link/splash_screen.dart';

import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MainApp());
}
class appcolor{
  static const Color primary = Colors.blue;
  static  Color secondary = const Color.fromRGBO(21, 101, 192, 1);
  static  Color accent = Colors.blue.shade100;
  static  Color text = Colors.grey.shade900;
  static  Color text2 = Colors.grey.shade700;
  static  Color red =  Colors.red;
  static  Color white = Colors.white;
  
}
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home:SplashScreen(),
    );
  }
}
