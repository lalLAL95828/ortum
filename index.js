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

//getPreviewContentJson函数的返回值 从数组中获取 name和title数组
function getTitleAndNameFun(arr){
    let nameArr = [];
    let titleArr = [];
    arr.forEach((item,index)=>{
        nameArr.push(item.name)
        titleArr.push(item.title)

        if(item.children.length > 0){
            let backData = getTitleAndNameFun(item.children);
            nameArr = nameArr.concat(backData.nameArr)
            titleArr = titleArr.concat(backData.titleArr)
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
    //保存
    if($(this).hasClass('icon-baocun')){
        require(['feature','assist','settings'],function(Feature,Assist,Settings){
            let tableName = $("#ortum_table_name").val().trim();
            let tableCode = $("#ortum_table_code").val().trim();
            let actWay = $(".ortum_table_method").eq(0).attr('data-method') || "newPCTable";
            let formId = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-formid") || '';
            let formVersion = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-version") || 1

            if(!tableName){
                Assist.dangerTip("表单名称不可为空")
                return;
            }
            if(!tableCode){
                Assist.dangerTip("表单编号不可为空")
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
                // editName:"系统管理员",
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
        //1.提取数据
        // columnID,
        // columnName,
        // contentHtml,
        // dataSourceId:"",
        // delFlag:"0",
        // editName,"系统管理员"
        // editTime,"2020-10-28"
        // formCode,
        // formName:
        // formWrite:"0"
        // id:"",
        // version:"1"






        //2.分类数据

        //3.验证数据

        //4.保存接口

        //保存接口
        /*form.on('submit(btnSave_form)', function (data) {
            // 获取表单数据
            var d = data.field;
            var formContent = ADCFormDesignHelper.ParsingForm(ADCFormDesign.getContent());
            // 判断是编辑还是新增
            // 设置不同的 HTTP 方法，和提示信息
            if (d.type === 'add') {
                var ajaxType = 'POST',
                    ajaxName = '新增';
                d.dataSourceId = '';
                d.delFlag = '0';
                d.formWrite = '0';
                d.version = '1';
            } else if (d.type === 'edit') {
                var ajaxType = 'PUT',
                    ajaxName = '编辑';
                d.version++;
            }else if (d.type === 'edit_mobile') {
                var ajaxType = 'PUT',
                    ajaxName = '移动端编辑';
                if(layui.jquery('input[name="switch"]').next().hasClass('layui-form-onswitch')){
                    d.formWrite = '1'
                }else{
                    d.formWrite = '0'
                }
                d.version++;
            }
            var columnIDArray = [],
                columnNameArray = [];
            for (var i = 0; i < formContent.fields.length; i++) {
                var tmp = formContent.fields[i];
                columnIDArray.push(tmp.name);
                columnNameArray.push(tmp.title);
            }
            d.columnID = columnIDArray.join(',');
            d.columnName = columnNameArray.join(',');
            d.type != 'edit_mobile'?d.contentHtml = formContent.content:d.contentHtmlMob = formContent.content;//移动端传contentHtmlMob字段;其它情况传contentHtml
            d.editTime = new Date().toLocaleString();
            d.editName = config.getAccount().usname;
            delete d.type;
            layer.confirm(d.columnName.split(',').join(' | ') + '<br/>（如果疏漏，请修改后再保存）', {
                icon: 3,
                title: '请确认当前已有的控件名称！'
            }, function (index) {
                // 发送请求
                admin.req('/api/form', d, function (data) {
                    if (data.ok) {
                        layer.msg(ajaxName + '表单成功！', {
                            icon: 1
                        });
                        panelControl('close');
                    } else {
                        return layer.msg(ajaxName + '表单失败：' + data.message, {
                            icon: 5
                        });
                    }
                }, {
                    method: ajaxType
                },ADCFormJS.addApplogFn(d.formName+d.formCode,ajaxName+"表单",""));
                layer.close(index);
            });
        });*/

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


