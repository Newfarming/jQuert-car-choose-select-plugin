'use strict';

$(function() {

  connectWebViewJavascriptBridge(function(bridge) {
    var menuArr = [];
    bridge.callHandler('setOptionMenu', menuArr, function (response) {

    });

    // 绑定返回事件
    bridge.registerHandler('returnBackHandler', function(data, responseCallback) {
      var backParam = {};
      backParam.isFirstPage = 'true';
      responseCallback(backParam);
    });
  });

});
