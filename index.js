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

    // console.log(this)
    $('#ortum_tip_content').text("火速赶制中！！！")
    $('.ortum_tip').show();
    clearInterval(showTipSetTime)
    showTipSetTime = setTimeout(function(){
        $('.ortum_tip').hide();
    },1000)
})


