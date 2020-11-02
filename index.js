//获取location信息，决定编辑状态
$(function(){
    let search = window.location.search;
    search = search.replace(/^(\?)/,'');
    search = search.replace(/(\&)/g,',');
    let searchArr = [];
    let searchObj = {};

    searchArr = search.split(",")
    searchArr.forEach((item)=>{
        if(item){
            let name = item.match(/^\s*(\S)*?\s*(?=[=])/)[0];
            let value = item.match(/(?<=[=])\s*(\S)*?\s*$/)[0];
            searchObj[name] = value;
        }
    })
    //修改表单
    if(searchObj.method && searchObj.method=="editPCTable" && searchObj.formId){
        //修改页面样式
        $("#ortum_table_info .ortum_table_method").eq(0).text("修改").attr("data-method","editPCTable").attr("data-formid",searchObj.formId)
            .removeClass("ortum_newPC_color").addClass("ortum_editPC_color");
        $("#ortum_table_act .ortum_tableAct_icon").removeClass("ortum_newPC_color").addClass("ortum_editPC_color");
        $("body").removeClass("body_bgc_newPC").addClass("body_bgc_editPC");

        //切换新增
        $(".ortum_form_switch").show();
        $(".ortum_form_switch").off("click.switch").on('click.switch',function (e) {
            let sureSwitch = confirm("确定切换成新表单,并使用当前表单的内容吗？");
            if(sureSwitch){
                $("#ortum_table_name").val('');
                $("#ortum_table_code").val('');
                $("#ortum_table_info .ortum_table_method").eq(0).text("新增").attr("data-method","newPCTable").removeAttr("data-formid")
                    .removeClass("data-version")
                    .removeClass("ortum_editPC_color")
                    .addClass("ortum_newPC_color");
                $("#ortum_table_act .ortum_tableAct_icon").removeClass("ortum_editPC_color").addClass("ortum_newPC_color");
                $("body").removeClass("body_bgc_editPC").addClass("body_bgc_newPC");
                $(this).hide().off("click.switch");
            }
        })
    };

})

//getFormContentJson函数的返回值 从数组中获取 name和title数组
function getTitleAndNameFun(arr){
    let nameArr = [];
    let titleArr = [];
    arr.forEach((item,index)=>{
        if(!item.bindComponentName){//该组件没有绑定组件
            nameArr.push(item.name)
            titleArr.push(item.title)
            if(item.children.length > 0){
                let backData = getTitleAndNameFun(item.children);
                nameArr = nameArr.concat(backData.nameArr)
                titleArr = titleArr.concat(backData.titleArr)
            }
        }
    })
    return {
        titleArr:titleArr,
        nameArr:nameArr,
    }
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
        require(['feature'],function(Feature){
            Feature.exportFileListen(e)
        })
        return;
    }
    //新建
    if($(this).hasClass('icon-xinjian')){
        window.open("index.html")
        return;
    }
    //清空
    if($(this).hasClass('icon-qingkong')){
        require(['feature','global'],function(Feature,Global){
            if(!confirm("确定清空吗？")){
                return;
            }
            Global.ortum_edit_component = null;
            $('#ortum_collapseOne .form-group').show();
            $('#ortum_collapseOne input').each(function(){
                if($(this).attr("type")!="checkbox" && $(this).attr("type")!="radio"){
                    $(this).val('');
                }
            })
            $('#ortum_collapseOne textarea').val('');
            $('#ortum_collapseOne input[type=radio]').removeProp("checked");
            $('#ortum_collapseOne input[type=checkbox]').removeProp("checked");
            $('#ortum_collapseOne select').val('');
            $("#ortum_field").empty().addClass("ortum_field_originState").html("<div class='originState'>组件拖拽</div>");
        })
        return;
    }

    //保存
    if($(this).hasClass('icon-baocun')){

        require(['feature','assist','settings'],function(Feature,Assist,Settings){
            let tableName = $("#ortum_table_name").val().trim();
            let tableCode = $("#ortum_table_code").val().trim();
            let actWay = $(".ortum_table_method").eq(0).attr('data-method') || "newPCTable";
            let formId = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-formid") || '';
            let formVersion = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-version") || 1;

            //获取localstore中的信息
            let CATARC_INFO_SYS = window.localStorage.getItem("CATARC_INFO_SYS");
            let account = JSON.parse(CATARC_INFO_SYS).account;
            let usename = JSON.parse(account).usname;

            if(!tableName){
                Assist.dangerTip("表单名称不可为空")
                // alert('表单名称不可为空');
                return;
            }
            if(!tableCode){
                Assist.dangerTip("表单编号不可为空")
                // alert('表单编号不可为空');
                return;
            }
            let ortumJson = Feature.getFormContentJson("id",{id:"ortum_field",HasProperties:true})

            let getTitleAndName =  getTitleAndNameFun(ortumJson)//后端需要的数据
            let titleArr = getTitleAndName.titleArr;
            let nameArr = getTitleAndName.nameArr;

            let ajaxJsom = {
                columnID:nameArr.toString(),
                columnName:titleArr.toString(),
                contentHtml:JSON.stringify(ortumJson),
                editor:"ortum",
                editName:usename,
                editTime:new Date().toLocaleString(),
                formCode:tableCode,
                formName:tableName,
                id:formId,
                version:formVersion*1,
            }
            if(actWay == "newPCTable"){
                ajaxJsom.dataSourceId = '';
                ajaxJsom.delFlag = '0';
                ajaxJsom.formWrite = '0';
            }

            ortumReq({
                "url":"/catarc_infoSys/api/form?_ts=1603870623362",
                "method":Settings.ortum_tableAct[actWay].way,
                "header":{
                    "Content-Type": "application/json; charset=UTF-8",
                },
                "data":JSON.stringify(ajaxJsom),
                "success":(xhr,e)=>{
                    console.log(xhr)
                    console.log(e)
                    if(xhr.status == 200){
                        let response = JSON.parse(xhr.response);
                        console.log(response)
                        response.ok && Assist.infoTip("保存成功")
                        !response.ok && Assist.dangerTip(response.message)
                    }else{
                        Assist.dangerTip("保存失败，状态码为"+xhr.status)
                    }
                },
                "error":(xhr,e)=>{
                    Assist.dangerTip("网络异常，保存失败");
                    console.log(xhr)
                    console.log(e)
                },
            })

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
            });
            $("#ortum_top_model_xl_content").load("html/common/codemirror.html",function(){
                $('#ortum_top_model_xl_wait').hide();
            });
        })
        return;
    }
    //预览
    if($(this).hasClass('icon-yulan')){
        require(['feature'],function(Feature){
            //html方式
            Feature.previewTableHtmlContent("ortum_field")
            //blob方式
            // Feature.previewTableBlobContent("ortum_field")
        })
        return;
    }

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


//关闭或刷新浏览器之前的操作，可以启用一个线程保存到服务器中
window.onbeforeunload = function (e) {
    //发送给后端进行保存数据
    navigator.sendBeacon('http://localhost:3000/Beacon', 'foo=bar');

    e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
        e.returnValue = '请确定所做修改已经保存！';
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return '请确定所做修改已经保存！';
};


