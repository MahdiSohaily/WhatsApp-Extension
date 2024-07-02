// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "send_message") {
    sendMessage(request.message, sendResponse);
  } else if (request.action === "get_number") {
    handleGetNumber(sendResponse);
  } else if (request.action === "create_bill") {
    handleCreateBill(sendResponse);
  }
  return true; // Indicates we will send a response asynchronously
});

function sendMessage(message, sendResponse) {
  const input = document.querySelector(
    'div[contenteditable="true"][data-tab="10"]'
  );
  if (input) {
    input.focus();
    document.execCommand("selectAll", false, null);
    document.execCommand("delete", false, null);
    document.execCommand("insertText", false, message);
    input.dispatchEvent(
      new InputEvent("input", { bubbles: true, cancelable: true })
    );
    setTimeout(() => {
      const sendButton = document.querySelector('button[data-tab="11"]');
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
}

function handleGetNumber(sendResponse) {
  // Get all div elements with role="button" inside the header
  const buttonDivs = document.querySelector("div#main");
  const header = buttonDivs.querySelector("header");
  // Select the second div inside the header
  const secondDiv = header.querySelectorAll("div")[1];
  if (secondDiv) {
    secondDiv.click();
    setTimeout(() => {
      const phoneNumber = getInfoNumber();
      if (phoneNumber) {
        window.open(
          `http://192.168.9.14/YadakShop-APP/views/callcenter/main.php?phone=${phoneNumber}`,
          "_blank"
        );
      }
    }, 1000);
  } else {
    console.error("Phone number not found");
    sendResponse({ status: "Phone number not found" });
  }
}

function handleCreateBill(sendResponse) {
  // Get all div elements with role="button" inside the header
  const buttonDivs = document.querySelector("div#main");
  const header = buttonDivs.querySelector("header");
  // Select the second div inside the header
  const secondDiv = header.querySelectorAll("div")[1];
  if (secondDiv) {
    secondDiv.click();
    setTimeout(() => {
      const phoneNumber = getInfoNumber();
      if (phoneNumber) {
        window.open(
          `http://192.168.9.14/YadakShop-APP/views/factor/createIncomplete.php?phone=${phoneNumber}`,
          "_blank"
        );
      }
    }, 1000);
  } else {
    console.error("Phone number not found");
    sendResponse({ status: "Phone number not found" });
  }
}

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
        try {
          // Select the 5th direct child div (index 4)
          const firstDiv = directChildDivsArray[6];
          const phoneContainer = firstDiv.children[2];
          const phoneNumber =
            phoneContainer.querySelector("div div span span").innerText;

          return modifyPhoneNumber(phoneNumber);
        } catch (error) {
          // Select the 5th direct child div (index 4)
          const firstDiv = directChildDivsArray[7];
          const phoneContainer = firstDiv.children[2];
          const phoneNumber =
            phoneContainer.querySelector("div div span span").innerText;

          return modifyPhoneNumber(phoneNumber);
        }
      }
    }
  }
  return null;
}

function modifyPhoneNumber(phoneNumber) {
  const parts = phoneNumber.split(" ");
  parts[0] = 0;
  phoneNumber = parts.join("");
  phoneNumber = phoneNumber.replace(/\D+/g, "");
  return phoneNumber;
}

function getHeader() {
  const header = document.querySelector('div[tabindex="-1"] header');
  return header;
}

function getChatList() {
  const chatList = document.querySelectorAll('div[role="listitem"]');
  return chatList;
}
function appendButton(header) {
  const container = document.createElement("div");
  container.id = "customContainer";
  container.style.marginLeft = "10px";

  const content = document.createElement("div");
  content.className = "btn btn-primary";
  content.innerHTML = `<div>
                        <section>
                          <h2>پیام مدنظر خود را برای ارسال انتخاب کنید</h2>
                          <button class="btn msgBtn" type="button" data-text="سلام" id="message1">سلام</button>
                          <button class="btn msgBtn" type="button" data-text="حال شما چطور است؟" id="message2">حال شما چطور است؟</button>
                          <button class="btn msgBtn" type="button" data-text="خدانگهدار" id="message3">خدانگهدار</button>
                        </section>
                        <section id="operations">
                          <button class="btn btnSubmit" type="button" id="cartable">کارتابل</button>
                          <button class="btn btnSubmit" type="button" id="factor">فاکتور</button>
                        </section>
                      </div>`;

  const additionalContent = document.createElement("div");
  additionalContent.innerHTML = `
    `;
  header.appendChild(content);

  // Attach event listeners to the buttons
  document
    .getElementById("message1")
    .addEventListener("click", () =>
      sendMessage("سلام", (response) => console.log(response))
    );
  document
    .getElementById("message2")
    .addEventListener("click", () =>
      sendMessage("حال شما چطور است؟", (response) => console.log(response))
    );
  document
    .getElementById("message3")
    .addEventListener("click", () =>
      sendMessage("خدانگهدار", (response) => console.log(response))
    );
  document
    .getElementById("cartable")
    .addEventListener("click", () =>
      handleGetNumber((response) => console.log(response))
    );
  document
    .getElementById("factor")
    .addEventListener("click", () =>
      handleCreateBill((response) => console.log(response))
    );
}

setTimeout(() => {
  let chatList = getChatList();
  if (!chatList) {
    chatList = getChatList();
  }
  chatList.forEach((chat) =>
    chat.addEventListener("click", () => {
      appendButton(document.getElementById("main"));
    })
  );
}, 5000);
