'use strict';

var timActive = true;
var timAppActive;
var urlHostname = getDomainPath()[1];
hearts = 10
chrome.storage.local.get(['NumberIcon'], function(result) {
  if(result.NumberIcon)  {
      hearts = result.NumberIcon;
    }
});

chrome.storage.local.get(['timActive'], function(result) {
   if(result.hasOwnProperty('timActive'))  {
      timActive = result.timActive;
    }
});

var domainActive = {};
chrome.storage.local.get(['timWebActive'], function(result) {
    if(result.hasOwnProperty('timWebActive'))  {
      domainActive = result.timWebActive;
    }
    if (domainActive.hasOwnProperty('' + urlHostname)) {
      timAppActive =  domainActive['' + urlHostname];
    } else {
      timAppActive =  timActive;
    }
    if (timAppActive) {
  		addRVLoadEvent(mwah);
  	}
});

function getDomainPath() {
    var url = document.URL;
    var domainRegex = /^https?:\/\/([^\/]+)/;
    return domainRegex.exec(url);
}