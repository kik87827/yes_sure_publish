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


function mainSwiper(){
  let touchstart = "ontouchstart" in window;
  const front_html = $("html");
  const front_body = $(".front_body");
  const main_swpier_container = $(".main_swpier_container");
  const mv_swiper_slide = main_swpier_container.find(".swiper-slide");

  let intervalTime = 0;
  let addIndex = 0;
  let serviceSwiper = null;
  let service_swiper_slide = $(".service_swiper_wrap .swiper-slide");
  let service_swiper_length = service_swiper_slide.length;
  let mainSwiper = null;

  if(touchstart){
    main_swpier_container.addClass("scrollmode");
    mainSwiper = new Swiper('.main_swpier_container', {
        direction: 'vertical',
        freeMode: true, // 자유 모드 설정
        freeModeSticky: false,
        slidesPerView: "auto",
        autoHeight : true,
        speed : 1000,
        initialSlide : 0
    });
  }else{
    mainSwiper = new Swiper('.main_swpier_container', {
        direction: 'vertical',
        mousewheel: true,
        freeMode: false,
        slidesPerView: "auto",
        autoHeight : true,
        speed : 1000,
        initialSlide : 0
    });
  }
  
  let resourceSwiper = new Swiper('.hor_swiper_wrap',{
    speed : 1000,
    // autoHeight : true,
    effect : 'fade',
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
  /* let serviceSwiper = new Swiper('.service_swiper_wrap',{
    speed : 1000,
    freeMode: true,
    slidesPerView: 4,
  }); */

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
  /* $(".scene_contents").attr("tabindex",0); */
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
    e.stopPropagation();
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
    //$(".scene_contents").eq(mainSwiper.realIndex).focus();
    //$(".nav_top_list > .nav_bottom_list").find(".nav_top_item,.nav_bottom_item").removeClass("active");
    if(intervalTime){
      clearInterval(intervalTime);
      addIndex = 0;
      intervalTime = 0;
      setTimeout(()=>{
        service_swiper_slide.removeClass("swiper-slide-active");
        service_swiper_slide.eq(0).addClass("swiper-slide-active");
      },1000);
    }
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
        if (mainSwiper.realIndex == 3) {
          resourceSwiper.slideTo(0,0);
          setTimeout(()=>{
            resourceSwiper.autoplay.start();
          },1100);
        }
        if (mainSwiper.realIndex == 6) {
          serviceAction();
        }
        $(".btn_top_scroll_wrap , .nav_bottom_list_zone").fadeIn();
        $(".btn_bottom_scroll_wrap , .nav_top_list_zone").fadeOut();
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
      
      serviceSwiper = new Swiper('.service_swiper_wrap',{
        speed : 1000,
        slidesPerView: "auto",
        centeredSlides: true,
        autoplay: {
          delay: 2200,
          disableOnInteraction: false,
        },
      });
      // serviceSwiper.autoplay.start();
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
    if(touchstart){return;}
    let $this = target;
    if($this.scrollTop() === 0){
      mainSwiper.slidePrev(1000);
    }
  }

  function mcWheelDownCheck(target){
    if(touchstart){return;}
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