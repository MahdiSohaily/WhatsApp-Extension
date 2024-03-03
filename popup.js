document.addEventListener('DOMContentLoaded', function() {
    var fillButton = document.getElementById('fillButton');
    fillButton.addEventListener('click', function() {
      var messageSelect = document.getElementById('messageSelect');
      var selectedMessage = messageSelect.options[messageSelect.selectedIndex].value;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.querySelector("div[contenteditable=true]").innerText = "' + selectedMessage + '";'}
        );
      });
    });
  });
  