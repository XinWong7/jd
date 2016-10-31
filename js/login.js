// JavaScript Document

$(document).ready(function(){
	//placeholder IE
	$('input[placeholder]').placeholder().css({
		'color': '#333'
	});

	//账户登录时，检查是否自动登录
	checkIfAutoLogin();

	//清空“用户名”，“密码”输入框
	$(".inputName").val("");
	$(".inputPassword").val("");

	//点击“扫码登录“
	$(".loginBtnScan").click(function(){
		$(".accountLogin").css("display", "none");
		$(".loginBtnAccount").removeClass("loginTypeActive");
		$(".scaneLogin").css("display", "block");
		$(".loginBtnScan").addClass("loginTypeActive");
		showQrcodeAndScan();
		setTimeout(showQrcodeOnly, 4000);
	});

	//点击“账户登录“
	$(".loginBtnAccount").click(function(){
		$(".accountLogin").css("display", "block");
		$(".loginBtnAccount").addClass("loginTypeActive");
		$(".scaneLogin").css("display", "none");
		$(".loginBtnScan").removeClass("loginTypeActive");
		//账户登录时，检查是否自动登录
		checkIfAutoLogin();
	});

	//扫码登录时
	$(".qrcodeLine").hover(function(){
		//鼠标进入二维码区域
		showQrcodeAndScan();
	}, function(){
		//鼠标离开二维码区域
		showQrcodeOnly();
	});

	//点击“自动登录“
	$("#idAutoLogin").click(checkIfAutoLogin);

	//“用户名”、“密码”输入框获得焦点
	$(".inputNameLine").focusin(function(){
		$(this).addClass("inputNameLineActive").removeClass("inputNameLineError");
		$(".inputNameIcon").addClass("inputNameIconActive").removeClass("inputNameIconError");
	});
	$(".inputPasswordLine").focusin(function(){
		$(this).addClass("inputPasswordLineActive").removeClass("inputPasswordLineError");
		$(".inputPasswordIcon").addClass("inputPasswordIconActive").removeClass("inputPasswordIconError");
	});
	
	//“用户名”、“密码”输入框失去焦点
	$(".inputNameLine").focusout(function(){
		$(this).removeClass("inputNameLineActive");
		$(".inputNameIcon").removeClass("inputNameIconActive");
	});
	$(".inputPasswordLine").focusout(function(){
		$(this).removeClass("inputPasswordLineActive");
		$(".inputPasswordIcon").removeClass("inputPasswordIconActive");
	});

	//“用户名”、“密码”输入框值改变
	$("#inputNameId").bind("input propertychange", function(){
		$(".inputTextDelete01").css("visibility", "visible");
	});
	$("#inputPasswordId").bind("input propertychange", function(){
		$(".inputTextDelete02").css("visibility", "visible");
	});

	//点击”用户名“、”密码“输入框后边的”x”时清空输入框
	$(".inputTextDelete01").click(function(){
		$(".inputName").val("");
		$(this).css("visibility", "hidden");
		$(".inputNameLine").trigger("focusin");
		$(".inputName").trigger("focus");
	})
	$(".inputTextDelete02").click(function(){
		$(".inputPassword").val("");
		$(this).css("visibility", "hidden");
		$(".inputPasswordLine").trigger("focusin");
		$(".inputPassword").trigger("focus");
	})

	//点击”登录“时检查输入框
	$("form#formLogin").submit(function(){
		$(".loginBtn").val("正在登录...");
		var inputNameText = $(".inputName").val();
		var inputPasswordText = $(".inputPassword").val();
		if(!inputNameText && !inputPasswordText){
			//没有输入用户名和密码
			$(".loginError").html("<span class='loginErrorIcon'></span>请输入用户名和密码").css({visibility: "visible", zIndex: "10"});
			$("loginTips").css("zIndex", "1");
			$(".loginBtn").val("登    录");
			$(".inputNameLine").addClass("inputNameLineError");
			$(".inputNameIcon").addClass("inputNameIconError");
			$(".inputPasswordLine").addClass("inputPasswordLineError");
			$(".inputPasswordIcon").addClass("inputPasswordIconError");
			return false;
		}
		if( !inputNameText ){
			//没有输入用户名
			$(".loginError").html("<span class='loginErrorIcon'></span>请输入用户名").css({visibility: "visible", zIndex: "10"});
			$("loginTips").css("zIndex", "1");
			$(".inputNameLine").addClass("inputNameLineError");
			$(".inputNameIcon").addClass("inputNameIconError");
			$(".loginBtn").val("登    录");
			return false;
		}
		if( !inputPasswordText ){
			//没有输入密码
			$(".loginError").html("<span class='loginErrorIcon'></span>请输入密码").css({visibility: "visible", zIndex: "10"});
			$("loginTips").css("zIndex", "1");
			$(".inputPasswordLine").addClass("inputPasswordLineError");
			$(".inputPasswordIcon").addClass("inputPasswordIconError");
			$(".loginBtn").val("登    录");
			return false;
		}
		return true;
	});
});	//end of ready

//扫码登录时，显示二维码和扫一扫
function showQrcodeAndScan(){
	$(".qrcodeImg").stop(true, true);
	$(".qrcodeImg").animate({left: "0"}, 300, function(){
		$(".scanImg").css("visibility", "visible");
	});
}

//扫码登录时，只显示二维码
function showQrcodeOnly(){
	$(".qrcodeImg").stop(true, false);
	$(".qrcodeImg").animate({left: "63px"}, 300);
	$(".scanImg").css("visibility", "hidden");
}

//账户登录时，检查是否自动登录
function checkIfAutoLogin(){
	var ifAutoLogin = $("#idAutoLogin").is(':checked');
	if(ifAutoLogin){
		//自动登录，显示安全提示
		$(".loginTips").css({visibility: "visible", zIndex: "10"});
		$(".loginError").css("zIndex", "1");
	}else{
		//不是自动登录，隐藏安全提示
		$(".loginTips").css("visibility", "hidden");
	}
}
