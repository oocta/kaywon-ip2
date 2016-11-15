//Ajax test code.
function getAjaxData(url) {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    async: true,
    url: url,
    success: successHandler,
    error: errorHandler
  });
}

function successHandler(res) {
  console.log(res);
}

function errorHandler(err) {
  console.log(err);
  throw new Error(err.responseText);
}

$(function () {
  
  var $gnb = $('#gnb');
  var $container = $('#container');
  
  //Ajax load Test
  getAjaxData('json/appData.jsons');
  
});