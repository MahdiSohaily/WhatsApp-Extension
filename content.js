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
    // Get all div elements with role="button" inside the header
    const buttonDivs = document.querySelector("div#main");
    const header = buttonDivs.querySelector("header");
    // Select the second div inside the header
    const secondDiv = header.querySelectorAll("div")[1];

    // Click on the second div
    if (secondDiv) {
      secondDiv.click();
      getInfoNumber();
    } else {
      console.error("The second div element was not found.");
    }

    // Send the result back
    sendResponse({ buttons: "buttonDivsArray" });
  }
  return true; // Ensure the sendResponse can be used asynchronously
});

function getInfoNumber() {
  // Select the header element with tabindex="-1"
  const header = document.querySelector('div[tabindex="-1"]');

  if (header) {
    // Select all div elements that are direct children of header
    const directChildDivs = header.querySelectorAll("div");

    // Filter out direct child div elements
    const directChildDivsArray = Array.from(directChildDivs).filter(
      (div) => div.parentElement === header
    );

    // Select the 5th direct child div (index 4)
    const fifthDiv = directChildDivsArray[4];

    if (fifthDiv) {
      console.log(fifthDiv);
      let section = fifthDiv.querySelector(
        "span > div > span > div > div > section"
      );
      const directChild = section.querySelectorAll("div");

      // Filter out direct child div elements
      const directChildDivsArray = Array.from(directChild).filter(
        (div) => div.parentElement === section
      );

      // Select the 5th direct child div (index 4)
      const firstDiv = directChildDivsArray[0];

      console.log(firstDiv.querySelector("span.selectable-text").innerHTML);

      // Assuming `sendResponse` is a function to send data back
    } else {
      console.error(
        "The 5th direct child div element inside the header was not found."
      );
    }
  } else {
    console.error("Header element with tabindex='-1' was not found.");
  }
}
