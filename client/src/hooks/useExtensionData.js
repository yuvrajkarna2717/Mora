import { useState } from 'react';

export const useExtensionData = () => {
  const [extensionData, setExtensionData] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExtensionData = async () => {
    try {
      console.log("Fetching extension data...");

      const response = await new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 3;

        const handleMessage = (event) => {
          if (event.data.type === "EXTENSION_DATA_RESPONSE") {
            console.log("Received extension data:", event.data);
            window.removeEventListener("message", handleMessage);
            resolve(event.data);
          }
        };

        const tryFetch = () => {
          attempts++;
          console.log(`Attempt ${attempts} to fetch extension data`);

          window.addEventListener("message", handleMessage);
          window.postMessage({ type: "GET_EXTENSION_DATA" }, "*");

          setTimeout(() => {
            window.removeEventListener("message", handleMessage);

            if (attempts < maxAttempts) {
              console.log(`Attempt ${attempts} failed, retrying...`);
              setTimeout(tryFetch, 500);
            } else {
              console.log("All attempts failed, using sample data");
              resolve({
                data: {
                  "Thu Dec 26 2025": {
                    "github.com": 7200000,
                    "stackoverflow.com": 3600000,
                    "netlify.com": 40000,
                  },
                },
              });
            }
          }, 1000);
        };

        tryFetch();
      });

      if (response.data && Object.keys(response.data).length > 0) {
        console.log("Setting extension data:", response.data);
        setExtensionData(response.data);
        const dates = Object.keys(response.data).sort(
          (a, b) => new Date(b) - new Date(a)
        );
        setAvailableDates(dates);
        console.log(
          "Extension data loaded:",
          Object.keys(response.data).length,
          "dates"
        );
        return dates;
      } else {
        console.log("No extension data received, keeping current state");
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch extension data:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    extensionData,
    availableDates,
    loading,
    fetchExtensionData,
    setExtensionData,
    setAvailableDates,
    setLoading
  };
};