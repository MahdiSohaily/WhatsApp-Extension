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
    // Changed this to match the sent action
    let phoneNumberElement = document.querySelector(
      'div[data-testid="user-profile-phone-number"]'
    );

    if (!phoneNumberElement) {
      const allDivs = document.querySelectorAll("div");
      allDivs.forEach((div) => {
        if (div.textContent.match(/\+?\d{1,3}\s?\d{2,3}\s?\d{3}\s?\d{4}/)) {
          phoneNumberElement = div;
        }
      });
    }

    if (phoneNumberElement) {
      const phoneNumber = phoneNumberElement.textContent;
      console.log("Phone number:", phoneNumber);
      chrome.runtime.sendMessage({ phoneNumber: phoneNumber });
    } else {
      console.log("Phone number element not found.");
    }
  }
  return true; // Ensure the sendResponse can be used asynchronously
});
