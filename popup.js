document.addEventListener('DOMContentLoaded', function () {
  var appsBtn = document.getElementById('apps');
  appsBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'apps'
    });
  });

  var codingBtn = document.getElementById('coding');
  codingBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'coding'
    });
  });

  var travelBtn = document.getElementById('travel');
  travelBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'travel'
    });
  });

  var recipesBtn = document.getElementById('recipes');
  recipesBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'recipes'
    });
  });

  var moviesBtn = document.getElementById('movies');
  moviesBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'movies'
    });
  });

  var booksBtn = document.getElementById('books');
  booksBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'books'
    });
  });

  var podcastsBtn = document.getElementById('podcasts');
  podcastsBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'podcasts'
    });
  });

  var sportsBtn = document.getElementById('sports');
  sportsBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'sports'
    });
  });

  var musicBtn = document.getElementById('music');
  musicBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'music'
    });
  });

  function setDeleteButton() {
    var deleteButtons = document.getElementsByClassName('deleteBtn');

    for (var i = 0; i < deleteButtons.length; i++) {
      let button = deleteButtons[i];
      button.addEventListener('click', function () {
        chrome.runtime.sendMessage({
          type: 'delete_url',
          id: button.parentElement.id
        });
      })
    };
  }

  enableNotifications();


  function enableNotifications() {
    let toggleButton = document.getElementById('check-button');
    toggleButton.addEventListener('click', function () {
      chrome.runtime.sendMessage({
        type: 'enable_notifications',
        flag: toggleButton.checked
      });
    })

  }


  const dropdownMenu = document.getElementById('select');
  dropdownMenu.onchange = function (event) {
    if (event.target.value !== 'choose') {
      chrome.runtime.sendMessage({
        type: 'add_url',
        category: event.target.value
      });
    } else {
      renderList([]);
    }
  };


  chrome.runtime.onMessage.addListener(
    function (request) {
      switch (request.type) {
        case 'state':
          renderList(request.state.bookmarks[request.state.currentCategory]);
          break;
      }

    }
  )
  chrome.runtime.sendMessage('popup_open');
  chrome.runtime.sendMessage('open_new_tab')


  function renderList(arrUrl) {
    var ul = document.createElement('ul');
    if (arrUrl) {
      arrUrl.forEach(function (urlObj) {
        console.log('rendering', urlObj)
        var li = document.createElement('li');
        li.setAttribute('id', urlObj.id)
        var newLink = document.createElement('a');
        var deleteButton = document.createElement('img');
        deleteButton.setAttribute('src', './images/deltete-btn.png')
        deleteButton.style.width = '16px';
        deleteButton.style.height = '16px';
        deleteButton.style.marginLeft = '5px';
        deleteButton.classList.add('deleteBtn');
        newLink.textContent = urlObj.url;
        newLink.setAttribute('href', urlObj.url);
        newLink.setAttribute('target', '_blank');
        li.appendChild(newLink)
        li.appendChild(deleteButton);
        ul.appendChild(li);
      })
    }
    document.getElementById('my-links').innerHTML = ul.innerHTML;
    setDeleteButton();

  }



});