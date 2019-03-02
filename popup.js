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

  var sportsBtn = document.getElementById('music');
  sportsBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'set_current_category',
      category: 'music'
    });
  });


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
    arrUrl.forEach(function (url) {
      var li = document.createElement('li');
      var newLink = document.createElement('a');
      newLink.textContent = url;
      newLink.href = url;
      li.appendChild(newLink);
      ul.appendChild(li);
    })
  }
  document.getElementById('my-links').innerHTML = ul.innerHTML;
}
})