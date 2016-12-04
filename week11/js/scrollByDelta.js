$(function () {
  var $gnb = $('#gnb');
  var $container = $('#container');
  var $body = $('body');
  var sectionArray = [];
  var isMaxDelta = false;
  var currentSectionIdx = 0;
  var maxDelta = 110; // 150
  var isMove = false;

  //body 높이 보정
  $body.height(window.innerHeight);

  //Ajax load Test
  getAjaxData('json/appData.json');

  //Ajax test code.

  function getAjaxData(url) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      async: true,
      url: url,
      success: successCallback,
      error: errorCallback
    });
  }

  //ajax 성공 콜백
  function successCallback(res) {
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
      //Section에 컨텐츠 데이터 로드.
      $section.load(val.content);

      $container.append($section);
      sectionArray.push($section);

      $(window).on('wheel', wheelEventHandler);
    });
  }

  //ajax error 콜백
  function errorCallback() {
    console.log('error');
  }

  //윈도우의 휠 이벤트 발생시 처리.
  function wheelEventHandler(evt) {

    var delta = evt.originalEvent.wheelDelta;
    if (delta < maxDelta * -1) {
      playSection('+');
    } else if (delta > maxDelta) {
      playSection('-');
    }
    return false;
    // if (isMaxDelta) {
    //   $container.stop().animate({top: window.innerHeight * currentSectionIdx * -1}, {complete: function () {
    //     // $(window).one('wheel', wheelEventHandler);
    //   }});
    //   isMaxDelta = false;
    // }
  }

  function playSection(direction) {

    if (isMove) {
      return;
    }

    isMove = true;

    if (direction === '+') {
      if (currentSectionIdx < sectionArray.length - 1) {
        currentSectionIdx++;
      } else {
        currentSectionIdx = sectionArray.length - 1;
      }
    } else {
      if (currentSectionIdx > 0) {
        currentSectionIdx--;
      } else {
        currentSectionIdx = 0;
      }
    }
    console.log(currentSectionIdx);
    $container.stop().animate({top: window.innerHeight * currentSectionIdx * -1}, {complete: function () {
      isMove = false;
    }});
  }
});
