// JavaScript Document

$(document).ready(function(){
	//鼠标移过网页顶部左边
	$(".headL").mouseover(function(){
		$(this).find(".space").css("width", ($(this).width()-2) + "px");
		$(this).attr("id", "headLHover");
	});
	$(".headL").mouseout(function(){
		$(this).find(".space").css("width", "0px");
		$(this).attr("id", "");
	});

	//网页顶部左边更换地区
	$(".area").find("li").click(function(){
		$(this).siblings(".activeArea").children().removeClass("active");
		$(this).addClass("activeArea").siblings().removeClass("activeArea");
		$(this).children().addClass("active");
		$(".address").text("送至：" + $(this).text());
		$(".headL").attr("id", "");
	});

	//鼠标移过网页顶部“手机京东“
	changeHeadStyle("#jdPhone", "jdHover");
	//鼠标移过网页顶部“我的京东”
	changeHeadStyle("#myJdHover", "hoverjd");
	//鼠标移过网页顶部“关注京东“
	changeHeadStyle("#jdFollow", "jdHover");
	//鼠标移过网页顶部“客户服务“
	changeHeadStyle("#jdService", "jdHover");
	//鼠标移过网页顶部“网站导航“
	changeHeadStyle("#jdWebGuide", "jdHover");

	//关闭“顶部广告栏“
	$("#adClose").click(function(){
		$("#adJD").html("").css("height", "0");
	});

	//鼠标滑过购物车
	$("#cartShopping").mouseover(function(){
		$("#spaceCart").css("visibility", "visible");
		$("#emptyCart").css("visibility", "visible");
		$(this).css("backgroundColor", "#fff");
	});
	$("#cartShopping").mouseout(function(){
		$("#spaceCart").css("visibility", "hidden");
		$("#emptyCart").css("visibility", "hidden");
		$(this).css("backgroundColor", "#F9F9F9");
	});

	//鼠标滑过侧边导航栏
	var liList = $("#sortPrimary").find("li");
	for (var i=0, len=liList.length; i<len; i++){
		(function(num) {
			liList[i].onmouseover = function(){
				var mainBottom = this.getBoundingClientRect().bottom + document.documentElement.scrollLeft;
				var sortDiv = $("div[name='secondSortDiv']");
				var secondBottom = sortDiv[num].getBoundingClientRect().bottom + document.documentElement.scrollLeft;
				if ( mainBottom > secondBottom ) {
					var poor = mainBottom - secondBottom;
					sortDiv[num].style.top = poor + "px";
				//	document.getElementsByName("secondSortDiv")[num].style.top = poor + "px";
				//	console.log(document.getElementsByName("secondSortDiv")[num]);
				}
				this.setAttribute("id", "hover");
			}
			liList[i].onmouseout = function(){
				this.removeAttribute("id");
			}
		})(i);
	}

	//滚动图片轮播
	setScrollImg(".scrollImg1");
	setScrollImg(".scrollImg2");
	setScrollImg(".scrollImg3");
	setScrollImg(".scrollImg4");

	/* 推荐栏“上一页”“下一页”按钮 */
	//保存当前页、上一页、图片数量、计时器、动画时长
	var indexRecommend = 0;
	var exindexRecommend = 0;
	var lenRecommend = $(".recommendLine").length;
	var durationRecommend = 1000;

	//点击“下一页”
	$(".recommendNext").click(function(){
		//console.log("before: " + index);
		indexRecommend ++;
		if( indexRecommend == lenRecommend) { indexRecommend = 0 };
		nextRecommend();
		exindexRecommend = indexRecommend;
		//console.log("after:" + index);
	});

	//点击“上一页”
	$(".recommendPrev").click(function(){
		indexRecommend --;
		if( indexRecommend < 0 ) { indexRecommend = lenRecommend -1;}
		prevRecommend();
		exindexRecommend = indexRecommend;
	});

	//"下一页"实现
	function nextRecommend(){
		$(".recommendLine").stop(true, true);
		$(".recommendLine").eq(indexRecommend).css("left", "100%");
		$(".recommendLine").eq(exindexRecommend).animate({left: "-100%"}, durationRecommend);
		$(".recommendLine").eq(indexRecommend).animate({left: "0"}, durationRecommend);
	}

	//“上一页“实现
	function prevRecommend(){
		$(".recommendLine").stop(true, true);
		$(".recommendLine").eq(indexRecommend).css("left", "-100%");
		$(".recommendLine").eq(exindexRecommend).animate({left: "100%"}, durationRecommend);
		$(".recommendLine").eq(indexRecommend).animate({left: "0"}, durationRecommend);
	}

	/* 鼠标滑过楼层右边标题 */
	$(".subTitleList").mouseover(function(){
		$(this).addClass("subActive").siblings().removeClass("subActive");
		var titleIndex = $(this).parent().children().index($(this));
		var parentB1 = $(this).parentsUntil(".floorContainer").next().next().children().children();
		parentB1.eq(titleIndex).removeClass("visionStatus").siblings().addClass("visionStatus");
	});

	//鼠标滑过“天天低价”
	$(".cheapCol01").hover(function(){
		$(".cheapColImg").animate({left: "-10px"}, 200);
	},function(){
		$(".cheapColImg").animate({left: "0px"}, 200);
	});
	$(".cheapRow").hover(function(){
		$(this).find(".cheapRowImg").animate({left: "-10px"}, 200);
	},function(){
		$(this).find(".cheapRowImg").animate({left: "0px"}, 200);
	});

	//热门晒单自动轮播
	var shareTimer;
	var shareList = $(".shareList");
	var shareLen = $(".shareList").length;
	var shareIndex = 1;
	var sharePrev = 0;
	var shareNext = 0;
	$(".shareOrder").hover(function(){
		//鼠标进入“热门晒单”，停止轮播
		clearInterval(shareTimer);
	},function(){
		//鼠标离开“热门晒单”，开始轮播
		shareTimer = setInterval(function(){
			if(shareIndex == 0){
				shareNext = shareIndex + 1;
				sharePrev = shareLen - 1;
				shareList.eq(shareNext).css("top", "-120px");
				shareList.eq(shareIndex).animate({top: "120px"}, 500);
				shareList.eq(shareNext).animate({top: "0"}, 500);
				shareList.eq(sharePrev).animate({top: "245px"}, 500);
				shareIndex ++;
			}else if ( shareIndex == shareLen-1 ) {
				shareNext = 0;
				sharePrev = shareIndex - 1;
				shareList.eq(shareNext).css("top", "-120px");
				shareList.eq(shareIndex).animate({top: "120px"}, 500);
				shareList.eq(shareNext).animate({top: "0"}, 500);
				shareList.eq(sharePrev).animate({top: "245px"}, 500);
				shareIndex = 0;
			}else{
				shareNext = shareIndex + 1;
				sharePrev = shareIndex - 1;
				shareList.eq(shareNext).css("top", "-120px");
				shareList.eq(shareIndex).animate({top: "120px"}, 500);
				shareList.eq(shareNext).animate({top: "0"}, 500);
				shareList.eq(sharePrev).animate({top: "245px"}, 500);
				shareIndex ++;
			};
		}, 1500);
	}).trigger("mouseleave");
});	//end of ready

