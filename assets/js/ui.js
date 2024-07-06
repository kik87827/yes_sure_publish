window.addEventListener("DOMContentLoaded", () => {
  commonInit();
  setVhProperty();
});
window.addEventListener("load", () => {
});

$(function() {
})


function setVhProperty() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/**
 * device check
 */
function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf("samsung") > -1) {
    browserAdd("samsung");
  }

  if (
    navigator.platform.indexOf("Win") > -1 ||
    navigator.platform.indexOf("win") > -1
  ) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

/*
  resize
*/
function resizeAction(callback) {
  let windowWid = 0;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== windowWid) {
      if (callback) {
        callback();
      }
    }
    windowWid = window.innerWidth;
  });
}

/**
 * 레이아웃
 */
function layoutFunc() {

}

/**
 * menu rock
 */
function menuRock(target) {
  const targetDom = document.querySelectorAll(target);
  if (!!targetDom) {
    targetDom.forEach((target) => {
      if (!!target.closest(".mbmenu_nav_list > li")) {
        target.closest(".mbmenu_nav_list > li").classList.add("active");
      }
      target.classList.add("active");
    });
  }
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}


function mainSwiperBack() {
  let mainSwiper = null;
  let touchstart = "ontouchstart" in window;
  //let windowWidth = $(window).width();
  let pluginOption = {
    direction: 'vertical',
    mousewheel: {
      forceToAxis : true,
      sensitivity : 0
    },
    freeMode: false,
    slidesPerView: "auto",
    autoHeight: true,
    speed: 1000,
    initialSlide: 0
  }

  mainSwiper = new Swiper('.mv_container',pluginOption);
  
  //sceneInitCheck();

  /* $(window).on("resize",function(){
      sceneCheck();

      if(windowWidth !== $(window).width()){
        updateDevice();
      }
      windowWidth = $(window).width();
  });
  $(".mv_container").on("refresh",function(){
    if(!!mainSwiper){
      mainSwiper.update();
    }
  }); */

  function updateDevice(){
    console.log('updateDevice');
    if(!touchstart){return;}
    if(!!mainSwiper){
      mainSwiper.destroy();
      mainSwiper = new Swiper('.mv_container',pluginOption);
    }
  }


  function sceneCheck(){
    let scene_contents = $(".scene_contents");
    let check_count = 0;
    $(".front_body").removeClass("scroll_mode");
    scene_contents.each(function(){
      if($(this).outerHeight(true) >= $(window).height()){
        check_count++;
      }
    });
    if(check_count>0){
      if(!!mainSwiper){
        mainSwiper.destroy();
      }
      $(".front_body").addClass("scroll_mode");
    }else{
      if(!mainSwiper){
        mainSwiper = new Swiper('.mv_container',pluginOption);
      }
    }
  }
}






