const messages = [
  `قربان خودشون نیستن که بخوام تخفیف بگیرم شرمندتون شدیم`,
  `قربان کم تر نمیشه متاسفانه شرمندتون شدیم`,
  `چشم بررسی بشه اطلاع میدم`,
  `سلام صبح بخیر`,
  `سلام روز بخیر`,
  `خدمت شما لطفا بررسی کنید`,
  `لطفا تایید کنید`,
  `قربان توی سیستم فقط خرده مشابه هست`,
  `مشابه هست قربان`,
];

// Function to create and append buttons
function createButtons() {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = "پیام مدنظر خود را برای ارسال انتخاب کنید";
  section.appendChild(heading);

  messages.forEach((message, index) => {
    const button = document.createElement("button");
    button.classList.add("btn", "msgBtn");
    button.setAttribute("type", "button");
    button.setAttribute("data-text", message);
    button.id = `message${index + 1}`;
    button.textContent = message;
    section.appendChild(button);
  });

  // Append the section to the body or another container element
  document.getElementById("buttonContainer").appendChild(section);
}

// Call the function to create the buttons
createButtons();

const AllMessages = document.querySelectorAll(".msgBtn");

AllMessages.forEach(function (message) {
  message.addEventListener("click", function () {
    const text = message.getAttribute("data-text");
    sendMessage(message.textContent);
  });
});

function sendMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "send_message",
      message: message,
    });
  });
}

const cartable = document.getElementById("cartable");
cartable.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "get_number", // Changed this to match the listener action
    });
  });
});

const factor = document.getElementById("factor");
factor.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "create_bill", // Changed this to match the listener action
    });
  });
});

const addToChat = document.getElementById("addToChat");
factor.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "addToChat", // Changed this to match the listener action
    });
  });
});