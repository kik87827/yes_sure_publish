window.addEventListener("DOMContentLoaded", () => {
  commonInit();
});
window.addEventListener("load", () => {
});

$(function() {
})

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


function mainSwiper(){
    
  const front_html = $("html");
  const front_body = $(".front_body");
  const main_swpier_container = $(".main_swpier_container");
  const mv_swiper_slide = main_swpier_container.find(".swiper-slide");

  let mainSwiper = new Swiper('.main_swpier_container', {
      direction: 'vertical',
      mousewheel: true,
      freeMode: false,
      slidesPerView: "auto",
      autoHeight : true,
      speed : 1000,
      initialSlide : 0,
      on : {
          setTranslate: function (translate) {
              /* if(window.innerWidth>=1024){return;}
              if(translate.translate < 0){
                header_wrap.classList.add("scroll");
            }else{
                  header_wrap.classList.remove("scroll");
              } */
          },
      }
  });

  screenAction();
  heightCheck();

  window.addEventListener("resize",()=>{
      
  });

  mainSwiper.on("slideChange",()=>{
      screenAction();
  });
 /*  mainSwiper.on("slideChangeTransitionEnd",()=>{
    scrollModeCheck();
  }); */
  window.addEventListener("resize",()=>{
      heightCheck();
  });
  $(".scene_contents").on("wheel scroll",function(e){
    let thisEvent = $(this);
    if(e.type === "wheel"){
      e.stopPropagation();
      if (e.originalEvent.deltaY > 0) {
        mcWheelDownCheck(thisEvent);
      }else{
        mcWheelUpCheck(thisEvent);
      }
    }else{
      // mcScrollCheck(thisEvent);
    }
  });
  
  // btn event
  $(".btn_bottom_scroll").on("click",function(){
    mainSwiper.slideTo(1,1000);
  });
  $(".btn_top_scroll").on("click",function(){
    mainSwiper.slideTo(0,1000);
  });
  $(".nav_top_item , .nav_bottom_item").on("click",function(){
    let thisIndex = $(this).closest("li").index();
    if(thisIndex === 0){
      mainSwiper.slideTo(1,1000);
    }else if(thisIndex === 1){
      mainSwiper.slideTo(6,1000);
    }else if(thisIndex === 2){
      mainSwiper.slideTo(7,1000);
    }else if(thisIndex === 3){
      mainSwiper.slideTo(8,1000);
    }else if(thisIndex === 4){
      mainSwiper.slideTo(9,1000);
    }
  });

  function heightCheck(){
      /* let header_wrap_height = 0;
      if(!!header_wrap){
          header_wrap_height = header_wrap.getBoundingClientRect().height;
      }
      if(!!check_height){
          check_height.forEach((item)=>{
              if(item.getBoundingClientRect().height>= document.documentElement.clientHeight - header_wrap_height){
                  item.classList.add("overHeight");
              }else{
                  item.classList.remove("overHeight");
              }
          });
          let overHeightItem = document.querySelectorAll(".overHeight");
          if(overHeightItem.length>0){
              mv_container.classList.add("scrollmode");
              mainSwiper.params.freeMode.enabled = true;
              mainSwiper.params.speed = 0;
          }else{
              mv_container.classList.remove("scrollmode");
              mainSwiper.params.freeMode.enabled = false;
              mainSwiper.params.speed = 1000;
          }
          if(window.innerWidth < 1024){
              mv_container.classList.add("scrollmode");
              mainSwiper.params.freeMode.enabled = true;
          }
          mainSwiper.update();
      } */
  }

  function screenAction(){
    $(".nav_top_list_zone").removeClass("skin2");
    $(".nav_top_item,.nav_bottom_item").removeClass("active");
    //$(".nav_top_list > .nav_bottom_list").find(".nav_top_item,.nav_bottom_item").removeClass("active");
    if (mainSwiper.realIndex == 0) {
        $(".btn_top_scroll_wrap , .nav_bottom_list_zone").fadeOut();
        $(".btn_bottom_scroll_wrap , .nav_top_list_zone").fadeIn();
    }else if(mainSwiper.realIndex == 9){
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
        if (mainSwiper.realIndex >= 1 && mainSwiper.realIndex <= 5) {
          $(".nav_bottom_item").eq(0).addClass("active");
        }else if(mainSwiper.realIndex == 6){
          $(".nav_bottom_item").eq(1).addClass("active");
        }else if(mainSwiper.realIndex == 7){
          $(".nav_bottom_item").eq(2).addClass("active");
        }else if(mainSwiper.realIndex == 8){
          $(".nav_bottom_item").eq(3).addClass("active");
        }
        $(".btn_top_scroll_wrap , .nav_bottom_list_zone").fadeIn();
        $(".btn_bottom_scroll_wrap , .nav_top_list_zone").fadeOut();
    }
  }

  function mcScrollCheck(target){
    let $this = target;
    if(mainSwiper.realIndex == 9){return;}
    if ($this[0].scrollHeight - $this.scrollTop() === $this.outerHeight()) {
      mainSwiper.slideNext(1000);
    }else if($this.scrollTop() === 0){
      mainSwiper.slidePrev(1000);
    }
  }

  function mcWheelUpCheck(target){
    let $this = target;
    if($this.scrollTop() === 0){
      mainSwiper.slidePrev(1000);
    }
  }

  function mcWheelDownCheck(target){
    let $this = target;
    if ($this[0].scrollHeight - $this.scrollTop() === $this.outerHeight()) {
      mainSwiper.slideNext(1000);
    }
  }
}


function formLayout(){
  let scene_form_item_key = $(".scene_form_item").not(".type2").find(".scene_form_key_cols");
  let maxkey = [];
  action();
  $(window).on("resize",function(){
    action();
  });


  function action(){
    scene_form_item_key.css("flex-basis","");
    scene_form_item_key.each(function(){
      maxkey.push($(this).outerWidth());
    });
    scene_form_item_key.css({"flex-basis" : Math.max.apply(null,maxkey) });
  }
}