/**
 * Created by Administrator on 2017/7/17.
 */
$(document).ready(function() {
    //选择查询时间
    $("#time-date a").click(function(){
        $("#time-date a").attr("class","");
        $(this).attr("class","color-hover");
    })

    //选项卡切换功能
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
            $("#zhifumima-input-text").find("input").eq(0).focus();
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
    phone.focus();
    phone.blur(function(){
        inputfun();
    });
    phone.keyup(function(event){
        console.log(event.keyCode);
        if (((event.keyCode>=48 && event.keyCode<=57)||(event.keyCode>=96 && event.keyCode<=105))){
            //$(this).maxLength(11);
            return;
        }else if (event.keyCode == "13"){
            inputfun();
        }
    });
    function inputfun() {
        var inputtext=phone.val();
        if(inputtext==haoma){
            $("#zhifumima-input-text").find("input:text").next("input").focus();
            phone.removeClass("icon-error");
            phone.removeClass("icon-null");
            phone.addClass("icon-ture");
        }else if(inputtext!=haoma){
            phone.removeClass("icon-ture");
            phone.removeClass("icon-null");
            phone.addClass("icon-error");
            phone.val("");
        }
    }
    //手机验证码
    var yanzhengma="1234567";
    var phoneyanzheng=$("#zhifumima-input-text").find("input#phoneyanzheng");
    phoneyanzheng.blur(function(){
        var inputtext=$(this).val();
        if(inputtext==yanzhengma){
            $(this).removeClass("icon-null");
            $(this).removeClass("icon-error");
            $(this).addClass("icon-ture");
        }else if(inputtext!=yanzhengma){
            $(this).removeClass("icon-ture");
            $(this).removeClass("icon-null");
            $(this).addClass("icon-error");
            $(this).val("");
        }
    });
    phoneyanzheng.keyup(function(event){
        console.log(event.keyCode);
        if (((event.keyCode>=48 && event.keyCode<=57)||(event.keyCode>=96 && event.keyCode<=105))){
            $(this).maxLength(7);
        }else if (event.keyCode == "13"){
            var inputtext=$(this).val();
            if(inputtext==yanzhengma){
                $("#zhifumima-input-text").find("input:text").next().next("input").focus();
                $(this).removeClass("icon-error");
                $(this).removeClass("icon-null");
                $(this).addClass("icon-ture");
            }else if(inputtext!=yanzhengma){
                $(this).removeClass("icon-ture");
                $(this).removeClass("icon-null");
                $(this).addClass("icon-error");
                $(this).val("");
            }
        }
    });
    //身份证号码验证
    var shenfenzheng="123456789123456789";
    var card=$("#zhifumima-input-text").find("input#card");
    card.blur(function(){
        shenfenzhenfun();
    });
    card.keyup(function(event){
        console.log(event.keyCode);
        if (((event.keyCode>=48 && event.keyCode<=57)||(event.keyCode>=96 && event.keyCode<=105))){
            //$(this).maxLength(18);
            return;
        }else if (event.keyCode == "13"){
            shenfenzhenfun();
        }
    });
    function shenfenzhenfun(){
        var inputtext=card.val();
        if(inputtext==shenfenzheng){
            $(".zhifumima-possword").find("input:password").focus();
            card.removeClass("icon-error");
            card.removeClass("icon-null");
            card.addClass("icon-ture");
        }else if(inputtext!=shenfenzheng){
            card.removeClass("icon-ture");
            card.removeClass("icon-null");
            card.addClass("icon-error");
            card.val("");
        }
    }
    //“运费模版”添加“运送到”空行

    //添加“为指定地区城市设置运费”包裹记重行
    var htmlval='<tr id="modeltr"><td class="model-td1"><input type="checkbox" class="areacheck" name="area"><div class="model-area">未添加地区</div><div class="model-edit">编辑</div></td><td class="model-td2"><input type="text" class="model-input"></td><td class="model-td2"><input type="text" class="model-input"></td><td class="model-td2"><input type="text" class="model-input"></td><td class="model-td2"><input type="text" class="model-input"></td><td class="model-td3"><span class="model-delete" id="model-delete" onclick="modeldelete(this)">删除</span></td></tr>';
    //添加“为指定地区城市设置运费”选择运送方式行
    var htmlvals='<tr><td class="model-td1"><input type="checkbox" class="areacheck" name="area"><div class="model-area">未添加地区</div><div class="model-edit">编辑</div></td><td class="model-td2 model-vet"><select class="model-select" id="model-select"><option value="1">申通</option><option value="2">韵达</option><option value="3">中通</option></select></td><td class="model-td2"><p class="model-express" id="getselectval">申通快递</p></td><td class="model-td4 model-vet" colspan="2"  id="selectdataval"><select class="model-select" id="model-selectdata"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select><div class="model-full"><span class="model-full-word">满</span><input type="text" class="model-input model-input-unit" id="selectdataval"><span class="model-unit">件</span>包邮</div></td><td class="model-td3"><span class="model-delete"  onclick="modeldeletes(this)">删除</span></td></tr>';
    //添加一行
    $("#model-add").click(function () {
        $("#modelnull").find("tr").eq(0).after(htmlval);
    });
    $("#model-adds").click(function () {
        $("#modelnulls").find("tr").eq(0).after(htmlvals);
    });
    //批量删除
    $("#model-alldel").click(function () {
        var idval=$("table#modelnull");
        piliangdel(idval);
    }) ;
    $("#model-alldels").click(function () {
        var idval=$("table#modelnulls");
        piliangdel(idval);
    });
    function piliangdel(a){
        $("input:checked.areacheck").each(function() {
            var n = $(this).parents("tr").index();
            a.find("tr:eq("+n+")").remove();
        });
    }
    //.......
   // 选择快递
    $(document).on("change", "select#model-select", function () {
        var ctext=$(this).find("option:selected").text();
        $(this).parent().parent().find("td p#getselectval").html(ctext+"快递");
    })
    //选择“件”数
    $(document).on("change", "select#model-selectdata", function () {
        var ctext=$(this).find("option:selected").text();
        $(this).parent().find("div input#selectdataval").val(ctext);
    })
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
    var xinmima_1,xinmima_2;
    for (var i = 0; i < pawDivCount; i++) {
        n += paw[i].value;
    }
    xinmima_1=n.substring(6,12);
    xinmima_2=n.substring(12,20);
    if(xinmima_1!=xinmima_2){
        $(".zhifumima-possword-box1").find("div").eq(0).attr("class","gaimima-icon-error");
        $(".zhifumima-possword-box2").find("div").eq(0).attr("class","gaimima-icon-error");
        alert("设置密码不一致！");
        for (var b = 0; b < pawDivCount; b++) {
            paw[b].value = "";
            pawDiv[0].setAttribute("style", "border: 2px solid deepskyblue;");
            paw[0].readOnly = false;
            paw[0].focus();
            pawDiv[b].setAttribute("style", "border:none");
        }
    }else if(xinmima_1==xinmima_2 && xinmima_1!="" && xinmima_2!=""){
        $(".zhifumima-possword-box1").find("div").eq(0).attr("class","gaimima-icon-ture");
        $(".zhifumima-possword-box2").find("div").eq(0).attr("class","gaimima-icon-ture");
    }
};

/*判断旧密码是否正确*/
paw[5].onkeyup=function(){
    var m = "";
    var yuanmima;
    for (var i = 0; i < pawDivCount; i++) {
        m += paw[i].value;
    }
    yuanmima=m.substring(0,6);
    if(paw[5].value.length>=1){
        if(yuanmima==123456){
            $(".zhifumima-possword-box").find("div").eq(0).attr("class","gaimima-icon-ture");
            changeDiv();
        }else{
            $(".zhifumima-possword-box").find("div").eq(0).attr("class","gaimima-icon-error");
            for (var b = 0; b < pawDivCount; b++) {
                paw[b].value = "";
                pawDiv[0].setAttribute("style", "border: 2px solid deepskyblue;");
                paw[0].readOnly = false;
                paw[0].focus();
                pawDiv[b].setAttribute("style", "border:none");
            }

        }

    }
}

var getPasswordBtn = document.getElementsByClassName("getPasswordBtn")[0];
getPasswordBtn.addEventListener("click", getPassword);
/*键盘事件*/
document.onkeyup = function (event) {
    if (event.keyCode == "13") {  /*回车事件*/
        getPassword();
    }
};













