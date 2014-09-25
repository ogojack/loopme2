//global entry point
var LoopMeApp = (window.LoopMeApp = window.LoopMeApp || {});


(function () {
  var appData,
    likeBtn = document.getElementById("likeBtn"),
    dislikeBtn = document.getElementById("dislikeBtn"),
    shareBtn = document.getElementById("shareBtn"),
    actions = [];

  LoopMeApp.AJAX.get(function(data) {
    appData = data;

    //args as options{e:{},d:{},cb:{}}
    LoopMeApp.View.render(document.getElementById("adv"), appData, function() {
      LoopMeApp.AJAX.notifyServer(appData["session"]["beacons"]["inbox_open"]);
    });

    LoopMeApp.View.addEvent(likeBtn, "click", function () {
      
      actions.push("ad_like");
      LoopMeApp.Cookies.set("actions", JSON.stringify(actions));
      LoopMeApp.AJAX.notifyServer(appData["ads"][0]["beacons"]["ad_like"]);
    });


    LoopMeApp.View.addEvent(dislikeBtn, "click", function () {
      
      actions.push("ad_hide");
      LoopMeApp.Cookies.set("actions", JSON.stringify(actions));
      LoopMeApp.AJAX.notifyServer(appData["ads"][0]["beacons"]["ad_hide"]);
    });


    LoopMeApp.View.addEvent(shareBtn, "click", function () {

      actions.push("ad_share");
      LoopMeApp.Cookies.set("actions", JSON.stringify(actions));
      LoopMeApp.AJAX.notifyServer(appData["ads"][0]["beacons"]["ad_share"]);
    });

    LoopMeApp.View.addEvent(window, "deviceorientation", function () {
      //TODO track cookies
      console.log(arguments);
    });
    
  });

})();
