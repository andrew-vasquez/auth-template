"use client";

import { useState } from "react";
import { signInSocial } from "@/lib/actions/auth-actions";
import { Box } from "lucide-react";
import { GoogleIcon } from "./components/icons/GoogleIcon";

export default function Home() {
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

          {/* Error Message */}
          {error && (
            <div className="alert alert-error mb-6">
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={() => handleSocialAuth("google")}
            className="btn btn-primary w-full h-14 text-base font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
            disabled={isGoogleLoading}
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
        </div>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-xs text-base-content/50">
            Secure • Reliable 
          </p>
        </footer>
      </div>
    </div>
  );
}