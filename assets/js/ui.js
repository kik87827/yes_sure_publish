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

  sceneCheck();
  screenAction();

  // 리사이즈 이벤트 처리
  $(window).on('orientationchange', function() {
      console.log('orientationchange');
      if(touchstart){
        location.reload();
        $("html,body").scrollTop(0);
      }
  });
  mainSwiper.on("slideChange",()=>{
      screenAction();
  });
  // btn event
  $(".nav_top_logo_link").on("click",function(e){
    e.preventDefault();
    mainSwiper.slideTo(0,1000);
  });
  $(".btn_bottom_scroll").on("click",function(e){
    e.preventDefault();
    mainSwiper.slideTo(1,1000);
  });
  $(".btn_top_scroll").on("click",function(e){
    e.preventDefault();
    mainSwiper.slideTo(0,1000);
  });
  $(".nav_top_item , .nav_bottom_item").on("click",function(e){
    let thisIndex = $(this).closest("li").index();
    e.preventDefault();
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
    $(".nav_top_list_zone").removeClass("skin2");
    $(".nav_top_item,.nav_bottom_item").removeClass("active");
    if (mainSwiper.realIndex == 0) {
        $(".btn_top_scroll_wrap , .nav_bottom_list_zone").fadeOut();
        $(".btn_bottom_scroll_wrap , .nav_top_list_zone").fadeIn();
    }else if(mainSwiper.realIndex == 10){
      $(".btn_bottom_scroll_wrap").fadeOut();
      if($(window).width()>1023){
        $(".nav_top_list_zone").addClass("skin2").fadeIn();
        $(".nav_bottom_list_zone ,.btn_top_scroll_wrap").fadeOut();
        $(".nav_top_item").last().addClass("active");
      }else{
        $(".nav_bottom_list_zone , .btn_top_scroll_wrap").fadeIn();
        $(".nav_bottom_item").last().addClass("active");
      }
      
    }else{
        if (mainSwiper.realIndex >= 1 && mainSwiper.realIndex <= 6) {
          $(".nav_bottom_item").eq(0).addClass("active");
        }else if(mainSwiper.realIndex == 7){
          $(".nav_bottom_item").eq(1).addClass("active");
        }else if(mainSwiper.realIndex == 8){
          $(".nav_bottom_item").eq(2).addClass("active");
        }else if(mainSwiper.realIndex == 9){
          $(".nav_bottom_item").eq(3).addClass("active");
        }
        $(".btn_top_scroll_wrap , .nav_bottom_list_zone").fadeIn();
        $(".btn_bottom_scroll_wrap , .nav_top_list_zone").fadeOut();
    }
  }
}