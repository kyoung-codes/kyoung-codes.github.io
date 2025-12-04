// JavaScript Document


// header solid
$(function(){
    const $win = $(window);
    const $header = $('#header');
    const $banner = $('#banner');

    function syncHeader(){
        const headerH = $header.outerHeight();
        const bannerH = $banner.outerHeight();
        const y = $win.scrollTop();
        // header가 banner를 완전히 벗어나기 시작하는 지점
        if (y >= bannerH - headerH) {
          $header.addClass('is-solid');
        } else {
          $header.removeClass('is-solid');
        }
    }

    // 초기/스크롤/리사이즈에 반영
    $win.on('scroll resize', syncHeader);
    syncHeader();

    $('body').addClass('has-fixed-header'); // 선택
});


// GNB(nav) megamenu
$(function () {
  const $categorybtn = $('#category');
  const $megamenu = $('#megamenu');
  $('#category').length

  $categorybtn.on('click', function (e) {
    e.stopPropagation();

    $categorybtn.toggleClass('on');
    $megamenu.toggleClass('on');

    const isOpen = $megamenu.hasClass('on');
    $categorybtn.attr('aria-expanded', isOpen)
  });

  $megamenu.on('click', function (e) {
    e.stopPropagation();
  });

  $(document).on('click', function (e) {
    if ($megamenu.hasClass('on')) {
      $megamenu.removeClass('on');
      $categorybtn.removeClass('on').attr('aria-expanded', false);
    }
  });
});



// sidebar
$(function () {
    const $overlay = $('#overlay');
    const $sidebar = $('#sidebar');

    // 열기
    $('#open').on('click', function () {
        $overlay.addClass('on');
        $sidebar.css('left',0);
    });

    // 닫기
    $('#close').on('click', function () {
        $overlay.removeClass('on');
        $sidebar.removeAttr('style');
    });

    // 오버레이 바깥 영역 클릭 시 닫기
    $overlay.on('click', function (e) {
        // 클릭한 요소가 sidebar 내부가 아니라면 닫기
        if (!$(e.target).closest('#sidebar').length){
            $overlay.removeClass('on');
            $sidebar.removeAttr('style');
        }
    });
});


// search form text-align left
$(function () {
    const $q = $('#q');

    // 포커스 되는 즉시 왼쪽 정렬
    $q.on('focus', function () {
        $(this).addClass('align-left');
    });

    $q.on('input blur', function () {
        const hasValue = $.trim($(this).val()).length > 0;
        $(this).toggleClass('align-left', hasValue || document.activeElement === this);
    });
})



// accordian
$(function () {
    const $accordianSections = $('#accordian > section');

    $accordianSections.eq(0).addClass('on').children('ul').show();

    $accordianSections.children('h3').on('click', function () {
        if ($(this).parent().is('.on')) return;

        $accordianSections.filter('.on').removeClass('on').children('ul').slideUp();

        $(this).next().slideDown().parent().addClass('on');
    });
});


// category
$(function () {
  const $category = $('#category');

  $category.on('click', function () {
    if($(this).is('.on')) return;

    $category.filter('.on').removeClass('on');

    $(this).next().addClass('on');
  });
});



// banner 
$(function () {
  const $viewport  = $('#banner');         
  const $track     = $('#banner > ul.mobile');   
  const $dots      = $('#banner .indicator__dots button'); 
  const COUNT      = $track.children('li').length;

  const INTERVAL   = 5000;
  let current = 0;
  let timer   = null;

  function updateDots(){
    $dots.attr('aria-current', null)
         .eq(current).attr('aria-current', 'true');
  }

  function goTo(index){
    current = (index + COUNT) % COUNT;
    $track.css('margin-left', (-100 * current) + '%');
    updateDots();
  }

  function start(){
    if (timer) return;
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }
  function stop(){
    clearInterval(timer);
    timer = null;
  }

  // 인디케이터 클릭 → 해당 인덱스로 이동
  $dots.on('click', function(){
    const idx = parseInt($(this).data('index'), 10) || 0;
    goTo(idx);
    stop(); start(); // 오토플레이 재시작(선택)
  });

  // 초기 상태
  goTo(0);
  start();
});

