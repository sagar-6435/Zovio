import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowLeft, User as UserIcon, Mail, Phone, Lock, Loader2, Briefcase } from 'lucide-react';
import { API_BASE_URL } from '../lib/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'partner'>('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate({ from: '/register' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      login(data.token, data.user);
      
      if (data.user.role === 'partner') {
        navigate({ to: '/worker' });
      } else {
        navigate({ to: '/' });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to authenticate with Google');
      }

      login(data.token, data.user);
      
      if (data.user.role === 'partner') {
        navigate({ to: '/worker' });
      } else {
        navigate({ to: '/' });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-cream flex items-center justify-center p-4 relative overflow-hidden py-12">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full max-w-md z-10">
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-brand-teal hover:text-brand-orange-strong transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-extrabold text-brand-deep-navy">Create Account</h1>
            <p className="text-ink-soft mt-2">Join Zovio and get things done</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  role === 'customer' ? 'bg-white text-brand-deep-navy shadow-sm' : 'text-gray-500 hover:text-brand-deep-navy'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('partner')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  role === 'partner' ? 'bg-white text-brand-teal shadow-sm' : 'text-gray-500 hover:text-brand-teal'
                }`}
              >
                <div className="flex justify-center items-center gap-1.5">
                  <Briefcase className="w-4 h-4" /> Partner
                </div>
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-deep-navy mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-deep-navy mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white/50 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-deep-navy mb-1.5">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-gray-500 font-medium border-r border-gray-200 pr-2">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-20 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white/50 transition-colors"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-deep-navy mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal bg-white/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 mt-6 border border-transparent rounded-xl shadow-sm text-sm font-extrabold text-white bg-brand-deep-navy hover:bg-brand-deep-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-deep-navy transition-all disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 text-gray-500 backdrop-blur-xl">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google sign-up failed')}
                useOneTap
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-ink-soft">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-teal hover:text-brand-orange-strong transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
