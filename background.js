chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "open_new_tab") {
      const url = `http://new.test/views/callcenter/main.php?phone=${request.phoneNumber}`;
      chrome.tabs.create({ url: url }, function (tab) {
        sendResponse({ status: "Tab opened", tabId: tab.id });
      });
      return true; // Keeps the message channel open for sendResponse
    }
  });
  