$(function () {
  const $viewport  = $('#banner');         
  const $track     = $('#banner > ul.web');   
  const $dots      = $('#banner .indicator__dots button'); 
  const COUNT      = $track.children('li').length;

  const INTERVAL   = 5000;
  let current = 0;
  let timer   = null;

  function updateDots(){
    $dots.attr('aria-current', null)
         .eq(current).attr('aria-current', 'true');
  }

  function goTo(index){
    current = (index + COUNT) % COUNT;
    $track.css('margin-left', (-100 * current) + '%');
    updateDots();
  }

  function start(){
    if (timer) return;
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }
  function stop(){
    clearInterval(timer);
    timer = null;
  }

  // 인디케이터 클릭 → 해당 인덱스로 이동
  $dots.on('click', function(){
    const idx = parseInt($(this).data('index'), 10) || 0;
    goTo(idx);
    stop(); start(); // 오토플레이 재시작(선택)
  });

  // 초기 상태
  goTo(0);
  start();
});



// new 영역
/*
$(function () {
    const $viewport = $('#newCarousel');
    const $track = $viewport.children('ul');
    const $items = $track.children('li');
    const $dots = $('#new .indicator__dots button');

    const PER_PAGE = 2;
    const pageCount = Math.ceil($items.length / PER_PAGE); // 총 페이지 수
    let current = 0;
    let autoplayTimer = null;
    const AUTOPLAY_MS = 4000;   

    // 페이지 이동
    function goTo(page, animate=true){
      current = Math.max(0, Math.min(page, pageCount - 1));
      const vw = $viewport.innerWidth();
      if (!animate) $track.css('transition', 'none');
      $track.css('transform', `translateX(${-current * vw}px)`);
      if (!animate) {
        // 강제 리플로우 후 트랜지션 복구
        $track[0].offsetHeight; 
        $track.css('transition', '');
      }
      // 인디케이터 갱신
      $dots.attr('aria-current', null).eq(current).attr('aria-current', 'true');
    }   

    // 인디케이터 클릭
    $dots.on('click', function(){
      const page = parseInt($(this).data('index'), 10) || 0;
      goTo(page);
      restartAutoplay();
    }); 

    // 반응형: 리사이즈/폰트/이미지 로드 후에도 위치 보정
    function sync(){ goTo(current, false); }
    $(window).on('resize', sync);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
    $(window).on('load', sync); 

    // ── 스와이프(터치/마우스 드래그) ─────────────────────────
    let isPointerDown = false;
    let startX = 0;
    let deltaX = 0; 

    $viewport.on('pointerdown', function(e){
      isPointerDown = true;
      startX = e.clientX;
      deltaX = 0;
      $viewport[0].setPointerCapture(e.pointerId);
      // 드래그 중에는 트랜지션 비활성화
      $track.css('transition', 'none');
      stopAutoplay();
    }); 

    $viewport.on('pointermove', function(e){
      if (!isPointerDown) return;
      deltaX = e.clientX - startX;
      const vw = $viewport.innerWidth();
      const base = -current * vw;
      $track.css('transform', `translateX(${base + deltaX}px)`);
    }); 

    function endSwipe(){
      if (!isPointerDown) return;
      isPointerDown = false;
      $track.css('transition', 'transform .4s ease');
      const vw = $viewport.innerWidth();
      const THRESHOLD = vw * 0.15; // 15% 넘기면 페이지 전환
      if (deltaX < -THRESHOLD) goTo(current + 1);
      else if (deltaX > THRESHOLD) goTo(current - 1);
      else goTo(current); // 스냅백
      restartAutoplay();
    }   

    $viewport.on('pointerup pointercancel pointerleave', endSwipe); 

    // ── 오토플레이 ─────────────────────────────────────────
    function startAutoplay(){
      if (autoplayTimer) return;
      autoplayTimer = setInterval(() => {
        goTo((current + 1) % pageCount);
      }, AUTOPLAY_MS);
    }

    function stopAutoplay(){
      clearInterval(autoplayTimer); autoplayTimer = null;
    }

    function restartAutoplay(){
      stopAutoplay(); startAutoplay();
    }   
    
    // 마우스 올리면 일시정지(모바일은 영향 없음)
    $viewport.on('mouseenter', stopAutoplay)
             .on('mouseleave', startAutoplay);  
             
    // 초기화
    goTo(0, false);
    startAutoplay();
});
*/