//鼠标滑过网页顶部“我的京东”，“关注京东“，“客户服务“，“网站导航“，“手机京东”
function changeHeadStyle(id, className){
	$(id).mouseover(function(){
		$(this).find(".jdSpace").css("width", ($(this).outerWidth()-5) + "px");
		$(this).addClass(className);
	});
	$(id).mouseout(function(){
		$(this).find(".jdSpace").css("width", ($(this).outerWidth()-5) + "px");
		$(this).removeClass(className);
	});
}

/* 滚动图片轮播 */
function setScrollImg(nameOfClass){
	//保存当前页、上一页、图片数量、计时器、动画时长
	var scrollImgIndex = 0;
	var scrollImgExindex = 0;
	var scrollImgLen = $(nameOfClass).find(".scrollImgItem").length;
	var scrollImgTimer;
	var scrollImgDuration = 500;

	//点击“下一页”
	$(nameOfClass).find(".scrollNext").click(function(){
		scrollImgIndex ++;
		if( scrollImgIndex == scrollImgLen) { scrollImgIndex = 0 };
		scrollImgNext(nameOfClass, scrollImgIndex, scrollImgExindex, scrollImgDuration);
		scrollImgExindex = scrollImgIndex;
	});

	//点击“上一页”
	$(nameOfClass).find(".scrollPrev").click(function(){
		scrollImgIndex --;
		if( scrollImgIndex < 0 ) { scrollImgIndex = scrollImgLen -1;}
		scrollImgPrev(nameOfClass, scrollImgIndex, scrollImgExindex, scrollImgDuration);
		scrollImgExindex = scrollImgIndex;
	});


	//鼠标滑过滚动图片状态栏
	$(nameOfClass).find(".scrollNum span").mouseover(function(){
		scrollImgIndex = $(nameOfClass).find(".scrollNum span").index($(this));
		if( scrollImgIndex > scrollImgExindex ) {
			scrollImgNext(nameOfClass, scrollImgIndex, scrollImgExindex, scrollImgDuration);
			scrollImgExindex = scrollImgIndex;
		}else if( scrollImgIndex < scrollImgExindex ) {
			scrollImgPrev(nameOfClass, scrollImgIndex, scrollImgExindex, scrollImgDuration);
			scrollImgExindex = scrollImgIndex;
		}
	});

	//鼠标不在滚动区域时自动滚动
	$(nameOfClass).hover(function(){	//鼠标进入滚动区域
		clearInterval(scrollImgTimer);
		$(nameOfClass).find(".scrollPrev").css("visibility", "visible");
		$(nameOfClass).find(".scrollNext").css("visibility", "visible");
	},function(){	//鼠标离开滚动区域
		$(nameOfClass).find(".scrollPrev").css("visibility", "hidden");
		$(nameOfClass).find(".scrollNext").css("visibility", "hidden");
		scrollImgTimer = setInterval(function(){
			$(nameOfClass).find(".scrollNext").click();
		}, 1500);
	}).trigger("mouseleave");
}

