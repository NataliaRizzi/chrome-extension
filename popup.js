var urlList=[];


document.addEventListener('DOMContentLoaded', function() {
  var defaultBtn = document.getElementById('button');
  defaultBtn.addEventListener('click', function () {
    console.log('ciao');
    chrome.runtime.sendMessage({type: 'add_url', category: 'default'});

  // var appsBtn = document.getElementById('apps');
  // appsBtn.addEventListener('click', function () {
  //   chrome.runtime.sendMessage({type: 'add_url', category: "apps"})
  // });
  
  // var codingBtn = document.getElementById('coding');
  // codingBtn.addEventListener('click', function () {
  //   chrome.runtime.sendMessage({type: 'add_url', category: "coding"})
  // });

  //var travelBTn = document.getElementById('travel');
  //travelBtn.addEventListener('click', function () {
  // chrome.runtime.sendMessage({type:'add_url', category: "travel"}) 
  //})
  

    addURL();
  })
})





chrome.runtime.sendMessage('popup_open');



function addURL (tabs) {
  chrome.tabs.query({currentWindow: true, active: true}(function (tab) {
    console.log(tab);
    var url = tabs[0].url;
    if(urlList.indexOf(url) === -1) {
      addToPopup(url);
    }    
  }))
}

function addToPopup(url)  {
  document.getElementById("my-links").innerHTML= "<h3>My Links</h3>"
  var newLine = document.createElement('li');
    var newLink = document.createElement('a');
    newLink.textContent = url;
    newLink.setAttribute('href',url);
    newLink.setAttribute('target','_blank');
    newLine.appendChild(newLink);
    document.getElementById("my-links").appendChild(newLine);
}