$(function () {
  
  var $gnb = $('#gnb');
  var $container = $('#container');
  
  //Ajax load Test
  getAjaxData('json/appData.json');
  
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
    
    var menuArray = res.menus;
    var sectionArray = [];
    
    $.map(menuArray, function (val, idx) {
      console.log(arguments)
      
      //GNB 버튼 추가
      var $button = $('<button/>', {text: val.name});
      $button.on('click', function () {
        window.scrollTo(0, window.innerHeight * idx);
      });
      $gnb.append($button);
      
      //Section 추가
      var zIndex = parseInt((menuArray.length - idx) * 1000);
      var $section = $('<section/>', {'class': val.class, style: 'z-index: ' + zIndex});
      var $h1 = $('<h1/>', {text: 'Section ' + (idx + 1)});
      $section.append($h1);
      
      $container.append($section);
      sectionArray.push($section);
    });
    
    //body height 확장
    var $body = $('body');
    $body.height(window.innerHeight * menuArray.length);
    
    var isScroll = false;
    var beforeScrollTop = 0;
    
    $(window).on('scroll', function () {
      
      isScroll = true;
      if (beforeScrollTop === $(window).scrollTop()) {
        isSCroll = false;
      } else {
        beforeScrollTop = $(window).scrollTop();
      }
      console.log(beforeScrollTop, $(window).scrollTop(), isScroll);
      
      var percent = parseInt($(window).scrollTop() / ($body.height() - window.innerHeight) * 100, 10);
      var sectionIndex = Math.min(parseInt(percent / 25), 3);
      
      // $.map(sectionArray, function ($val, idx) {
      //   var targetTop = 0;
      //   if (idx + 1 > sectionIndex) {
      //     targetTop = window.innerHeight * -1;
      //   } else {
      //     targetTop = 0;
      //   }
      //   $val.stop().animate({top: targetTop, complete: function () {
      //     $val.prop('isAnimate', false);
      //   }});
      // });
      
    });
  }

  function errorHandler(err) {
    console.log(err);
  }
  
});