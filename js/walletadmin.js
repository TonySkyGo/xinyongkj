/**
 * Created by Administrator on 2017/7/17.
 */
$(function() {
    $("#wallet-tab a.center-state-btn").click(function() {
       $("#wallet-tab a.center-state-btn").removeClass("color-hover");
       $(this).addClass("color-hover");
       var ind=$(this).index();
       $("#balance-table table").hide();
       $("#balance-table table").eq(ind/2).show();
    });

    //密码重置/修改
    $("#zhifumima-reset").bind("click",function(){
        if($(this).attr("class")=="icon-down"){
            $(this).attr("class","icon-up");
        }
        if($(this).attr("class")=="icon-up"){
            $(this).attr("class","icon-down");
            $("#zhifumima-input-text").find("input").val("");
        }
    });
    $("#zhifumima-change").bind("click",function(){
        if($(this).attr("class")=="icon-down"){
            $(this).attr("class","icon-up");
        }
    });

    //判断输入内容
    //手机判断
    var haoma="12345678998"
    var phone=$("#zhifumima-input-text").find("input#phone");
    phone.keyup(function(event){
        console.log(event.keyCode);
        if (((event.keyCode>=48 && event.keyCode<=57)||(event.keyCode>=96 && event.keyCode<=105))){
            $(this).maxLength(11);
        }else if (event.keyCode == "13"){
            var inputtext=$(this).val();
            if(inputtext==haoma){
                $(this).removeClass("icon-error");
                $(this).addClass("icon-ture");
            }else if(inputtext!=haoma){
                $(this).removeClass("icon-ture");
                $(this).addClass("icon-error");
                $(this).val("");
            }
        }else {
            $(this).val("");
        }
    })
    //手机验证码

});

//获取手机验证码倒计时
var countdown=60;
function settime(obj) {
    if (countdown == 0) {
        obj.setAttribute("onclick","settime(this)");
        obj.removeAttribute("disabled");
        obj.innerHTML="重新获取验证码";
        obj.className="getcode";
        countdown = 60;
        return;
    } else {
        obj.setAttribute("disabled", true);
        obj.className="getsecond";
        obj.removeAttribute("href");
        obj.removeAttribute("onclick");
        obj.innerHTML= countdown + "s";
        countdown--;
    }
    setTimeout(function() {
            settime(obj) }
        ,1000)
}

