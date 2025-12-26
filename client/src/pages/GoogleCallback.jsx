// src/pages/GoogleCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setPrivacyPolicyAccepted } from "../store/authSlice";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          // Exchange code with backend
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/google/callback?code=${code}`
          );
          const data = await response.json();

          // Save JWT token
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // need to do api call to get user info
          const status = await fetch("/api/privacy/status", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // check if user accepted privacy policy
          if (!status?.accepted) {
            navigate("/privacy-policy");
            return;
          }
          // update redux store
          dispatch(setPrivacyPolicyAccepted(true));

          // Redirect to dashboard
          navigate("/dashboard");
        } catch (error) {
          console.error("Google auth error:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
