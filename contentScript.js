(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      //   newVideoLoaded();
    }
  });

  const newVideoLoaded = (e) => {
    const sideElement = document.getElementById("side");

    // Check if e.target is a child of the element with id "pane-side"
    if (sideElement && sideElement.contains(e.target)) {
      const template = document.createElement("div");
      template.innerHTML = `
        <div style="background-color:white;
          padding: 10px;
          border-radius: 10px;
          width:300px;
          z-index:100000000000000000000000;">
          <ul>
              <li data-message="hello" onclick="addNewBookmarkEventHandler()" style="padding:5px; color:gray">سلام</li>
              <li data-message="hello" onclick="addNewBookmarkEventHandler()" style="padding:5px; color:gray">خداحافظ</li>
              <li data-message="hello" onclick="addNewBookmarkEventHandler()" style="padding:5px; color:gray">ارسال شد</li>
              <li data-message="hello" onclick="addNewBookmarkEventHandler()" style="padding:5px; color:gray">چشم حتمی</li>
              <li data-message="hello" onclick="addNewBookmarkEventHandler()" style="padding:5px; color:gray">باشه</li>
          </ul>
        </div>
      `;
      const bookmarkBtn = template;

      youtubeLeftControls = document.getElementById("main");
      youtubeLeftControls.append(template);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }

    const father = document.getElementsByClassName(
      "lexical-rich-text-input"
    )[1];

    if (!father.querySelector("span.selectable-text")) {
      const lastMessage = father.querySelector("p.selectable-text");
      const newSpan = document.createElement("span");
      newSpan.className = "selectable-text copyable-text";
      newSpan.setAttribute("data-lexical-text", "true");
      newSpan.textContent = "Hello";

      lastMessage.appendChild(newSpan);
    }

    if (e.target.getAttribute("data-message")) {
      alert(e.target.getAttribute("data-message"));
    }
  };

  document.body.addEventListener("click", newVideoLoaded, true);

  const addNewBookmarkEventHandler = () => {
    alert("Bookmark added");
  };
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(1);

  return date.toISOString().substr(11, 0);
};
