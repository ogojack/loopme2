
// AJAX plugin
(function() {
  var ajax = (function () {
    var xmlhttp;

    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    }

    var send = function (url, callback, sync) {

      xmlhttp.open("GET", url, sync);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
          }
          else if (xmlhttp.status == 400) {
            console.error('There was an error 400');
          }
          else {
            console.warn('something else other than 200 was returned');
          }
        }
      };

      xmlhttp.send();
    };
    return {
      get: function (url, data, callback, sync) {
        var query = [];
        for (var key in data) {
          query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        send(url + (url.indexOf('?')!==-1?'&':'?') + query.join('&'), callback, sync);
      }
    };

  })();

  
 
  if (!window.LoopMeApp) {
    window.LoopMeApp = {};
  }

  LoopMeApp.AJAX = ajax;

})();




// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () { };
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());
