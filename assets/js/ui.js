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


function mainSwiper() {
  let mainSwiper = null;
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

  $(window).on("resize",function(){
      sceneCheck();
  });


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