import 'package:flutter_riverpod/flutter_riverpod.dart';

enum UserRole {
  customer,
  worker,
  admin,
  guest,
}

class AuthState {
  final bool isAuthenticated;
  final UserRole userRole;
  final bool isLoading;
  final bool isSetupComplete;

  const AuthState({
    required this.isAuthenticated,
    required this.userRole,
    this.isLoading = false,
    this.isSetupComplete = false,
  });

  AuthState copyWith({
    bool? isAuthenticated,
    UserRole? userRole,
    bool? isLoading,
    bool? isSetupComplete,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      userRole: userRole ?? this.userRole,
      isLoading: isLoading ?? this.isLoading,
      isSetupComplete: isSetupComplete ?? this.isSetupComplete,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(const AuthState(isAuthenticated: false, userRole: UserRole.guest));

  Future<void> login(UserRole role) async {
    state = state.copyWith(isLoading: true);
    // Mock network delay
    await Future.delayed(const Duration(seconds: 1));
    state = AuthState(
      isAuthenticated: true,
      userRole: role,
      isLoading: false,
      isSetupComplete: false, // Must complete setup after login
    );
  }

  void completeSetup() {
    state = state.copyWith(isSetupComplete: true);
  }

  Future<void> logout() async {
    state = state.copyWith(isLoading: true);
    // Mock network delay
    await Future.delayed(const Duration(seconds: 1));
    state = const AuthState(
      isAuthenticated: false,
      userRole: UserRole.guest,
      isLoading: false,
      isSetupComplete: false,
    );
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});
