document.addEventListener('DOMContentLoaded', function () {
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    sendMessageBtn.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['assets/js/content.js']
        });
        
        const messageToSend = "Hello from my Chrome extension!";
        chrome.tabs.sendMessage(tabs[0].id, { action: 'sendMessage', message: messageToSend });
      });
    });
  });
  