import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon, SparklesIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { isLoggingIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.1),transparent)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-cyan-500/20 rounded-lg rotate-12 animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-cyan-500/20 rounded-full animate-float-delay" />
      <div className="absolute top-1/2 right-20 w-12 h-12 border border-cyan-500/20 rounded-lg -rotate-12 animate-float" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden md:block space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
                <MessageCircleIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ChitChat
                </h1>
                <p className="text-slate-400 text-sm">Stay Connected</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Welcome Back to
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your Conversations
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Continue chatting with your friends and colleagues in real-time.
              </p>
            </div>

            <div className="space-y-3 pt-6">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <ZapIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Instant Messaging</p>
                  <p className="text-slate-400 text-xs">Lightning-fast real-time chat</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <ShieldCheckIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">End-to-End Security</p>
                  <p className="text-slate-400 text-xs">Your privacy is our priority</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <SparklesIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Smart Features</p>
                  <p className="text-slate-400 text-xs">Media sharing, forwarding & more</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl p-8 md:p-10">
              {/* Mobile logo */}
              <div className="md:hidden flex items-center justify-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl">
                  <MessageCircleIcon className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ChitChat
                </h1>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-slate-400">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MailIcon className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
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
                      <LockIcon className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoggingIn ? (
                    <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-400">
                  New to ChitChat?{" "}
                  <Link
                    to="/signup"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
