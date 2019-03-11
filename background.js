let now = new Date(), hours = 17, minutes = 59, seconds = 45;
let initialDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
let whenToRing = initialDate.getTime();

chrome.runtime.onMessage.addListener(
  function (request) {
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
          console.log('activeTab.url', activeTab.url)
          addUrlToCategory(activeTab.url, request.category);
        })
        break;
      case "set_current_category":
        setCurrentCategory(request.category);
        break;
      case "delete_url":
      console.log(request)
      deleteUrl(request)
     
        break;
      // case "create_alarm":
      //   chrome.alarms.create('MyAlarm', {
      //     when: whenToRing,
      //     periodInMinutes: 1440
      //   });
      case "enable_notifications":
      const newState = { enableNotifications: request.flag }
      console.log('flag', newState)
      setState(newState);
      if (request.flag) {
         chrome.alarms.create("EnableNotifications", {
        when: Date.now()
      })
      }
     
        break;
      }
    }
  
);
let state = {
  bookmarks: {
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
  currentCategory: '',
  enableNotifications: false
}

function sendState() {
  chrome.runtime.sendMessage({type: 'state', state: state});
  console.log('state: ', state);
}

function setState(mergeState) {
  state = Object.assign(state, mergeState);
  sendState();
}

function addUrlToCategory(url, category) {
  if(state.enableNotifications)
  chrome.alarms.create('MyAlarm', {
    when: Date.now()+4000,
    periodInMinutes: 1440
  });

  if (state.bookmarks) {
    if (state.bookmarks[category].indexOf(url) === -1)
    setState({
      bookmarks: Object.assign(state.bookmarks, {
        [category]: state.bookmarks[category].concat({ url, id: url}),
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

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'MyAlarm') {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/url-alarm.png',
        title: 'Reminder!',
        message: 'Time to read your links :-)'
    });
  } else if (alarm.name === 'EnableNotifications') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/books.png',
      title: 'Notifications ON!',
      message: ''
  });
  }
});

function deleteUrl (urlObj) {
  const index = state.bookmarks[state.currentCategory].findIndex(i => i.id === urlObj.id);
  console.log('index: ', index, 'urlObj: ', urlObj)
  state.bookmarks[state.currentCategory].splice(index, 1);
  sendState()
}