//滚动图片"下一页"实现
function scrollImgNext(nameOfClass, scrollImgIndex, scrollImgExindex, scrollImgDuration){
	$(nameOfClass).find(".scrollImgItem").stop(false, true);
	$(nameOfClass).find(".scrollImgItem").eq(scrollImgIndex).css("left", "100%");
	$(nameOfClass).find(".scrollImgItem").eq(scrollImgExindex).animate({left: "-100%"}, scrollImgDuration);
	$(nameOfClass).find(".scrollImgItem").eq(scrollImgIndex).animate({left: "0"}, scrollImgDuration, function(){
		$(nameOfClass).find(".scrollNum span").eq(scrollImgIndex).addClass("scrollNumActive")
		.siblings().removeClass("scrollNumActive");
	});
}

//滚动图片“上一页“实现
function scrollImgPrev(nameOfClass, scrollImgIndex, scrollImgExindex, scrollImgDuration){
	$(nameOfClass).find(".scrollImgItem").stop(false, true);
	$(nameOfClass).find(".scrollImgItem").eq(scrollImgIndex).css("left", "-100%");
	$(nameOfClass).find(".scrollImgItem").eq(scrollImgExindex).animate({left: "100%"}, scrollImgDuration);
	$(nameOfClass).find(".scrollImgItem").eq(scrollImgIndex).animate({left: "0"}, scrollImgDuration, function(){
		$(nameOfClass).find(".scrollNum span").eq(scrollImgIndex).addClass("scrollNumActive")
		.siblings().removeClass("scrollNumActive");
	});
}

































