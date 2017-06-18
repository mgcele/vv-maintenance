if (typeof $ != "undefined"){
;$(function(){

// flash
if ($().slide) {
// 
$("#ibn").slide({titCell:".hd",autoPage: true, autoPlay: true, effect:"fold",easing:"swing", delayTime:800, interTime: 6000, startFun:function(i,c,s){s.find(".bd li").eq(i).addClass("active").siblings().removeClass("active");}});
// 
$(".date_snews").slide({effect:"top",autoPage: true, autoPlay: true, vis:4, interTime: 5000});

};
// end flash



// 楼层+class
(function(){
	var winH = $(window).height()*0.5,
		floor = $(".floor");
	if (floor.length != 0) {
		$(window).scroll(function(){
			var scTop = $(this).scrollTop();
			floor.each(function(){
				var flootTop = $(this).offset().top - winH;
				if (scTop > flootTop) {
					$(this).addClass("floor_cur");
				};
				if ($(this).hasClass("floorOut")) {
					if (scTop <= flootTop) {
						$(this).removeClass("floor_cur");
					};
				};
			});
		});
	};
})();
// end 楼层+class


// nav
(function(){
	var $slideNav2 = $("#slideNav2"),
		$currentNav = $slideNav2.find(".current_nav"),
		$slideNavLine2 = $("#slideNavLine2"),
		$el, leftPos, newWidth;
	if($slideNavLine2.length > 0){
		$slideNavLine2.css({
			"left" : $currentNav.position().left
		}).data("origLeft", $slideNavLine2.position().left);
		$slideNav2.find("li:not('.gt')").hover(function(){
			$el = $(this);
			$el.find(".tnav2_sec").stop(true,true).slideDown();
			leftPos = $el.position().left;
			newWidth = $el.innerWidth();
			$slideNavLine2.stop().animate({
				left: leftPos
			});
		},function(){
			$(this).find(".tnav2_sec").slideUp();
	        $slideNavLine2.stop().animate({
	            left: $slideNavLine2.data("origLeft")
	        });
	    });
	};
})();
// end nav







});




};
// end jq