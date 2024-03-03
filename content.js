chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "send_message") {
    // ~SAME CODE AS BEFORE

    function modifyMessage() {
      const editorSpan = editorElement.querySelector("span[data-lexical-text]"); // get span[data-lexical-text]
      console.log("editorSpan:", editorSpan);
      if (editorSpan) {
        // might not exist if the input field is empty
        const origMessage = editorSpan.childNodes[0].data; // get original message from text node (first child)
        const newMessage = "*AUTHOR* 😎\n" + origMessage;
        editorSpan.childNodes[0].data = newMessage; // alter it!
        console.log(
          "origMessage:",
          `"${origMessage}"`,
          "newMessage:",
          `"${editorSpan.childNodes[0].data}"`
        );
      }
    }

    function handleEvent(e) {
      console.log("handleEvent:", e);
      if ((e.type === "keydown" && e.key === "Enter") || e.type === "click") {
        modifyMessage();
      }
    }

    // SLIGHTLY MODIFIED CODE (should also handle send button and text messages below images)

    function waitForElement(selector, callback) {
      // check if element matching selector is already in the DOM
      let matchedElement = document.querySelector(selector);
      if (matchedElement) {
        callback(matchedElement);
      }

      // setup a MutationObserver that listens to changes to the DOM
      let mutObserver = new MutationObserver((mutationRecords, observer) => {
        for (const mutation of mutationRecords) {
          if (mutation.addedNodes?.length > 0)
            console.log("addedNodes:", mutation.addedNodes);
          for (const addedNode of mutation.addedNodes) {
            if (addedNode.matches(selector)) {
              callback(addedNode);
            }
          }
          /*if (mutation.removedNodes?.length > 0) console.log('removedNodes:', mutation.removedNodes);
      for (const removedNode of mutation.removedNodes) {
        if (removedNode.matches(selector)) {
          callback(removedNode);
        }
      }*/
        }
      });
      const options = {
        childList: true,
        subtree: true,
      };
      mutObserver.observe(document.documentElement, options);

      return mutObserver; // so that you can call .disconnect() to stop observing
    }

    let editorElement = null; // this will store the editorElement for the current chat
    let sendButtonElement = null; // this will store the sendButtonElement for the current chat

    // watch for changes to the DOM (for elements added inside "._2xAQV" (which match the right panes))
    let observer = waitForElement("._2xAQV *", (matchedElement) => {
      console.log("matchedElement:", matchedElement);

      // editor
      const editorSelector = "._2xAQV .lexical-rich-text-input"; //'#main div[data-lexical-editor]'
      let newEditorElement = document.querySelector(editorSelector);
      if (editorElement != newEditorElement) {
        // check if it's actually a different editorElement
        editorElement = newEditorElement;
        console.log("new editorElement:", editorElement);

        const USE_CAPTURE = true;
        if (editorElement)
          editorElement.removeEventListener(
            "keydown",
            handleEvent,
            USE_CAPTURE
          ); // remove event listener
        editorElement.addEventListener("keydown", handleEvent, {
          capture: USE_CAPTURE,
        }); // NOTE: 'capture:true' may be needed in this case, to ensure the key event is captured before WA handles it */
      }

      // send button
      const sendButtonSelector = '._2xAQV span[data-icon="send"]'; //'#main div[data-lexical-editor]'
      let newSendButtonElement =
        document.querySelector(sendButtonSelector)?.parentElement;
      if (sendButtonElement != newSendButtonElement) {
        // check if it's actually a different sendButtonElement
        sendButtonElement = newSendButtonElement;
        console.log("new newSendButtonElement:", sendButtonElement);

        const USE_CAPTURE = true;
        if (sendButtonElement)
          sendButtonElement.removeEventListener(
            "click",
            handleEvent,
            USE_CAPTURE
          ); // remove event listener
        sendButtonElement.addEventListener("click", handleEvent, {
          capture: USE_CAPTURE,
        }); // NOTE: 'capture:true' may be needed in this case, to ensure the click event is captured before WA handles it */
      }
    });
    // observer.disconnect();
  }
});
