chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "send_message") {
    var input = document.querySelector(
      'div[contenteditable="true"][data-tab="10"]'
    );
    if (input) {
      input.focus();
      document.execCommand("selectAll", false, null);
      document.execCommand("delete", false, null);
      document.execCommand("insertText", false, request.message);
      input.dispatchEvent(
        new InputEvent("input", { bubbles: true, cancelable: true })
      );

      var sendButton = document.querySelector('button[data-tab="11"]');
      if (sendButton) {
        sendButton.click();
        sendResponse({ status: "Message sent" });
      } else {
        console.error("Send button not found");
        sendResponse({ status: "Send button not found" });
      }
    } else {
      console.error("Input field not found");
      sendResponse({ status: "Input field not found" });
    }
  } else if (request.action === "get_number") {
    console.log("hello");
  }
  return true; // Ensure the sendResponse can be used asynchronously
});
