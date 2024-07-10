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
  let touchstart = "ontouchstart" in window;
  let windowWidth = $(window).width();
  let intervalTime = 0;
  let addIndex = 0;
  let btnClickIs = false;
  const page_header = $(".page_header");
  const main_scene = $(".main_scene");
  const anchor_menu = $(".nav_top_item , .nav_bottom_item , .nav_mobile_menu");
  let activeItem = $(".nav_top_item.active , .nav_bottom_item.active , .nav_mobile_menu.active");

  let serviceSwiper = null;
  let service_swiper_slide = $(".service_swiper_wrap .swiper-slide");
  let service_swiper_length = service_swiper_slide.length;

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

  let resourceSwiper = new Swiper('.hor_swiper_wrap',{
    speed : 1000,
    // autoHeight : true,
    effect : 'fade',
    autoplay: {
      delay: 2200,
      disableOnInteraction: false,
    },
  });
  /* let faqscroll = new Swiper(".faqscroll", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".faqscroll .swiper-scrollbar",
    },
    mousewheel: true,
  }); */
  
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
    $("html,body").addClass("touchDis");
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
    $("html,body").removeClass("touchDis");
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
  $(".scene_toggle_list_wrap").on("mousewheel touchmove",function(e){
    if($(window).width()<=1023){
      if($(".scene_toggle_list").outerHeight(true) > 330){
        e.stopPropagation();
      }
    }else{
      if($(".scene_toggle_list").outerHeight(true) > $(window).height() - 455){
        e.stopPropagation();
      }
    }
    
  });
  $(window).on("resize",function(){
    if (windowWidth !== $(window).width()) {
      sceneCheck();
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

  //$("body").append("<div id='debug' style='position:fixed;top:0;right:0;background:red;color:#fff;padding:10px;z-index:1000' />")


  function sceneCheck(){
    let scene_contents = $(".scene_contents");
    let check_count = 0;
    let page_header = $(".page_header");
    let page_header_height = !!page_header ? page_header.outerHeight(true) : 0;
    if($(window).width()<=1023){
      page_header_height= 0;
    }
    $(".front_body").removeClass("scroll_mode");
    if($(window).width()>$(window).height() && touchstart && $(window).width()<1023){
      $(".front_body").addClass("scroll_mode");
      return;
    }
    scene_contents.each(function(){
      if($(this).outerHeight(true) >= $(window).height() - page_header_height){
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
    /* console.log(mainSwiper.realIndex); */
    $(".nav_top_list_zone").removeClass("skin2");
    $(".nav_bottom_item , .nav_mobile_menu").removeClass("active");
    $(".nav_top_item,.nav_bottom_item , .nav_mobile_menu").removeClass("active");
    $(".btn_top_scroll_wrap").not(".clone").removeClass("pos2");
    $(".nav_mobile_call_wrap").addClass("none");
    $(".btn_nav_mobile_call").removeClass("skin2");
    $(".main_scene.mc_11").closest(".swiper-slide").removeClass("swiper-slide-active");
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
    }else if(mainSwiper.realIndex == 11){
      $(".nav_mobile_call_wrap").removeClass("none");
      $(".btn_bottom_scroll_wrap,.nav_bottom_list_zone").fadeOut();
      setTimeout(()=>{
        $(".main_scene.mc_11").parents(".swiper-slide").addClass("swiper-slide-active");
      },30);
      //$("#debug").text('if'+mainSwiper.realIndex);
    }else{
      if (mainSwiper.realIndex >= 1 && mainSwiper.realIndex <= 6) {
        $(".nav_bottom_item , .nav_mobile_menu").eq(0).addClass("active");
      }else if(mainSwiper.realIndex == 7){
        $(".nav_bottom_item , .nav_mobile_menu").eq(1).addClass("active");
        setTimeout(()=>{
          serviceAction();
        },100);
      }else if(mainSwiper.realIndex == 8){
        $(".nav_bottom_item , .nav_mobile_menu").eq(2).addClass("active");
      }else if(mainSwiper.realIndex == 9){
        $(".nav_bottom_item , .nav_mobile_menu").eq(3).addClass("active");
      }
      if (mainSwiper.realIndex == 4) {
        resourceSwiper.slideTo(0,0);
        setTimeout(()=>{
          resourceSwiper.autoplay.start();
        },1100);
      }else{
        resourceSwiper.autoplay.stop();
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
        
        if($(window).scrollTop() >= $(".mc_05").offset().top && $(window).scrollTop() <= $(".mc_05").offset().top + $(".mc_05").outerHeight(true)){
          resourceSwiper.slideTo(0,0);
          setTimeout(()=>{
            resourceSwiper.autoplay.start();
          },1100);
        }else{
          resourceSwiper.autoplay.stop();
        }
        
        if($(window).scrollTop() >= $(".mc_08").offset().top && $(window).scrollTop() <= $(".mc_08").offset().top + $(".mc_08").outerHeight(true)){
          //console.log(".mc_08");
          anchor_menu.removeClass("active");
          $(".nav_bottom_item , .nav_mobile_menu").eq(1).addClass("active");
          serviceAction();
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


        if($(window).scrollTop() >= $(".footer_wrap").offset().top && $(window).scrollTop() <= $(".footer_wrap").offset().top + $(".footer_wrap").outerHeight(true)){
          $(".nav_bottom_list_zone , .btn_top_scroll_wrap").hide();

        }

        /* if($(window).scrollTop() >= $(".mc_02").offset().top){

        }else if($(window).scrollTop() >= $(".mc_08").offset().top){

        }else if($(window).scrollTop() >= $(".mc_09").offset().top){

        }else if($(window).scrollTop() >= $(".mc_10").offset().top){

        }else if($(window).scrollTop() >= $(".mc_11").offset().top){

        } */
    }
  }

  function serviceAction(){

    if($(window).width()>1023){
      pcAction();
    }else{
      mbAction();
    }

    $(window).on("resize",function(){
      
      setTimeout(()=>{
        if(serviceSwiper !== null){
          serviceSwiper.destroy();
          serviceSwiper = null;
        }
        if(intervalTime){
          clearInterval(intervalTime);
          addIndex = 0;
          intervalTime = 0;
        }
        service_swiper_slide.removeClass("swiper-slide-active");
        service_swiper_slide.eq(0).addClass("swiper-slide-active");
        if($(window).width()>1023){
          pcAction();
        }else{
          mbAction();
        }
      },100);
    });

    function pcAction(){
      $(".service_swiper_wrap").addClass("pcstop");
        
        /* service_swiper_slide.removeClass("swiper-slide-active");
        service_swiper_slide.eq(0).addClass("swiper-slide-active"); */
        if(intervalTime !== 0){
          clearInterval(intervalTime);
        }
        intervalTime = setInterval(()=>{
          addAction();
        },2200);
        
				function addAction(){
					if(addIndex > service_swiper_length - 1){
						addIndex = 0;
					}
					service_swiper_slide.removeClass("swiper-slide-active");
					service_swiper_slide.eq(addIndex).addClass("swiper-slide-active");
					addIndex++;
				}
    }

    function mbAction(){
      /* if(intervalTime){
        clearInterval(intervalTime);
        intervalTime = 0;
      } */
      $(".service_swiper_wrap").removeClass("pcstop");
      if(serviceSwiper === null){
        serviceSwiper = new Swiper('.service_swiper_wrap',{
          speed : 1000,
          loog : true,
          autoplay: {
            delay: 2200,
            disableOnInteraction: false,
          },
        });
      }else{
        serviceSwiper.slideTo(0,0);
        serviceSwiper.autoplay.start();
      }
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



function faqToggle(){
  $(function(){
    let scene_toggle_bar = $(".scene_toggle_bar");
    scene_toggle_bar.on("click",function(e){
      e.preventDefault();
      let thisDom = $(this);
      let thisDomLi = thisDom.closest("li");
      let thisDomUl = thisDom.closest(".scene_toggle_list");
      let thisDomUlLi = thisDomUl.children("li").not(thisDomLi);

      thisDomUlLi.removeClass("active");
      
      thisDomLi.toggleClass("active");
    });
  });
} 



function sceneTab(){
  $(function(){
    let scene_tab_menu = $(".scene_tab_menu");
    scene_tab_menu.on("click",function(e){
      e.preventDefault();
      let thisDom = $(this);
      let thisTarget = $(thisDom.attr("href"));
      thisDom.closest(".scene_tab_menu_list").find(".scene_tab_menu").removeClass("active");
      thisDom.addClass("active");

      if(thisTarget.length){
        thisDom.closest(".biz_tab_container").find(".scene_tab_cont").removeClass("active");
        thisTarget.addClass("active");
      }
    });
  });
}