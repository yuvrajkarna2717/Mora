import { useExtensionData } from './useExtensionData';

export const useExportData = (extensionData) => {
  const { fetchExtensionData } = useExtensionData();

  const exportData = async () => {
    let dataToExport = extensionData;
    
    // If no data provided, fetch fresh data
    if (!dataToExport || Object.keys(dataToExport).length === 0) {
      await fetchExtensionData();
      // Get fresh data after fetch
      const response = await new Promise((resolve) => {
        const handleMessage = (event) => {
          if (event.data.type === "EXTENSION_DATA_RESPONSE") {
            window.removeEventListener("message", handleMessage);
            resolve(event.data);
          }
        };
        window.addEventListener("message", handleMessage);
        window.postMessage({ type: "GET_EXTENSION_DATA" }, "*");
        setTimeout(() => {
          window.removeEventListener("message", handleMessage);
          resolve({ data: {} });
        }, 1000);
      });
      dataToExport = response.data || {};
    }

    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mora-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return { exportData };
};