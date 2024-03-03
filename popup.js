document.getElementById('message1').addEventListener('click', function() {
    sendMessage("Hello!");
  });
  
  document.getElementById('message2').addEventListener('click', function() {
    sendMessage("How are you?");
  });
  
  document.getElementById('message3').addEventListener('click', function() {
    sendMessage("See you later!");
  });
  
  document.getElementById('sendButton').addEventListener('click', function() {
    var customMessage = document.getElementById('customMessage').value;
    sendMessage(customMessage);
  });
  
  function sendMessage(message) {
    console.log('Sending message:', message);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'send_message', message: message });
    });
  }
  
  