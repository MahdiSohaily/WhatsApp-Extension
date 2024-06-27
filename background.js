chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("whatsapp.com")) {
      // const queryParameters = tab.url.split("?")[1];
      // const urlParameters = new URLSearchParams(queryParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: "Dsdfsd",
      });
    }
  });
  