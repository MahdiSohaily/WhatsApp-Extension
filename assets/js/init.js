document.addEventListener("DOMContentLoaded", function () {
  const messageButtons = document.querySelectorAll(".messageBtn");

  messageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const message = button.getAttribute("data-message");
      sendMessage(message);
    });
  });

  function sendMessage(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: sendMessageToWhatsApp,
      });
    });

    function sendMessageToWhatsApp() {
      const inputField = document.querySelector("span.selectable-text");
      console.log(inputField);

      const sendButton = document.querySelector(
        'button[data-tab="11"][aria-label="Send"]'
      );

      if (inputField && sendButton) {
        inputField.textContent = message;
        inputField.dispatchEvent(new Event("input", { bubbles: true }));
        // Click the send button
        sendButton.click();
      } else {
        console.error("Error: Input field or send button not found.");
      }
    }
  }
});