$(function () {
  const $viewport = $('#newCarousel');
  const $track = $viewport.children('ul');  
  const $items = $track.children('li'); 

  const $indicator = $('#new .indicator');  
  const $dotsWrap = $indicator.find('.indicator__dots'); 
  const $prev = $('#new-prev');      
  const $next = $('#new-next');
  
  let perPage = getPerPage();                             // 현재 뷰포트에서 한 번에 보일 개수
  let pageCount = Math.max(1, Math.ceil($items.length / perPage)); // 총 페이지 수
  let current = 0;

   let autoplayTimer = null;
  const AUTOPLAY_MS = 4000;

  let $dots = $(); // 나중에 생성될 인디케이터 버튼들(jQuery 객체)

  // 화면 너비에 따라 perPage 결정
   function getPerPage() {
    const w = window.innerWidth;
    if (w >= 481) return 1;
    return 2;                // 모바일
  }

  // 인디케이터 개수 다시 설정
  function buildDots() {
    $dotsWrap.empty(); // 기존 인디케이터 제거

    for (let i = 0; i < pageCount; i++) {
      const $btn = $('<button>', {
        type: 'button',
        'aria-label': (i + 1) + '페이지',
        'data-index': i
      });

      if (i === current) {
        $btn.attr('aria-current', 'true');
      }

      $('<li>').append($btn).appendTo($dotsWrap);
    }

    // 다시 찾아서 클릭 이벤트 연결
    $dots = $dotsWrap.find('button');

    $dots.off('click').on('click', function () {
      const idx = parseInt($(this).data('index'), 10) || 0;
      goTo(idx);
      restartAutoplay();
    });
  }

  // 화면 크기에 따른 perPage 페이지 수 설정
  function updatePagination() {
    const newPerPage = getPerPage();

    // perPage가 그대로면 위치만 보정
    if (newPerPage === perPage) {
      goTo(current, false);
      return;
    }

    perPage = newPerPage;
    pageCount = Math.max(1, Math.ceil($items.length / perPage));

    if (current > pageCount - 1) {
      current = pageCount - 1;
    }

    buildDots();
    goTo(current, false);
  }

  // 특정 페이지로 이동
  function goTo(page, animate = true) {
    current = Math.max(0, Math.min(page, pageCount - 1));

    const vw = $viewport.innerWidth(); // 한 페이지 너비(뷰포트 폭 기준)

    if (!animate) $track.css('transition', 'none');

    $track.css('transform', 'translateX(' + (-current * vw) + 'px)');

    if (!animate) {
      // 강제 리플로우 후 트랜지션 복구
      $track[0].offsetHeight;
      $track.css('transition', '');
    }

    // 인디케이터 aria-current 갱신
    if ($dots.length) {
      $dots.attr('aria-current', null)
           .eq(current).attr('aria-current', 'true');
    }
  }

  // prev, next 버튼
  if ($prev.length) {
    $prev.on('click', function () {
      goTo((current - 1 + pageCount) % pageCount);
      restartAutoplay();
    });
  }

  if ($next.length) {
    $next.on('click', function () {
      goTo((current + 1) % pageCount);
      restartAutoplay();
    });
  }

   // 스와이프(모바일 드래그)
  let isPointerDown = false;
  let startX = 0;
  let deltaX = 0;

  $viewport.on('pointerdown', function (e) {
    isPointerDown = true;
    startX = e.clientX;
    deltaX = 0;

    if ($viewport[0].setPointerCapture) {
      $viewport[0].setPointerCapture(e.pointerId);
    }

    $track.css('transition', 'none');
    stopAutoplay();
  });

  $viewport.on('pointermove', function (e) {
    if (!isPointerDown) return;
    deltaX = e.clientX - startX;

    const vw = $viewport.innerWidth();
    const base = -current * vw;

    $track.css('transform', 'translateX(' + (base + deltaX) + 'px)');
  });

  function endSwipe(e) {
    if (!isPointerDown) return;
    isPointerDown = false;

    $track.css('transition', 'transform .4s ease');

    const vw = $viewport.innerWidth();
    const THRESHOLD = vw * 0.15; // 15% 이상 드래그하면 다음/이전 페이지

    if (deltaX < -THRESHOLD) {
      goTo(current + 1);
    } else if (deltaX > THRESHOLD) {
      goTo(current - 1);
    } else {
      goTo(current); // 스냅백
    }

    restartAutoplay();
  }

  $viewport.on('pointerup pointercancel pointerleave', endSwipe);

  // 오토플레이
  function startAutoplay() {
    if (autoplayTimer) return;
    autoplayTimer = setInterval(function () {
      goTo((current + 1) % pageCount);
    }, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // 마우스 올라가면 일시정지(PC용)
  $viewport
    .on('mouseenter', stopAutoplay)
    .on('mouseleave', startAutoplay);

  // 8. 리사이즈 / 폰트 로드 때 위치 보정
  function sync() {
    updatePagination();
  }

  $(window).on('resize', sync);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(sync);
  } else {
    $(window).on('load', sync);
  }

  // 9. 초기 실행
  buildDots();
  goTo(0, false);
  startAutoplay();

})



// best 더보기
document.addEventListener("DOMContentLoaded", function () {
    const bestSection = document.getElementById("best");
    const moreBtn = document.getElementById("more");

    moreBtn.addEventListener("click", function () {
        const isExpanded = bestSection.classList.toggle("expanded");

        moreBtn.setAttribute("aria-expanded", isExpanded);

        if (isExpanded) {
            moreBtn.textContent = "접기";
        } else {
            moreBtn.textContent = "더보기";
        }
    });
});




// review 영역
/*
$(function () {
  const $viewport = $('#review > div');
  const $track    = $viewport.children('ul');
  const $items    = $track.children('li');
  const $dots     = $('#review .indicator__dots button');

  const PER_PAGE = 2;
  const pageCount = Math.ceil($items.length / PER_PAGE);
  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 4000;

  // 해당 페이지의 첫 li가 트랙 왼쪽에서 떨어진 실제 px
  function pageOffset(page) {
    const idx = Math.min(page * PER_PAGE, $items.length - 1);
    const el  = $items.get(idx);
    return el ? el.offsetLeft : 0;
  }
  // 현재 뷰포트 실제 폭(소수점 포함)
  function pageWidth() {
    return $viewport[0].getBoundingClientRect().width;
  }

  function goTo(page, animate = true) {
    current = Math.max(0, Math.min(page, pageCount - 1));
    const x = pageOffset(current);

    if (!animate) $track.css('transition', 'none');
    $track.css('transform', `translate3d(${-x}px,0,0)`);
    if (!animate) { $track[0].offsetHeight; $track.css('transition', ''); }

    // 인디케이터 갱신
    $dots.attr('aria-current', null).eq(current).attr('aria-current', 'true');
  }

  // 인디케이터 클릭
  $dots.on('click', function () {
    const page = parseInt($(this).data('index'), 10) || 0;
    goTo(page);
    restartAutoplay();
  });

  // 리사이즈/폰트 로딩 후 위치 보정
  function sync() { goTo(current, false); }
  $(window).on('resize', sync);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
  $(window).on('load', sync);

  // ── 스와이프 ──
  let isDown = false, startX = 0, deltaX = 0;

  // 수평 스와이프 인식이 잘 되도록(세로 스크롤 허용)
  $viewport.css('touch-action', 'pan-y');

  $viewport.on('pointerdown', function (e) {
    isDown = true;
    startX = e.clientX;
    deltaX = 0;
    this.setPointerCapture(e.pointerId);
    $track.css('transition', 'none');
    stopAutoplay();
  });

  $viewport.on('pointermove', function (e) {
    if (!isDown) return;
    deltaX = e.clientX - startX;
    const base = -pageOffset(current);
    $track.css('transform', `translate3d(${base + deltaX}px,0,0)`);
  });

  function endSwipe() {
    if (!isDown) return;
    isDown = false;
    $track.css('transition', 'transform .4s ease');

    const THRESHOLD = pageWidth() * 0.15; // 15% 넘어가면 전환
    if (deltaX < -THRESHOLD)      goTo(current + 1);
    else if (deltaX > THRESHOLD)  goTo(current - 1);
    else                          goTo(current); // 스냅백

    restartAutoplay();
  }
  $viewport.on('pointerup pointercancel pointerleave', endSwipe);

  // ── 오토플레이 ──
  function startAutoplay() {
    if (autoplayTimer) return;
    autoplayTimer = setInterval(() => {
      goTo((current + 1) % pageCount);
    }, AUTOPLAY_MS);
  }
  function stopAutoplay()   { clearInterval(autoplayTimer); autoplayTimer = null; }
  function restartAutoplay(){ stopAutoplay(); startAutoplay(); }

  // 초기화
  goTo(0, false);
  startAutoplay();
});


// backToTop
$(document).ready(function() {
    const $btn = $('#backToTop');

    // 스크롤 이벤트
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 200) {   // 200px 이상 스크롤하면 등장
            $btn.addClass('show');
        } else {
            $btn.removeClass('show');
        }
    });

    // 클릭하면 부드럽게 상단으로 이동
    $btn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 400);  // 400ms = 0.4초
    });
});
*/
