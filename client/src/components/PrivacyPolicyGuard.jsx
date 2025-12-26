import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPrivacyPolicyAccepted } from "../store/authSlice";

const PrivacyPolicyGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privacyPolicyAccepted = useSelector(
    (state) => state.auth.privacyPolicyAccepted
  );

  console.log("privacyPolicyAccepted from store:", privacyPolicyAccepted);
  useEffect(() => {
    const checkPrivacyPolicy = async () => {
      // first check if privacy policy is already accepted in redux store
      if (privacyPolicyAccepted) {
        setAccepted(true);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/privacy/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const isAccepted = data.accepted;
          setAccepted(isAccepted);
          dispatch(setPrivacyPolicyAccepted(isAccepted));

          if (!isAccepted) {
            navigate("/privacy-policy");
            return;
          }
        }
      } catch (error) {
        console.error("Privacy policy check error:", error);
      }

      setLoading(false);
    };

    checkPrivacyPolicy();
  }, [navigate, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return children;
};

export default PrivacyPolicyGuard;
