'use strict';

$(function() {
  var params={
    params:{
      timetag:5
    }
  }
  $(".car-select").carselect({

    });
   $.ajax({
                url: 'http://dev.xiaomadada.com/paacitic-js/rest/api/system/brand/get',
                data: JSON.stringify(params),
                type: 'POST',
                async: false,
                contentType: 'json',
                success: function(respData, status) {
                    console.log('brand',respData);
                },
                complete: function(xhr, status) {
                    if (status === 'timeout') {
                        console.log('请求超时');
                    }
                }
            });
   params={
    params:{
      bid:5
    }
  };
      $.ajax({
                url: 'http://dev.xiaomadada.com/paacitic-js/rest/api/system/series/get',
                data: JSON.stringify(params),
                type: 'POST',
                async: false,
                contentType: 'json',
                success: function(respData, status) {
                    console.log('series',respData);
                },
                complete: function(xhr, status) {
                    if (status === 'timeout') {
                        console.log('请求超时');
                    }
                }
            })
         params={
    params:{
      sid:5
    }
  };
      $.ajax({
                url: 'http://dev.xiaomadada.com/paacitic-js/rest/api/system/model/get',
                data: JSON.stringify(params),
                type: 'POST',
                async: false,
                contentType: 'json',
                success: function(respData, status) {
                    console.log('model',respData);
                },
                complete: function(xhr, status) {
                    if (status === 'timeout') {
                        console.log('请求超时');
                    }
                }
            })



});
