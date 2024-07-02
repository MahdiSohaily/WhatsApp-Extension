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
  const buttonDivs = document.querySelector("div#main");
  const header = buttonDivs.querySelector("header");
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
        sendResponse({ status: "Phone number opened" });
      }
    }, 1000);
  } else {
    console.error("Phone number not found");
    sendResponse({ status: "Phone number not found" });
  }
}

function handleCreateBill(sendResponse) {
  const buttonDivs = document.querySelector("div#main");
  const header = buttonDivs.querySelector("header");
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
        sendResponse({ status: "Bill creation opened" });
      }
    }, 1000);
  } else {
    console.error("Phone number not found");
    sendResponse({ status: "Phone number not found" });
  }
}

function getInfoNumber() {
  const header = document.querySelector('div[tabindex="-1"]');
  if (header) {
    const directChildDivs = header.querySelectorAll("div");
    const directChildDivsArray = Array.from(directChildDivs).filter(
      (div) => div.parentElement === header
    );
    const fifthDiv = directChildDivsArray[4];
    if (fifthDiv) {
      let section = fifthDiv.querySelector(
        "span > div > span > div > div > section"
      );
      const directChild = section.querySelectorAll("div");
      const directChildDivsArray = Array.from(directChild).filter(
        (div) => div.parentElement === section
      );
      try {
        const firstDiv = directChildDivsArray[0];
        const directChildren = firstDiv.querySelectorAll("div");
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
          const firstDiv = directChildDivsArray[6];
          const phoneContainer = firstDiv.children[2];
          const phoneNumber =
            phoneContainer.querySelector("div div span span").innerText;
          return modifyPhoneNumber(phoneNumber);
        } catch (error) {
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

setTimeout(() => {
  let chatList = getChatList();
  if (!chatList) {
    chatList = getChatList();
  }
  chatList.forEach((chat) =>
    chat.addEventListener("click", () => {
      setTimeout(() => {
        const main = document.getElementById("main");
        appendButton(main);
      }, 500);
    })
  );
}, 5000);

function appendButton(header) {
  const container = document.createElement("div");
  container.id = "customContainer";
  container.style.marginLeft = "10px";

  const content = document.createElement("div");
  content.innerHTML = `<div style="background-color:white; direction:rtl !important;">
                        <section>
                          <button class="customBtn msgBtn" type="button" data-text="سلام" id="message1">سلام</button>
                          <button class="customBtn msgBtn" type="button" data-text="حال شما چطور است؟" id="message2">حال شما چطور است؟</button>
                          <button class="customBtn msgBtn" type="button" data-text="خدانگهدار" id="message3">خدانگهدار</button>
                        </section>
                        <section id="operations">
                          <button class="customBtn btnSubmit" type="button" id="cartable">کارتابل</button>
                          <button class="customBtn btnSubmit" type="button" id="factor">فاکتور</button>
                        </section>
                      </div>`;
  const style = document.createElement("style");
  style.innerHTML = `
          .customBtn {
              border: none;
              color: white;
              padding: 5px 10px;
              border-radius: 5px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 12px;
              margin: 4px 2px;
              cursor: pointer !important;
          }

          .msgBtn {
              background-color: #3a6dcd;
          }

          .btnSubmit {
              display: inline-flex;
              align-items: center;
              background-color: seagreen;
              cursor: pointer !important;
          }`;
  document.head.appendChild(style);

  header.insertAdjacentHTML(
    "beforeend",
    `<div style="background-color:white; direction:rtl !important; z-index:100000000000000 !important">
                        <section>
                          <button class="customBtn msgBtn" type="button" data-text="سلام" id="message1">سلام</button>
                          <button class="customBtn msgBtn" type="button" data-text="حال شما چطور است؟" id="message2">حال شما چطور است؟</button>
                          <button class="customBtn msgBtn" type="button" data-text="خدانگهدار" id="message3">خدانگهدار</button>
                        </section>
                        <section id="operations">
                          <button class="customBtn btnSubmit" type="button" id="cartable">کارتابل</button>
                          <button class="customBtn btnSubmit" type="button" id="factor">فاکتور</button>
                        </section>
                      </div>`
  );

  // Attach event listeners to the buttons
  document.getElementById("message1").addEventListener("click", () => {
    sendMessage("سلام", (response) => console.log(response));
  });
  document.getElementById("message2").addEventListener("click", () => {
    sendMessage("حال شما چطور است؟", (response) => console.log(response));
  });
  document.getElementById("message3").addEventListener("click", () => {
    sendMessage("خدانگهدار", (response) => console.log(response));
  });
  document.getElementById("cartable").addEventListener("click", () => {
    handleGetNumber((response) => console.log(response));
  });
  document.getElementById("factor").addEventListener("click", () => {
    handleCreateBill((response) => console.log(response));
  });
}
