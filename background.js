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
        chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
          var activeTab = tabs[0];
          addUrlToCategory(activeTab.url, request.category);
          console.log(request.category)
        })
        break;
      case "set_current_category":
        setCurrentCategory(request.category)
    }
  }
);

let state = {
  bookmarks: {
    default: [],
    apps: [],
    coding: [],
    travel: [],
    recipes: [],
    movies: [],
    books: [],
    podcasts: [],
    sports: [],
    music: []
  },
  currentCategory: ''
}

function sendState() {
  chrome.runtime.sendMessage({type: 'state', state: state});
}

function setState(mergeState) {
  state = Object.assign(state, mergeState);
  sendState();
}

function addUrlToCategory(url, category) {
  if (state.bookmarks) {
    if (state.bookmarks[category].indexOf(url) === -1)
    setState({
      bookmarks: Object.assign(state.bookmarks, {
        [category]: state.bookmarks[category].concat(url),
      }),
      currentCategory: category
    });
    console.log(state.bookmarks)
  } else {
    alert("Bookmark not found!")
  }
}

function setCurrentCategory(category) {
  if (state.currentCategory === category) {
    setState({
      currentCategory: null
    })
  } else {
    setState({
      currentCategory: category
    })
  }
}