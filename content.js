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
      setTimeout(() => {
        var sendButton = document.querySelector('button[data-tab="11"]');
        if (sendButton) {
          sendButton.click();
          sendResponse({ status: "Message sent" });
        } else {
          console.error("Send button not found");
          sendResponse({ status: "Send button not found" });
        }
      }, 1000);
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
      setTimeout(() => {
        const phoneNumber = getInfoNumber();
        if (phoneNumber) {
          window.open(
            `http://new.test/views/callcenter/main.php?phone=${phoneNumber}`,
            "_blank"
          );
        }
      }, 1000);
    } else {
      console.error("The second div element was not found.");
      sendResponse({ status: "Second div not found" });
    }
  }
  return true; // Ensure the sendResponse can be used asynchronously
});

function getInfoNumber() {
  // Select the header element with tabindex="-1"
  const header = document.querySelector('div[tabindex="-1"]');

  if (header) {
    const directChildDivs = header.querySelectorAll("div");

    // Filter out direct child div elements
    const directChildDivsArray = Array.from(directChildDivs).filter(
      (div) => div.parentElement === header
    );

    // Select the 5th direct child div (index 4)
    const fifthDiv = directChildDivsArray[4];

    if (fifthDiv) {
      let section = fifthDiv.querySelector(
        "span > div > span > div > div > section"
      );
      const directChild = section.querySelectorAll("div");

      // Filter out direct child div elements
      const directChildDivsArray = Array.from(directChild).filter(
        (div) => div.parentElement === section
      );
      try {
        // Select the 5th direct child div (index 4)
        const firstDiv = directChildDivsArray[0];
        const directChildren = firstDiv.querySelectorAll("div");

        // Filter out direct child div elements
        const ChildDivsArray = Array.from(directChildren).filter(
          (div) => div.parentElement === firstDiv
        );

        const secondDiv = directChildDivsArray[0];
        const phoneNumber =
          secondDiv.children[1].children[1].querySelector(
            "div span span span"
          ).innerText;

        return modifyPhoneNumber(phoneNumber);
      } catch (error) {
        // Select the 5th direct child div (index 4)
        const firstDiv = directChildDivsArray[6];
        const phoneContainer = firstDiv.children[2];
        const phoneNumber =
          phoneContainer.querySelector("div div span span").innerText;

        return modifyPhoneNumber(phoneNumber);
      }
    }
  }
  return null;
}

function modifyPhoneNumber(phoneNumber) {
  const parts = phoneNumber.split(" ");
  parts[0] = 0;
  phoneNumber = parts.join("");
  // Remove all whitespace
  phoneNumber = phoneNumber.replace(/\D+/g, "");

  return phoneNumber;
}
