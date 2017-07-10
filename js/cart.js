/**
 * Created by Administrator on 2017/7/8.
 */
//价钱计算
function calTotal(){
    var total=0;
    $(".cart-check:checked").each(function(){
        var price=parseFloat($(this).parents(".valid").find(".cart-price").html());
        total+=price;
    });
    $(".all-price").text(total.toFixed(2));
}

//购买数量增加
function plus(obj) {
    var count =parseInt(obj.siblings(".cart-num").val())+1;
    obj.siblings(".cart-num").val(count);
    var price=parseFloat(obj.parents(".valid").find(".single-price").text());
    var all=price*count;
    obj.parents(".valid").find(".cart-price").html(all.toFixed(2));
}

//购买数量减少
function minus(obj) {
    var count =parseInt(obj.siblings(".cart-num").val())-1;
    if(count<1){
        count = 1;
    }
    obj.siblings(".cart-num").val(count);
    var price=parseFloat(obj.parents(".valid").find(".single-price").text());
    var all=price*count;
    obj.parents(".valid").find(".cart-price").html(all.toFixed(2));
}

//运费计算
function calFreight() {
    var all = 0;
    $(".cart-container").each(function () {
        if($(this).find(".cart-check:checked").length>0){
            var freight = $(this).find(".freight-price").text();
            if(freight){
                all += parseFloat(freight);
                all = parseFloat(all);
            }
        }
    });
    var price = parseFloat($(".all-price").text());
    all += price;
    $(".all-price").text(all.toFixed(2));

}

$(function () {
//        移除购物车
    $(".cart-delete").on('click',function (e) {
        e.preventDefault();
        $(".overlay").show();
    });
    //全选
    $("input[name='checkall']").on("click",function(){
        var state = $(this).prop("checked");
        $("input[type='checkbox']").each(function () {
            $(this).prop("checked",state);
        });
        calTotal();
        calFreight();
    });
    //部分全选
    $("input[name='checkpart']").on("click",function(){
        var allCount = 0; //全选：计算相邻元素已选个数，达到个数则全选，反之取消全选
        if($(this).prop("checked")){
            $(this).parents(".cart-container").find("input[name='carcheck']").prop("checked",true);//店铺内的商品全选
            $(this).parents(".container").find("input[name='checkpart']").each(function () {
                if($(this).prop("checked")){
                    allCount++;
                }
            });
            if(allCount == $(this).parents(".container").find(".cart-container").length){
                $("input[name='checkall']").prop("checked",true);//全选
            }
        }else{
            $("input[name='checkall']").prop("checked",false);//取消全选
            $(this).parents(".cart-container").find("input[name='carcheck']").prop("checked",false);//店铺内的商品全选
        }
        calTotal();
        calFreight();
    });
    //单选
    $("input[name='carcheck']").on("click",function(){
        var count = 0; //单个店铺全选：计算相邻元素已选个数，达到个数则全选，反之取消全选
        var totalCount = 0; //全选：计算相邻元素已选个数，达到个数则全选，反之取消全选
        if($(this).prop("checked")){
            //单个店铺全选
            $(this).parents(".cart-table").find("input[name='carcheck']").each(function () {
                if($(this).prop("checked")){
                    count++;
                }
            });
            if(count == $(this).parents(".cart-table").find(".valid").length){
                $(this).parents(".cart-container").find("input[name='checkpart']").prop("checked",true);//全选
            }
            //所有全选
            $(this).parents(".container").find("input[name='checkpart']").each(function () {
                if($(this).prop("checked")){
                    totalCount++;
                }
            });
            if(totalCount == $("input[name='checkpart']").length){
                $("input[name='checkall']").prop("checked",true);//全选
            }
        }else{
            $("input[name='checkall']").prop("checked",false);//取消全选
            $(this).parents(".cart-container").find("input[name='checkpart']").prop("checked",false);//单个店铺取消全选
        }
        calTotal();
        calFreight();
    });

    //input只能输入数字
    $(".cart-num").on("keyup",function () {
        $(this).val($(this).val().replace(/\D/g,''));
    });

    //数量增加
    $(".cart-plus").on("click",function () {
        plus($(this));
        calTotal();
        calFreight();
    });
    //数量减少
    $(".cart-minus").on("click",function () {
        minus($(this));
        calTotal();
        calFreight();
    });
});