$(function() {
	topExpend();
	watchClassification();
	changeMfc();
})

function topExpend() {
	$(".top-item").hover(function() {
		$(this).children(".menus-content").stop().slideToggle(300);
		if($(this).find(".menus-content").length != 0) {
			$(this).children(".down-icon").removeClass("rotateIconBack").addClass("rotateIcon");
		}

	}, function() {
		$(this).children(".menus-content").stop().slideToggle(300);
		if($(this).find(".menus-content").length != 0) {
			$(this).children(".down-icon").removeClass("rotateIcon").addClass("rotateIconBack");
		}
	})
}

function watchClassification() {
	$(".kindItem").mouseover(function() {
		var index = $(this).index();
		$(this).removeClass("noChoose").addClass("choose");
		$(".popItem").eq(index).show();
		$(".classifyPop").show();
	})
	$(".kindItem").mouseout(function() {
		var index = $(this).index();
		$(this).removeClass("choose").addClass("noChoose");
		$(".popItem").eq(index).hide();
		$(".classifyPop").hide();
	})
	$(".popItem").mouseover(function() {
		$(this).show();
		$(".classifyPop").show();
	})
	$(".popItem").mouseout(function() {
		$(this).hide();
		$(".classifyPop").hide();
	})
}

function changeMfc() {
	$(".manufacturer").click(function() {
		$(".manufacturer").removeClass("manufacturerActive").addClass("manufacturerNotActive");
		$(this).removeClass("manufacturerNotActive").addClass("manufacturerActive");
		$(".stepWrap").hide();
		$(".stepWrap").eq($(this).index()).show();
	})
}
