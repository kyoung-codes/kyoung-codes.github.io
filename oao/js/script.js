// JavaScript Document


// gnb 슬라이드
$(function () {
    $('#gnb').on('mouseenter', function () {
        $('#header').addClass('open');
    })

    $('#gnb').on('mouseleave', function () {
        $('#header').removeClass('open');
        if($('#header').hasClass('open')) {
            return false;
        } else {
            $('#header').removeClass('open');
        }
    })
})


// 이미지 슬라이드

/*
$(function () {
    // 1. 일정 시간마다
    // 2. <ul> 요소를 #img-wrap 요소의 너비만큼 왼쪽으로 이동
    // 3. <ul> 요소의 움직임이 끝나면
    // 4. <ul> 요소에 설정했던 스타일 속성들을 제거하고
    // 5. <ul> 요소의 첫 번째 자식을 <ul> 요소의 마지막으로 옮긴다.

    const INTERVAL = 3500;
    const DURATION = 500;
    const $imageList = $('#img-wrap > ul');

    window.setInterval(function () {
        $imageList.css({ transitionDuration: DURATION + 'ms', marginLeft: '-100%'});
        window.setTimeout(function () {
            $imageList.removeAttr('style').children(':first').appendTo($imageList);
        }, DURATION);
    }, INTERVAL);
});
*/

$(function () {
  const INTERVAL = 6000;
  const DURATION = 700;     // 슬라이드 애니메이션 지속 시간(0.5초)
  const $imageList = $('#img-wrap > ul');
  const $slides = $imageList.children('li');
  const $indicators = $('#indicator > ol > li');
  let now = 0;      // 현재 슬라이드 인덱스(0부터 시작)
  let timer;        

  // 슬라이드 이동 함수
  function goNext() {
    $imageList.css({
      transition: `margin-left ${DURATION}ms`,
      marginLeft: '-100%'
    });

    now = (now + 1) % $slides.length;
    updateIndicator(now);           // 인디케이터 .on 클래스를 현재 인덱스로 업데이트

    // 슬라이드 이동 애니메이션이 끝난 뒤
    setTimeout(() => {
      $imageList.css({ transition: 'none', marginLeft: '0' });
      $imageList.children(':first').appendTo($imageList);
    }, DURATION);
  }

  // 인디케이터 갱신 함수
  function updateIndicator(index) {
    // index 위치의 인디케이터에 on 클래스 추가
    $indicators.removeClass('on').eq(index).addClass('on');
  }

  // 인디케이터 클릭 → 해당 인덱스로 점프
  $indicators.on('click', function () {
    const clickedIndex = $(this).index();

    if (clickedIndex === now) return; // 현재와 같으면 무시

    // 현재 인덱스('now')에서 몇 칸 차이나는 지 계산
    // 음수 방지를 위해 음수 방지 위해 `$slides.length` 더하고, 나머지 연산 사용
    const diff = (clickedIndex - now + $slides.length) % $slides.length;

    // 슬라이드 여러 장을 앞으로 미리 보내기
    for (let i = 0; i < diff; i++) {
      $imageList.append($imageList.children().first());
    }

    now = clickedIndex;
    updateIndicator(now);
  });

  // 자동 슬라이드 시작
  function startTimer() {
    timer = setInterval(goNext, INTERVAL);
  }

  startTimer();
});



// fade-up
/*
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {thresholde: 0.3});
});
*/

$(window).on('scroll', function () {
  const $fadeup = $('.fade-up');

  $fadeup.each(function () {
    const top = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();

    if (scroll + windowHeight > top + 100) {
      $(this).addClass('visible');
    }
  });

});