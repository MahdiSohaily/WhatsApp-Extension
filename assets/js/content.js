// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendMessage') {
      const messageToSend = message.message;
      
      // Find the input field and type the message
      const inputField = document.querySelector('div._2_1wd.copyable-text.selectable-text[contenteditable=true]');
      if (inputField) {
        inputField.textContent = messageToSend;
        inputField.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Simulate sending the message (press Enter)
        const keyboardEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true
        });
        inputField.dispatchEvent(keyboardEvent);
      }
    }
  });
  