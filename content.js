chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "send_message") {
    var input = document.querySelector(
      'div[contenteditable="true"][data-tab="10"]'
    );
    if (input) {
      // Focus on the input field
      input.focus();

      // Clear existing text (optional)
      document.execCommand("selectAll", false, null);
      document.execCommand("delete", false, null);

      // Insert the message
      document.execCommand("insertText", false, request.message);

      // Trigger an input event to ensure WhatsApp recognizes the message
      input.dispatchEvent(
        new InputEvent("input", { bubbles: true, cancelable: true })
      );

      // Send the message (click the send button)
      var sendButton = document.querySelector('button[data-tab="11"]');
      if (sendButton) {
        sendButton.click();
      } else {
        console.error("Send button not found");
      }
    } else {
      console.error("Input field not found");
    }
  }

  if (request.action === "get_Number") {
    const phonePattern = /\+93\s\d{2}\s\d{3}\s\d{4}/g;

    // Get the text content of the body
    const bodyText = document.body.textContent;

    // Find all matches in the text content
    const matches = bodyText.match(phonePattern);

    // Output the matches
    if (matches) {
      console.log("Found phone numbers:", matches);
    } else {
      console.log("No phone numbers found.");
    }
  }
});
