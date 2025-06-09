// JavaScript Document


// menu
$(function() {
  $('#main_menu').on('mouseenter', function() {
    $('#header').addClass('open');
  })
  
  $('#main_menu').on('mouseleave', function(){
      $('#header').removeClass('open');
      if($('#header').hasClass('open')) {
          return false;
      } else {
          $("#header").removeClass('open');
      }
  });
})




// exhibition 이미지 무한 슬라이드
document.addEventListener("DOMContentLoaded", function () {
  const slideList = document.querySelector("#slide_list");
  const slides = document.querySelectorAll("#slide_list li");
  const slideCount = slides.length;
  const slideWidth = 300;
  const slideMargin = 200;
  const speed = 2; // px 단위

  // 복제: 뒤에만 붙이면 충분 (우린 한 방향으로만 움직이니까)
  for (let i = 0; i < slideCount; i++) {
    let clone = slides[i].cloneNode(true);
    slideList.appendChild(clone);
  }

  // 전체 너비 계산
  const newCount = slideList.querySelectorAll("li").length;
  slideList.style.width = `${(slideWidth + slideMargin) * newCount}px`;

  let position = 0;
  let interval;

  function startSlide() {
    interval = setInterval(() => {
      position -= speed;
      if (Math.abs(position) >= (slideWidth + slideMargin) * slideCount) {
        slideList.style.transition = "none";
        position = 0;
        slideList.style.transform = `translateX(${position}px)`;

        // 트랜지션 다시 적용
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            slideList.style.transition = "transform 0.3s linear";
          });
        });
      } else {
        slideList.style.transform = `translateX(${position}px)`;
      }
    }, 40);
  }
  
/*
  slideList.addEventListener("mouseenter", () => clearInterval(interval));
  slideList.addEventListener("mouseleave", () => startSlide());
*/

  slideList.style.transition = "transform 0.3s linear";
  startSlide();
});



// fade in
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    } else {
     entry.target.classList.remove('in');
    }
  });
}, {threshold: 0.4});

  const targetElemets = document.querySelectorAll('.fade');
  targetElemets.forEach((element) => { observer.observe(element);});

});






// dropdown
$(function () {
    const $dropdown = $('#dropdown > button')
    const $menu = $('#dropdown_list');

    $dropdown.on('click', function() {
      if ($menu.hasClass('on')) {
          $menu.removeClass('on');
      } else {
        $menu.addClass('on');
      }
    })

})