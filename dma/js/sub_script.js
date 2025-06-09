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


// search_filter
$(document).ready(function () {
  const $check = $('.low > div > input[type="checkbox"]');
  const $label = $('.low > div > label');
  const $group = $check.add($label)

  $group.on('click', function () {
    if ($check.is(":checked")) {
      $label.prop("checked", false);
      $check.prop("checked", false);
    } else {
      $label.prop("checked",true);
      $check.prop("checked",true);
    }
  })
})

/*
    $(document).ready(function () {
         //체크박스 하나
      $("input:checkbox").on('click', function () {
        var $box = $(this);
        if ($box.is(":checked")) {
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
       });

       //이동
        $("#page_move").on('click', function () {
          var exhiTp_check = document.querySelectorAll('input[name="exhiTp"]:checked').length;
          if(exhiTp_check == 0) {
            alert('전시분류를 체크해주세요')
            return false;
           }
          var exhiCp_check = document.querySelectorAll('input[name="exhiCd"]:checked').length;
          if(exhiCp_check == 0) {
            alert('전시장소를 체크해주세요')
            return false;
           }

            var page = [];
            page[''] = 'artmuse0211000000';
            page['N'] = 'artmuse0209000000';
                    page['F'] = 'artmuse0210000000';
                    page['P'] = 'artmuse0211000000';
                    lang = 'KOR';


            window.location = '/pj/pjExhibit.php?action=list&pageID=' + page[$("input:checkbox[name='exhiTp']:checked").val()] + '&exhiTp=' + $("input:checkbox[name='exhiTp']:checked").val() + '&exhiCd=' + $("input:checkbox[name='exhiCd']:checked").val() + '&lang=' + lang;
        });

    });

*/

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