//输入密码框效果代码;(原支付密码/新支付密码/确认支付密码)
//原支付密码
var box = document.getElementsByClassName("zhifumima-possword-box")[0];
//新支付密码
var box1 = document.getElementsByClassName("zhifumima-possword-box1")[0];
//确认支付密码
var box2 = document.getElementsByClassName("zhifumima-possword-box2")[0];
function createDIV(num) {
    for (var i = 0; i < num; i++) {
        var pawDiv = document.createElement("div");
        pawDiv.className = "pawDiv";
        box.appendChild(pawDiv);
        var paw = document.createElement("input");
        paw.type = "password";
        paw.className = "paw";
        paw.maxLength = "1";
        paw.readOnly = "readonly";
        pawDiv.appendChild(paw);
    }
    for (var i = 0; i < num; i++) {
        var pawDiv = document.createElement("div");
        pawDiv.className = "pawDiv";
        box1.appendChild(pawDiv);
        var paw = document.createElement("input");
        paw.type = "password";
        paw.className = "paw";
        paw.maxLength = "1";
        paw.readOnly = "readonly";
        pawDiv.appendChild(paw);
    }
    for (var i = 0; i < num; i++) {
        var pawDiv = document.createElement("div");
        pawDiv.className = "pawDiv";
        box2.appendChild(pawDiv);
        var paw = document.createElement("input");
        paw.type = "password";
        paw.className = "paw";
        paw.maxLength = "1";
        paw.readOnly = "readonly";
        pawDiv.appendChild(paw);
    }
}
createDIV(6);
var pawDiv = document.getElementsByClassName("pawDiv");
var paw = document.getElementsByClassName("paw");
var pawDivCount = pawDiv.length;
/*设置第一个输入框默认选中*/
pawDiv[0].setAttribute("style", "border: 2px solid deepskyblue;");
paw[0].readOnly = false;
paw[0].focus();
/*绑定pawDiv点击事件*/
function func() {
    for (var i = 0; i < pawDivCount; i++) {
        pawDiv[i].addEventListener("click", function () {
            pawDivClick(this);
        });
        paw[i].onkeyup = function (event) {
            console.log(event.keyCode);
            if ((event.keyCode>=48 && event.keyCode<=57)||(event.keyCode>=96 && event.keyCode<=105))  {    /*输入0-9*/
                changeDiv();
                //errorPoint.style.display = "none";
            } else if (event.keyCode == "8") {    /*退格回删事件*/
                firstDiv();
            } else if (event.keyCode == "13") {    /*回车事件*/
                getPassword();
                for (var b = 0; b < pawDivCount; b++) {
                    paw[b].value = "";
                    pawDiv[0].setAttribute("style", "border: 2px solid deepskyblue;");
                    paw[0].readOnly = false;
                    paw[0].focus();
                    pawDiv[b].setAttribute("style", "border:none");
                }
            } else {    /*输入非0-9*/
                this.value = "";
            }
        };
    }
}
func();
/*定义pawDiv点击事件*/
var pawDivClick = function (e) {
    for (var i = 0; i < pawDivCount; i++) {
        pawDiv[i].setAttribute("style", "border:none");
    }
    e.setAttribute("style", "border: 2px solid deepskyblue;");
};
/*定义自动选中下一个输入框事件*/
var changeDiv = function () {
    for (var i = 0; i < pawDivCount; i++) {
        if (paw[i].value.length == "1") {   /*处理当前输入框*/
            //paw[i].blur();
            /*处理上一个输入框*/
            paw[i + 1].focus();
            paw[i + 1].readOnly = false;
            pawDivClick(pawDiv[i + 1]);
        }
    }
};
/*回删时选中上一个输入框事件*/
var firstDiv = function () {
    for (var i = 0; i < pawDivCount; i++) {
        console.log(i);
        if (paw[i].value.length == "0") {   /*处理当前输入框*/
            console.log(i);
            //paw[i].blur();
            /*处理上一个输入框*/
            paw[i - 1].focus();
            paw[i - 1].readOnly = false;
            paw[i - 1].value = "";
            pawDivClick(pawDiv[i - 1]);
            break;
        }
    }
};
/*获取输入密码*/
var getPassword = function () {
    var n = "";
    var yuanmima,xinmima_1,xinmima_2;
    for (var i = 0; i < pawDivCount; i++) {
        n += paw[i].value;
    }
    yuanmima=n.substring(0,6);
    xinmima_1=n.substring(6,12);
    xinmima_2=n.substring(12,20);
    if(yuanmima==123456){
        $(".zhifumima-possword-box").find("div.gaimima-icon-ture").show();
    }
    if(yuanmima!=123456 && xinmima_1!=xinmima_2){
        $(".zhifumima-possword-box").find("div.gaimima-icon-ture").attr("class","gaimima-icon-error");
        $(".zhifumima-possword-box1").find("div.gaimima-icon-ture").attr("class","gaimima-icon-error");
        $(".zhifumima-possword-box2").find("div.gaimima-icon-ture").attr("class","gaimima-icon-error");
        alert("原支付密码错误或设置密码不一致！");
        for (var b = 0; b < pawDivCount; b++) {
            paw[b].value = "";
            pawDiv[0].setAttribute("style", "border: 2px solid deepskyblue;");
            paw[0].readOnly = false;
            paw[0].focus();
            pawDiv[b].setAttribute("style", "border:none");
        }
    }else if(yuanmima==123456 && xinmima_1==xinmima_2 && xinmima_1!="" && xinmima_2!=""){
        $(".zhifumima-possword-box").find("div.gaimima-icon-error").attr("class","gaimima-icon-ture");
        $(".zhifumima-possword-box1").find("div.gaimima-icon-error").attr("class","gaimima-icon-ture");
        $(".zhifumima-possword-box2").find("div.gaimima-icon-error").attr("class","gaimima-icon-ture");
    }
};
var getPasswordBtn = document.getElementsByClassName("getPasswordBtn")[0];
getPasswordBtn.addEventListener("click", getPassword);
/*键盘事件*/
document.onkeyup = function (event) {
    if (event.keyCode == "13") {  /*回车事件*/
        getPassword();
    }
};