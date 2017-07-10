
function topExpend(){
	$(".top-item").hover(function(){
		$(this).children(".menus-content").stop().slideToggle(300);
		if($(this).find(".menus-content").length!=0)
		{
			$(this).children(".down-icon").removeClass("rotateIconBack").addClass("rotateIcon");
		}
		
	},function(){
		$(this).children(".menus-content").stop().slideToggle(300);
		if($(this).find(".menus-content").length!=0)
		{
			$(this).children(".down-icon").removeClass("rotateIcon").addClass("rotateIconBack");
		}
	})
}
function watchClassification(){
	$(".kindItem").mouseover(function(){
		var index = $(this).index();
		$(this).removeClass("noChoose").addClass("choose");
		$(".popItem").eq(index).show();
		$(".classifyPop").show();
	})
	$(".kindItem").mouseout(function(){
		var index = $(this).index();
		$(this).removeClass("choose").addClass("noChoose");	
		$(".popItem").eq(index).hide();
		$(".classifyPop").hide();
	})
	$(".popItem").mouseover(function(){		
		$(this).show();
		$(".classifyPop").show();
	})
	$(".popItem").mouseout(function(){		
		$(this).hide();
		$(".classifyPop").hide();
	})
}

function changeMfc()
{
	$(".manufacturer").click(function(){
		$(".manufacturer").removeClass("manufacturerActive").addClass("manufacturerNotActive");
		$(this).removeClass("manufacturerNotActive").addClass("manufacturerActive");
		$(".stepWrap").hide();
		$(".stepWrap").eq($(this).index()).show();
	})
}

function noticeScroll(){
//	var step=1;
//	$(".noticeInner").append($(".noticeInner").html());
//	
//	setInterval(stepUp,1000);
//	
//	
//	
//	function stepUp(){
//		var topN = top*24;
//		var topNow = top;
//		$(".noticeInner").css("top",0);
//	}
}

// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

$(function () {
	topExpend();
	watchClassification();
	changeMfc();
	noticeScroll();
    //店铺头部、侧边栏js
    $(".store-qr-btn").on("click",function () {
        $(this).siblings(".store-qr").toggle();
    });
    //头部搜索全站、搜索店铺内
    $(".search-part").on("click",function () {
        $("input[name='type']").val(1);
        $("#searchForm").submit();
    });
    $(".search-all").on("click",function () {
        $("input[name='type']").val(2);
        $("#searchForm").submit();
    });
    //店内分类切换效果
    $(".first-nav-btn").on("click",function () {
        $(this).siblings(".second-nav").slideToggle(500);
        $(this).parent().siblings(".first-nav").find(".second-nav").hide(500);
    });

    //供应商中心弹窗 提醒发货
    $(document).on('click', '.btn-agree', function (e) {
    	e.preventDefault();
        $('.overlay').hide();
    }).on('click', '.btn-cancel', function (e) {
        e.preventDefault();
        $('.overlay').hide();
    }).on('click', '.icon-exit', function (e) {
        e.preventDefault();
        $('.overlay').hide();
    });
});
