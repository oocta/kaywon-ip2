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
      var $section = $('<section/>', {'class': val.class, style: 'color:' + 'white', 'z-index' : zIndex});
      //style:에서 처음 속성은 '속성 :' + '속성값' , '두번째 속성' : '속성 값' 으로 작성 해야 된다? why?
      var $h1 = $('<h1/>', {text: 'Section ' + (idx + 1)});
      //( idx + 1 )에서 ( )를 지우면 앞에 idx + 1( ex : 01, 11, 21, 31)이 된다. 하지만 ()를 쓰면 1, 2, 3, 4 로 두 값을 더한 한 자리 숫자값만 나온다. why?
      $section.append($h1);

      $container.append($section);
      sectionArray.push($section);
    });

    //body height 확장

    $body.height(window.innerHeight * menuArray.length);

    var maxDelta = 0;
    var isMax = true;
    //isMax는 값의 변화가 없는데 왜 변수 선언을 한 것일까?? 그리고 왜 Boolean값으로 넣은것일까? -> 0을 집어 넣어도 결과는 같다. -> if부분에 넣을것이 없어서 넣은건가?

    $(window).on('wheel', function wheelHandler(evt) {
      isScroll = true;
      var delta = evt.originalEvent.wheelDelta;
      var percent = parseInt($(window).scrollTop() / ($body.height() - window.innerHeight) * 100, 10);
      var sectionIndex = Math.min(parseInt(percent / 25), 3);
      if (delta > 0) { //wheel을 올릴때
          if (maxDelta > delta) {
              isMax = true;
          } else { // maxDelta <= delta
              maxDelta = delta;
              return false;
          }
      } else { //wheel을 내릴때
          if (maxDelta < delta) {
              isMax = true;
          } else { //maxDelta >= delta;
              maxDelta = delta;
              return false;
          }
      }
      $(window).off('wheel');
      // $(window).off('wheel');를 사용하여 부여한 wheel을 제거하는 부분인데? 왜 weel을 제거 해야하는가?? ( 후에 함수 실행 후 다시 wheel을 부여한다. )
      playSection(sectionIndex, function () {
        $(window).on('wheel', wheelHandler);
      });
    //   console.log(maxDelta, delta, sectionIndex);
    });
  }

  function errorHandler(err) {
    console.log(err);
  }

  function playSection(index, completeCallback) {
    $.map(sectionArray, function ($section, idx) {
      var topVal = '0';
      console.log("idx", idx, "index", index);
      if (idx < index) {
        topVal = '-100%';
        //왜 -100%로 값을 준것일까?? %로 지정해 놓으니 아래의 animate가 실행되지 않아 top 값이 변한것처럼 보인다.( 하지만 top 값은 변해있다. 그리나 top '-100%'로의 위치이동은 없다. )
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
