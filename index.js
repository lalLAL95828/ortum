function findGloabl(){
    require(['Feature','Global'],function(Feature,Global){
        console.log(Global.ortumComponents);
        console.log(Global.ortumField);
        console.log(Global.ortumItem);
    })
}

let showTipSetTime;//定时器

//初始化提示
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
//菜单栏事件绑定
$('#ortum_table_act').on('click','.iconfont',function(e){
    //导入
    if($(this).hasClass('icon-daoru')){
        $('#ortum_import_file').click();
        return;
    }
    //导出
    if($(this).hasClass('icon-daochu')){
        require(['Feature'],function(Feature){
            Feature.exportFileListen(e)
        })
        return;
    }
    //编辑js
    if($(this).hasClass('icon-js')){
        require([],function(){
            $('#ortum_top_dialog_xl').modal({
                "backdrop":"static",
                // "focus":false,
                "keyboard":false,
            })
            $("#ortum_top_model_xl_content").load("/html/common/codemirror.html",function(){
                $('#ortum_top_model_xl_wait').hide();
            });
        })
        return;
    }

    // console.log(this)
    $('#ortum_tip_content_danger').text("火速赶制中！！！").show()
    $('.ortum_tip').show();
    clearInterval(showTipSetTime)
    showTipSetTime = setTimeout(function(){
        $('.ortum_tip').hide();
        $('#ortum_tip_content_danger').hide()
    },1000)
})



//model弹窗 事件监听
$('#ortum_top_dialog').on('hidden.bs.modal', function (e) {
    $('#ortum_top_model_wait').show();
    $("#ortum_top_model_content").empty();
})

//model弹窗 事件监听
$('#ortum_top_dialog_xl').on('hidden.bs.modal', function (e) {
    $('#ortum_top_model_xl_wait').show();
    $("#ortum_top_model_xl_content").empty();
})