function mainSwiper() {
  let mainSwiper = null;
  let touchstart = "ontouchstart" in window;
  let windowWidth = $(window).width();
  let intervalTime = 0;
  let addIndex = 0;
  let btnClickIs = false;
  const page_header = $(".page_header");
  const main_scene = $(".main_scene");
  const anchor_menu = $(".nav_top_item , .nav_bottom_item , .nav_mobile_menu");
  let activeItem = $(".nav_top_item.active , .nav_bottom_item.active , .nav_mobile_menu.active");
  let pluginOption = {
    direction: 'vertical',
    mousewheel: {
      forceToAxis : true,
      sensitivity : 0
    },
    slidesPerView: "auto",
    autoHeight: true,
    speed: 1000,
    initialSlide: 0
  }

  
  $(".mc_11").append($(".btn_top_scroll_wrap").clone(true).addClass("clone"));

  sceneCheck();
  screenAction();
  // $(".front_body").addClass("scroll_mode");


  // 리사이즈 이벤트 처리
  $(window).on('orientationchange', function() {
      if(touchstart){
        location.reload();
        $("html,body").scrollTop(0);
      }
  });
  if(!!mainSwiper){
    mainSwiper.on("slideChange",()=>{
        //console.log('test change')
        screenAction();
    });
  }else{
    scrollAction();
  }
  // btn event
  $(".nav_top_logo_link , .btn_top_scroll").on("click",function(e){
    e.preventDefault();
    if(!!mainSwiper){
      mainSwiper.slideTo(0,1000);
    }else{
      window.scrollTo({
        top : 0,
        left : 0,
        behavior : "smooth"
      })
    }
  });
  $(".btn_bottom_scroll").on("click",function(e){
    e.preventDefault();
    if(!!mainSwiper){
      mainSwiper.slideTo(1,1000);
    }else{
      window.scrollTo({
        top : $(".mc_02").offset().top,
        left : 0,
        behavior : "smooth"
      })
    }
  });
  anchor_menu.on("click",function(e){
    let thisIndex = $(this).closest("li").index();
    e.preventDefault();
    if(!!mainSwiper){
      if(thisIndex === 0){
        mainSwiper.slideTo(1,1000);
      }else if(thisIndex === 1){
        mainSwiper.slideTo(7,1000);
      }else if(thisIndex === 2){
        mainSwiper.slideTo(8,1000);
      }else if(thisIndex === 3){
        mainSwiper.slideTo(9,1000);
      }else if(thisIndex === 4){
        mainSwiper.slideTo(10,1000);
      }
    }else{
      if(thisIndex === 0){
        $("html,body").stop().animate({"scrollTop" : $(".mc_02").offset().top});
      }else if(thisIndex === 1){
        $("html,body").stop().animate({"scrollTop" : $(".mc_08").offset().top});
      }else if(thisIndex === 2){
        $("html,body").stop().animate({"scrollTop" : $(".mc_09").offset().top});
      }else if(thisIndex === 3){
        $("html,body").stop().animate({"scrollTop" : $(".mc_10").offset().top});
      }else if(thisIndex === 4){
        $("html,body").stop().animate({"scrollTop" : $(".mc_11").offset().top});
      }
    }
  });
  $(".btn_nav_mobile_call").on("click",function(e){
    e.preventDefault();
    let nav_mobile_menu_zone = $(".nav_mobile_menu_zone");
    let setTime = 0;
    nav_mobile_menu_zone.addClass("active");
    if(setTime){
      clearTimeout(setTime);
    }
    setTime = setTimeout(()=>{
      nav_mobile_menu_zone.addClass("motion");
    },30);
  });
  $(".btn_nav_mobile_close").on("click",function(e){
    e.preventDefault();
    let nav_mobile_menu_zone = $(".nav_mobile_menu_zone");
    let setTime = 0;
    nav_mobile_menu_zone.removeClass("motion");
    if(setTime){
      clearTimeout(setTime);
    }
    setTime = setTimeout(()=>{
      nav_mobile_menu_zone.removeClass("active");
    },510);
  });
  $(".nav_mobile_menu").on("click",function(e){
    e.preventDefault();
    $(".btn_nav_mobile_close").trigger("click");
  });
  $(window).on("resize",function(){
    if (windowWidth !== $(window).width()) {
    }
    windowWidth = $(window).width();
  });
  $(window).on("scroll",function(){
    scrollAction();
  });
  $(window).on("touchstart mousewheel mousedown",function(){
      btnClickIs = false;
  });
  $(window).on("scrollend",function(){
    scrollEndAction();
  });


  function sceneCheck(){
    let scene_contents = $(".scene_contents");
    let check_count = 0;
    $(".front_body").removeClass("scroll_mode");
    if($(window).width()>$(window).height() && touchstart){
      $(".front_body").addClass("scroll_mode");
      return;
    }
    scene_contents.each(function(){
      if($(this).outerHeight(true) >= $(window).height()){
        check_count++;
      }
    });
    if(check_count>0){
      if(!!mainSwiper){
        mainSwiper.destroy();
      }
      $(".front_body").addClass("scroll_mode");
    }else{
      if(!mainSwiper){
        $("html,body").scrollTop(0);
        mainSwiper = new Swiper('.mv_container',pluginOption);
      }
    }
  }
  function screenAction(){
    if(!mainSwiper){return;}
    $(".nav_top_list_zone").removeClass("skin2");
    $(".nav_bottom_item , .nav_mobile_menu").removeClass("active");
    $(".nav_top_item,.nav_bottom_item , .nav_mobile_menu").removeClass("active");
    $(".btn_top_scroll_wrap").not(".clone").removeClass("pos2");
    $(".nav_mobile_call_wrap").addClass("none");
    $(".btn_nav_mobile_call").removeClass("skin2");
    if (mainSwiper.realIndex == 0) {
        $(".btn_top_scroll_wrap , .nav_bottom_list_zone").fadeOut();
        $(".btn_bottom_scroll_wrap , .nav_top_list_zone").fadeIn();
        $(".nav_mobile_call_wrap").removeClass("none");
    }else if(mainSwiper.realIndex == 10){
      $(".nav_mobile_call_wrap").removeClass("none");
      $(".btn_bottom_scroll_wrap,.nav_bottom_list_zone").fadeOut();
      //$(".btn_top_scroll_wrap").addClass("pos2").fadeIn();
      $(".btn_nav_mobile_call").addClass("skin2");
      setTimeout(()=>{
        $(".btn_top_scroll_wrap").not(".clone").hide();
        $(".btn_top_scroll_wrap.clone").show();
      },999);
      if($(window).width()>1023){
        $(".nav_top_list_zone").addClass("skin2").fadeIn();
        $(".nav_bottom_list_zone").fadeOut();
        $(".nav_top_item").last().addClass("active");
      }else{
        $(".nav_mobile_menu").last().addClass("active");
        $(".nav_bottom_item").last().removeClass("active");
      }
      //$(".mc_11").append($(".btn_top_scroll_wrap").addClass("pos2"));
    }else{
      if (mainSwiper.realIndex >= 1 && mainSwiper.realIndex <= 6) {
        $(".nav_bottom_item , .nav_mobile_menu").eq(0).addClass("active");
      }else if(mainSwiper.realIndex == 7){
        $(".nav_bottom_item , .nav_mobile_menu").eq(1).addClass("active");
      }else if(mainSwiper.realIndex == 8){
        $(".nav_bottom_item , .nav_mobile_menu").eq(2).addClass("active");
      }else if(mainSwiper.realIndex == 9){
        $(".nav_bottom_item , .nav_mobile_menu").eq(3).addClass("active");
      }
      $(".btn_top_scroll_wrap , .nav_bottom_list_zone").fadeIn();
      $(".btn_bottom_scroll_wrap , .nav_top_list_zone").fadeOut();
      $(".btn_top_scroll_wrap.clone").hide();
    }
  }

  function scrollAction() {
    let page_header_height = page_header.outerHeight(true);
    let scrollTop = $(window).scrollTop();
    let contact_in = false;
    
    $(".nav_bottom_item , .nav_mobile_menu").removeClass("active");
    $(".nav_mobile_call_wrap").removeClass("none");
    $(".btn_nav_mobile_call").removeClass("skin2");
    if(!btnClickIs){
        /* anchor_menu.forEach((item,index) => {
            if(getPosArrayValue[index] - getPosHeight - header_wrapHeight <= window.scrollY){
                activeTab(item);
            }
        }); */
        /* anchor_menu.each(function(){
          let $this = $(this);
          if(getPosArrayValue[thisIndex] <= window.scrollY){
              activeTab(this);
          }
        }); */
        if(scrollTop === 0){
          $(".btn_bottom_scroll_wrap").show();
          $(".btn_top_scroll_wrap").hide();
          $(".nav_bottom_list_zone").hide();
          $(".nav_top_list_zone").removeClass("skin2").show();
          $(".nav_mobile_call_wrap").removeClass("none");
          contact_in = false;
        }else{
          $(".btn_bottom_scroll_wrap").hide();
          $(".btn_top_scroll_wrap").show();
          $(".nav_bottom_list_zone").show();
          if(!contact_in){
            $(".nav_top_list_zone").stop().hide();
          }
          $(".btn_top_scroll_wrap.clone").hide();
          $(".nav_mobile_call_wrap").addClass("none");
        }

        
        if($(window).scrollTop() >= $(".mc_02").offset().top && $(window).scrollTop() <= $(".mc_07").offset().top + $(".mc_07").outerHeight(true)){
          //console.log(".mc_02");
          anchor_menu.removeClass("active");
          $(".nav_bottom_item , .nav_mobile_menu").eq(0).addClass("active");
        }
        
        if($(window).scrollTop() >= $(".mc_08").offset().top && $(window).scrollTop() <= $(".mc_08").offset().top + $(".mc_08").outerHeight(true)){
          //console.log(".mc_08");
          anchor_menu.removeClass("active");
          $(".nav_bottom_item , .nav_mobile_menu").eq(1).addClass("active");
        }
        
        if($(window).scrollTop() >= $(".mc_09").offset().top && $(window).scrollTop() <= $(".mc_09").offset().top + $(".mc_09").outerHeight(true)){
          //console.log(".mc_09");
          anchor_menu.removeClass("active");
          $(".nav_bottom_item , .nav_mobile_menu").eq(2).addClass("active");
        }
        
        if($(window).scrollTop() >= $(".mc_10").offset().top && $(window).scrollTop() <= $(".mc_10").offset().top + $(".mc_10").outerHeight(true)){
          //console.log(".mc_10");
          anchor_menu.removeClass("active");
          $(".nav_bottom_item , .nav_mobile_menu").eq(3).addClass("active");

        }
        
        if($(window).scrollTop() >= $(".mc_11").offset().top && $(window).scrollTop() <= $(".mc_11").offset().top + $(".mc_11").outerHeight(true)){
          //console.log(".mc_11");
          anchor_menu.removeClass("active");

          

          $(".nav_bottom_list_zone").hide();
          $(".nav_bottom_item , .nav_mobile_menu , .nav_top_item").eq(4).addClass("active");
          contact_in = true;
          if(contact_in){
            $(".nav_top_list_zone").addClass("skin2").show();
          }

          
          $(".btn_top_scroll_wrap").not(".clone").hide();
          $(".btn_top_scroll_wrap.clone").show();
          $(".nav_mobile_call_wrap").removeClass("none");
          $(".btn_nav_mobile_call").addClass("skin2");
        }

        /* if($(window).scrollTop() >= $(".mc_02").offset().top){

        }else if($(window).scrollTop() >= $(".mc_08").offset().top){

        }else if($(window).scrollTop() >= $(".mc_09").offset().top){

        }else if($(window).scrollTop() >= $(".mc_10").offset().top){

        }else if($(window).scrollTop() >= $(".mc_11").offset().top){

        } */
    }
}
  function scrollEndAction(){
      if(!!anchor_menu){
          anchor_menu.removeClass("click_active");
      }
  }
  function activeTab(target){
      let targetDom = $(target);
      if (activeItem) {
          activeItem.removeClass("active");
      }
      targetDom.addClass("active");
      activeItem = targetDom;
  }
}

