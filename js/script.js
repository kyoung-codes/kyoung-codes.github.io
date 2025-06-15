// JavaScript Document


// tab menu
$(function () {
  const $tab_menu = $('#tab_menu > li');
  const $tabcont = $('#tab_content > .tabcont');

  $tab_menu.on('click', function () {
    if ($(this).hasClass('on')) return;

    const index = $(this).index();

    // 탭 버튼 on 클래스 변경
    $tab_menu.removeClass('on');
    $(this).addClass('on');

    // 기존 콘텐츠 모두 숨김 (즉시)
    $tabcont.each(function () {
      $(this).css({
          opacity: 0,
          transform: 'translateY(40px)'
        }).hide(); // display: none
    });

    // 새 콘텐츠 보여주고 → 애니메이션
    const $target = $tabcont.eq(index);
    $target.show().css({
        display: 'flex',
        justifyContent: 'space-between',
        opacity: 0,
        transform: 'translateY(40px)'
      }).delay(10)
      .queue(function (next) {
        $(this).css({
          opacity: 1,
          transform: 'translateY(0)'
        });
        next();
      });
  });
});




// design slide
$(function() {
  let currentSlide = 0; // 0: 첫 번째, 1: 두 번째

  const $slides = ['#first_slide', '#second_slide'];
  const $texts = $('.slide_text');
  const $prev = $('#prev');
  const $next = $('#next');

  function updateSlide(index) {
    $('#slide_container > div').removeClass('on');
    $($slides[index]).addClass('on');

    $texts.removeClass('on').eq(index).addClass('on');

    // 버튼 상태
    if (index === 0) {
      $prev.css({visibility: 'hidden', opacity: '0'});
      $next.css({visibility: 'visible', opacity: '1'});
    } else if (index === $slides.length - 1) {
      $prev.css({visibility: 'visible', opacity: '1'});
      $next.css({visibility: 'hidden', opacity: '0'});
    } else {
      $prev.css({visibility: 'visible', opacity: '1'});
      $next.css({visibility: 'visible', opacity: '1'});            
    }

    currentSlide = index;
  }

  // 버튼 클릭 이벤트
  $prev.on('click', function (e) {
    e.preventDefault();
    if (currentSlide > 0) updateSlide(currentSlide - 1);
    
  });

  $next.on('click', function (e) {
    e.preventDefault();
    if (currentSlide < $slides.length - 1) updateSlide(currentSlide + 1);
  });

  // 초기 상태
  updateSlide(0);
})


// mobile_design 초기 상태
window.addEventListener('load', () => {
  const grid = document.querySelector('#grid');
  const wrapper = document.querySelector('#mobile_design');

  const halfHeight = grid.scrollHeight / 2;
  wrapper.style.maxHeight = `${halfHeight}px`; // 처음엔 절반만 보이도록
});

// 더보기 버튼
document.getElementById('morebtn').addEventListener('click', function () {
  const wrapper = document.querySelector('#mobile_design');
  const grid = document.querySelector('#grid');

  const isExpanded = wrapper.classList.toggle('expanded');

  if (isExpanded) {
    wrapper.style.maxHeight = `${grid.scrollHeight}px`;
    this.textContent = '접기';
  } else {
    wrapper.style.maxHeight = `${grid.scrollHeight / 2}px`;
    this.textContent = '더보기';
  }
});



/* fade in */
function onScroll() {
  // fade in
  $('.fade_in').each(function() {
    var element = $(this);
    var elementTop = element.offset().top;
    var elementBottom = elementTop + element.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      element.addClass('active');
    }
  });

  // gauge bar
  $('.gauge_in').each(function() {
    const section = $('#about');
    const top = section.offset().top;
    const bottom = top + section.outerHeight();
    const winTop = $(window).scrollTop();
    const winBottom = winTop + $(window).height();

    if (bottom > winTop && top < winBottom && !section.hasClass('gauged')) {
      section.find('.inline').each(function () {
        const percent = $(this).data('percent');
        $(this).css('width', percent + '%');
      });
      section.addClass('gauged');
    }
  });
}

$(document).ready(function () {
  $(window).on('scroll', onScroll);
  onScroll();                        
});