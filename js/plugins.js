
(function () {
  "use strict";

  if (!window.LoopMeApp) {
    window.LoopMeApp = {};
  }
})();


// AJAX plugin
//emulation just for mocking purposes as it could be easily replaced by other transport layer
(function () {
  "use strict";

  var data = {
    "ads": [
      {
        "data": {
          "ad_shares": {
            "enabled": true,
            "value": 0
          },
          "image_url": "http://i.loopme.me/9538acaf65f41f7f.png",
          "share_url": "http://loopme.me/go2/5f19999d90bced",
          "ad_hides": {
            "enabled": true,
            "value": 2
          },
          "type": "IMAGE",
          "click_url": "http://loopme.me/go2/5f19999d90bced",
          "ad_likes": {
            "enabled": true,
            "value": 1
          },
          "download_btn_color": "#00AF33",
          "id": "5f19999d90bced"
        },
        "beacons": {
          "ad_show": "http://loopme.me/api/v2/events?et=AD_SHOW&id=5f19999d90bced",
          "ad_like": "http://loopme.me/api/v2/events?et=AD_LIKE&id=5f19999d90bced",
          "ad_hide": "http://loopme.me/api/v2/events?et=AD_HIDE&id=5f19999d90bced",
          "ad_share": "http://loopme.me/api/v2/events?et=AD_SHARE&id=5f19999d90bced",
          "video_start": "http://loopme.me/api/v2/events?et=VIDEO_STARTS&id=5f19999d90bced",
          "video_time": "http://loopme.me/api/v2/events?et=VIDEO_TIMES&id=5f19999d90bced",
          "video_complete": "http://loopme.me/api/v2/events?et=VIDEO_COMPLETES&id=5f19999d90bced"
        }
      }
    ],
    "version": "v0.2.126",
    "session": {
      "si": "f3f794138c",
      "beacons": {
        "inbox_open": "http://loopme.me/api/v2/events?et=INBOX_OPEN&rid=b00d258471e7819ea4a657&id=5f19999d90bced",
        "ad_close": "http://loopme.me/api/v2/events?et=AD_CLOSE&rid=b00d258471e7819ea4a657"
      }
    }
  };

  var ajax = (function () {

    var toggleSpinner = function() {
      var e = document.getElementById("mainLoading"), spinnerVisibility;
      if (e) {
        spinnerVisibility = e.style["display"] == "block";
        e.style["display"] = (spinnerVisibility ? "none" : "block");
      }
    };

    var fakeSend = function (callback) {
      setTimeout(function() {
        callback(data);
        toggleSpinner();
      }, 2000);
    };

    return {
      get: function (callback) {
        toggleSpinner();
        fakeSend(callback);
      },
      notifyServer: function(url) {
        var head = document.getElementsByTagName("head")[0];
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = url;
        head.appendChild(js);
      }
    };
  })();

  LoopMeApp.AJAX = ajax;


})();

// View plugin
(function() {
  "use strict";

  var view = (function() {
    return {
      render: function(element, data, imgLoadedCallback) {

        //check if the element is DOM node
        if (element && element.nodeType && element.nodeType === 1) {

          var img = document.createElement("img"),
            imgWrap = document.createElement("a");

          imgWrap.className = "adv__link";
          imgWrap.setAttribute("href", data["ads"][0]["data"]["click_url"]);

          img.onload = imgLoadedCallback;
          img.setAttribute("alt", "loop me adv");
          img.setAttribute("src", data["ads"][0]["data"]["image_url"]);
          img.className = "adv__image";

          imgWrap.appendChild(img);
          element.appendChild(imgWrap);
        }
      },

      addEvent: function(elem, event, fn) {
        if (elem.addEventListener) {
          elem.addEventListener(event, fn, false);
        } else {
          elem.attachEvent("on" + event, function() {
            // set the this pointer same as addEventListener when fn is called
            return(fn.call(elem, window.event));
          });
        }
      }
    };
  })();

  LoopMeApp.View = view;

})();

// Cookie plugin
(function() {
  "use strict";


  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

 
  var cookiesUtils = (function() {
    return {
      get: function(name) {
        readCookie(name);
      },

      set: function(name, value, days) {
        createCookie(name, value, days);
      },

      remove: function(name) {
        createCookie(name, "", -1);
      }

    };

  })();

  LoopMeApp.Cookies = cookiesUtils;
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
