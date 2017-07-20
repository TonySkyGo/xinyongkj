/**
 * Created by Administrator on 2017/7/19.
 */
//输入密码框效果代码;(支付密码/确认支付密码)
//支付密码
var box = document.getElementsByClassName("zhifumima-possword-zhifu")[0];
//确认支付密码
var box1 = document.getElementsByClassName("zhifumima-possword-zhifu1")[0];
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
            if (((event.keyCode>=48 && event.keyCode<=57)||(event.keyCode>=96 && event.keyCode<=105))){    /*输入0-9*/
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
    var zhifumima_1,zhifumima_2;
    for (var i = 0; i < pawDivCount; i++) {
        n += paw[i].value;
    }
    zhifumima_1=n.substring(0,6);
    zhifumima_2=n.substring(6,12);
    if( zhifumima_1!=zhifumima_2){
        $(".zhifumima-possword-zhifu").find("div.gaimima-icon-ture").attr("class","gaimima-icon-error");
        $(".zhifumima-possword-zhifu1").find("div.gaimima-icon-ture").attr("class","gaimima-icon-error");
        alert("支付密码错误！");
        for (var b = 0; b < pawDivCount; b++) {
            paw[b].value = "";
            pawDiv[0].setAttribute("style", "border: 2px solid deepskyblue;");
            paw[0].readOnly = false;
            paw[0].focus();
            pawDiv[b].setAttribute("style", "border:none");
        }
    }else if( zhifumima_1==zhifumima_2 && zhifumima_1!="" && zhifumima_2!=""){
        $(".zhifumima-possword-zhifu").find("div.gaimima-icon-error").attr("class","gaimima-icon-ture");
        $(".zhifumima-possword-zhifu1").find("div.gaimima-icon-error").attr("class","gaimima-icon-ture");
    }
};
var getPasswordBtn = document.getElementsByClassName("getPasswordBtn")[0];
//getPasswordBtn.addEventListener("click", getPassword);
/*键盘事件*/
document.onkeyup = function (event) {
    if (event.keyCode == "13") {  /*回车事件*/
        getPassword();

    }
};