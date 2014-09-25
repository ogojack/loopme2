//global entry point
var LoopMeApp = (window.LoopMeApp = window.LoopMeApp || {});


(function () {
  var appData,
    likeBtn = document.getElementById("likeBtn"),
    dislikeBtn = document.getElementById("dislikeBtn"),
    shareBtn = document.getElementById("shareBtn"),
    closeBtn = document.getElementById("closeBtn"),
    actions = [];

  function track(action) {
    actions.push(action);
    LoopMeApp.Cookies.set("actions", JSON.stringify(actions));
  }

  LoopMeApp.AJAX.get(function(data) {
    appData = data;

    //args as options{e:{},d:{},cb:{}}
    LoopMeApp.View.render(document.getElementById("adv"), appData, function() {
      LoopMeApp.AJAX.notifyServer(appData["session"]["beacons"]["inbox_open"]);
    });

    LoopMeApp.View.addEvent(likeBtn, "click", function () {
      
      track("ad_like");
      LoopMeApp.AJAX.notifyServer(appData["ads"][0]["beacons"]["ad_like"]);
    });


    LoopMeApp.View.addEvent(dislikeBtn, "click", function () {
      
      track("ad_hide");
      LoopMeApp.AJAX.notifyServer(appData["ads"][0]["beacons"]["ad_hide"]);
    });


    LoopMeApp.View.addEvent(shareBtn, "click", function () {

      track("ad_share");
      LoopMeApp.AJAX.notifyServer(appData["ads"][0]["beacons"]["ad_share"]);
    });

    LoopMeApp.View.addEvent(closeBtn, "click", function () {

      track("ad_close");
      LoopMeApp.AJAX.notifyServer(appData["session"]["beacons"]["ad_close"]);
      document.getElementById("adv").innerHTML = "";
    });

    LoopMeApp.View.addEvent(window, "deviceorientation", function () {
      
      checkOrientation();

    });

    function checkOrientation() {
      var currMode = "";

      switch (window.orientation) {

        case 0:
          currMode = "portrait";
          break;

        case -90:
          currMode = "landscape";
          break;

        case 90:
          currMode = "landscape";
          break;

        case 180:
          currMode = "portrait";
          break;

        default:
          currMode = "portrait";
          break;
      }
      //currMode = "landscape";
      document.getElementsByTagName("body")[0].setAttribute("class", currMode);
    }
  });

})();
