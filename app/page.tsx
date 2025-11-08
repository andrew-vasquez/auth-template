"use client";

import { useState } from "react";
import { signIn, signInSocial } from "@/lib/actions/auth-actions";
import { Box } from "lucide-react";
import { EmailIcon } from "./components/icons/EmailIcon";
import { PasswordIcon } from "./components/icons/PasswordIcon";
import { SignInIcon } from "./components/icons/SignInIcon";
import { GoogleIcon } from "./components/icons/GoogleIcon";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSocialAuth = async (provider: "google") => {
    setIsGoogleLoading(true);
    setError("");

    try {
      await signInSocial(provider);

    } catch (err) {
      setError(
        `Error authenticating with ${provider}: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn(email, password);

      if (result?.user) {
        window.location.href = "/dashboard";
      } else {
        setError("Invalid email or password");
      }
    } catch (error: unknown) {
      console.error("Authentication error:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormDisabled = isLoading || isGoogleLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Box className="w-8 h-8 text-primary-content" />
          </div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Inventory Portal
          </h1>
          <p className="text-base-content/60">
            Welcome back to your inventory management system
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-base-100/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-base-300/50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-base-content mb-1">
              Sign In
            </h2>
            <p className="text-sm text-base-content/60">
              Access your inventory dashboard
            </p>
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="alert alert-error">
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-base-content"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full h-14 pl-12 pr-4 text-base bg-base-100/50 border-base-300 focus:border-primary focus:bg-base-100 transition-all duration-200"
                  placeholder="admin@clinic.com"
                  required
                  disabled={isFormDisabled}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40">
                  <EmailIcon />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-base-content"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full h-14 pl-12 pr-4 text-base bg-base-100/50 border-base-300 focus:border-primary focus:bg-base-100 transition-all duration-200"
                  placeholder="••••••••"
                  required
                  disabled={isFormDisabled}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40">
                  <PasswordIcon />
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  disabled={isFormDisabled}
                />
                <span className="ml-3 text-sm text-base-content/70">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-primary hover:text-primary-focus transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="btn btn-primary w-full h-14 text-base font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
              disabled={isFormDisabled}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <SignInIcon className="w-5 h-5 mr-2" />
                  Sign In to Dashboard
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-base-100 text-base-content/60">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={() => handleSocialAuth("google")}
              className="btn btn-outline w-full h-14 text-base font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-base-300 hover:border-primary"
              disabled={isFormDisabled}
            >
              {isGoogleLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing in with Google...
                </>
              ) : (
                <>
                  <GoogleIcon className="w-5 h-5 mr-2" />
                  Sign in with Google
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-info/10 border border-info/20 rounded-xl">
            <p className="text-xs text-center text-info-content/80 mb-2">
              <span className="font-medium">Demo Credentials:</span>
            </p>
            <p className="text-xs text-center text-info-content/70">
              Email: admin@clinic.com • Password: admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-xs text-base-content/50">
            Secure • HIPAA Compliant • Trusted by healthcare professionals
          </p>
        </footer>
      </div>
    </div>
  );
}