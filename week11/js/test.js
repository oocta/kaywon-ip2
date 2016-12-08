//css version
// $(function () {
//   
//   var $gnb = $('#gnb');
//   var $container = $('#container');
//   
//   //Ajax load Test
//   getAjaxData('json/appData.json');
//   
//   //Ajax test code.
// 
//   function getAjaxData(url) {
//     $.ajax({
//       type: 'GET',
//       dataType: 'json',
//       async: true,
//       url: url,
//       success: successHandler,
//       error: errorHandler
//     });
//   }
// 
//   function successHandler(res) {
//     
//     var menuArray = res.menus;
//     var sectionArray = [];
//     
//     $.map(menuArray, function (val, idx) {
//       console.log(arguments)
//       
//       //GNB 버튼 추가
//       var $button = $('<button/>', {text: val.name});
//       $button.on('click', function () {
//         window.scrollTo(0, window.inner);
//       });
//       $gnb.append($button);
//       
//       //Section 추가
//       var zIndex = parseInt((menuArray.length - idx) * 1000);
//       var $section = $('<section/>', {'class': val.class, style: 'z-index: ' + zIndex});
//       var $h1 = $('<h1/>', {text: 'Section ' + (idx + 1)});
//       $section.append($h1);
//       
//       $container.append($section);
//       sectionArray.push($section);
//     });
//     
//     //body height 확장
//     var $body = $('body');
//     $body.height(window.innerHeight * menuArray.length);
//     
//     $(window).on('scroll', function () {
//       
//       var percent = parseInt($(window).scrollTop() / ($body.height() - window.innerHeight) * 100, 10);
//       var sectionIndex = Math.min(parseInt(percent / 25), 3);
//       
//       $.map(sectionArray, function ($val, idx) {
//         if (idx + 1 > sectionIndex) {
//           $val.removeClass('upper');
//         } else {
//           if (!$val.hasClass('upper')) {
//             $val.addClass('upper');
//           };
//         }
//       });
//       
//     }).trigger('scroll');
//   }
// 
//   function errorHandler(err) {
//     console.log(err);
//   }
//   
// });

// animate version
$(function () {
  
  var $gnb = $('#gnb');
  var $container = $('#container');
  var $body = $('body');
  var sectionArray = [];
  
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
    
    $.map(menuArray, function (val, idx) {
      
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
    
    $body.height(window.innerHeight * menuArray.length);
    
    var maxDelta = 0;
    var isMax = true;
    
    $(window).on('wheel', function wheelHandler(evt) {
      isScroll = true;
      var delta = evt.originalEvent.wheelDelta;
      var percent = parseInt($(window).scrollTop() / ($body.height() - window.innerHeight) * 100, 10);
      var sectionIndex = Math.min(parseInt(percent / 25), 3);
      if (delta > 0) {
        if (maxDelta > delta) {
          isMax = true;
        } else {
          maxDelta = delta;
          return false;
        }
      } else {
        if (maxDelta < delta) {
          isMax = true;
        } else {
          maxDelta = delta;
          return false;
        }
      }
      
      $(window).off('wheel');
      playSection(sectionIndex, function () {
        $(window).on('wheel', wheelHandler);
      });
      
      console.log(maxDelta, delta, sectionIndex);
    });
  }

  function errorHandler(err) {
    console.log(err);
  }
  
  function playSection(index, completeCallback) {
    console.log('playSection');
    $.map(sectionArray, function ($section, idx) {
      var topVal = '0';
      if (idx < index) {
        topVal = '-100%';
      } else {
        topVal = '0';
      }
      $section.stop().animate({top: topVal}, {complete: function () {
        if (idx === index) {
          completeCallback();
        }
      }});
    });
  }
  
});