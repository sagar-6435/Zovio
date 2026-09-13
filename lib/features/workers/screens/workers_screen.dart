import 'package:flutter/material.dart';

class WorkersScreen extends StatelessWidget {
  const WorkersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Workers')),
      body: const Center(
        child: Text('Workers Screen'),
      ),
    );
  }
}
