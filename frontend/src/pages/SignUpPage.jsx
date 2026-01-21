import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/authSlice";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon, RocketIcon, UsersIcon, MessageSquareIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { isSigningUp } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-slate-950 via-purple-950/20 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 right-10 w-24 h-24 border border-purple-500/20 rounded-full animate-float" />
      <div className="absolute bottom-10 left-10 w-16 h-16 border border-cyan-500/20 rounded-lg rotate-45 animate-float-delay" />
      <div className="absolute top-1/3 left-20 w-12 h-12 border border-purple-500/20 rounded-full animate-float" />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Form */}
          <div className="w-full order-2 md:order-1">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl p-8 md:p-10">
              {/* Mobile logo */}
              <div className="md:hidden flex items-center justify-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-2xl">
                  <MessageCircleIcon className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ChitChat
                </h1>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Join ChitChat</h2>
                <p className="text-slate-400">Create your account and start chatting</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MailIcon className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockIcon className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      placeholder="Min. 6 characters"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSigningUp ? (
                    <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Branding */}
          <div className="hidden md:block space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-2xl shadow-lg shadow-purple-500/20">
                <MessageCircleIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ChitChat
                </h1>
                <p className="text-slate-400 text-sm">Connect & Chat</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Start Your Journey
                <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Connect Instantly
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Join thousands of users already chatting on ChitChat. Your next conversation is just moments away.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm">
                <RocketIcon className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-1">Quick Setup</h3>
                <p className="text-slate-400 text-sm">Get started in seconds</p>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 backdrop-blur-sm">
                <UsersIcon className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-1">Connect</h3>
                <p className="text-slate-400 text-sm">Chat with anyone</p>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 backdrop-blur-sm">
                <MessageSquareIcon className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-1">Real-time</h3>
                <p className="text-slate-400 text-sm">Instant messaging</p>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm">
                <div className="w-8 h-8 flex items-center justify-center bg-purple-400/20 rounded-lg mb-3">
                  <span className="text-purple-400 font-bold text-lg">∞</span>
                </div>
                <h3 className="text-white font-semibold mb-1">Free Forever</h3>
                <p className="text-slate-400 text-sm">No hidden costs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;
