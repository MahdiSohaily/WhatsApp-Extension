chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

  // Example: Send a predefined message when extension button is clicked
  const predefinedMessage = "Hello from WhatsApp Message Sender!";
  chrome.tabs.sendMessage(tab.id, {
    action: "sendMessage",
    message: predefinedMessage,
  });
});
