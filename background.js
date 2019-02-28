
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log('req', request);
    switch (request.type) {
      case "popup_open":
        console.log('Pop up open')
        break;
      case "open_new_tab":
        chrome.tabs.create({
          "url": request.url
        });
        break;
      case "add_url":
      console.log('here')
        chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
          console.log(tabs)
          var activeTab = tabs[0];
          addUrlToCategory(activeTab.url, request.category);
         

        })
        break;
    }
  }
);

const state = {
  bookmarks: {
    default: [],
    apps: [],
    coding: [],
    travel: []
  }
}

function addUrlToCategory(url, category) {
  console.log('wertyui');
  if (state.bookmarks) {
    state.bookmarks[category].push(url)
    console.log(state.bookmarks)
  } else {
    alert("Bookmark not found!")
  }
}