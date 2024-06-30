const messages = document.querySelectorAll(".msgBtn");

messages.forEach(function (message) {
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
