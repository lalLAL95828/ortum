function switchTableAct(act="edit",settings={}){
    switch (act) {
        case "new":
            $("#ortum_table_name").val('');
            $("#ortum_table_code").val('');
            $("#ortum_table_info .ortum_table_method").eq(0).text("新增")
                .attr("data-method","newPCTable")
                .removeAttr("data-formid")
                .removeAttr("data-version")
                .removeClass("ortum_editPC_color")
                .addClass("ortum_newPC_color");
            $("#ortum_table_act .ortum_tableAct_icon").removeClass("ortum_editPC_color").addClass("ortum_newPC_color");
            $("body").removeClass("body_bgc_editPC").addClass("body_bgc_newPC");
            //切换新增
            $(".ortum_form_switch").hide();
            break;
        case "edit":
            settings.formName && $("#ortum_table_name").val(settings.formName);
            settings.formCode && $("#ortum_table_code").val(settings.formCode);
            $("#ortum_table_info .ortum_table_method").eq(0).text("修改")
                .attr("data-method","editPCTable")
                .attr("data-formid",settings.formId)
                .attr("data-version",settings.version || 0)
                .removeClass("ortum_newPC_color").addClass("ortum_editPC_color");
            $("#ortum_table_act .ortum_tableAct_icon").removeClass("ortum_newPC_color").addClass("ortum_editPC_color");
            $("body").removeClass("body_bgc_newPC").addClass("body_bgc_editPC");
            //切换新增
            $(".ortum_form_switch").show();
            break;
        default:
            break;
    }
};
function showOrtumLoading(show){
    if(show === false){
        $(".ortum_loading").eq(0).css("display","none");
    }else if(show === true){
        $(".ortum_loading").eq(0).css("display","flex");
    }else{
        if($(".ortum_loading").eq(0).css("display") == "none"){
            $(".ortum_loading").eq(0).css("display","flex");
        }else{
            $(".ortum_loading").eq(0).css("display","none");
        }
    }
}

// 绘制区组件替换关闭事件监听
$('#ortum_replaceItem_model').on('hidden.bs.modal', function (e) {
    require(['feature','global'],function(Feature,Global){
        Global.ortum_replace_item = null;
        Global.ortum_active_item = null;
    });
});
// 组件替换
$("#ortum_repalceItemBtn").on("click",function(){
    require(['feature','global'],function(Feature,Global){
        $(Global.ortum_replace_item).eq(0).replaceWith(Global.ortum_active_item);
        Global.ortum_replace_item = null;
        Global.ortum_active_item = null;
        $('#ortum_replaceItem_model').modal('hide');
    });
});
// 组件交换
$("#ortum_exchangeItemBtn").on("click",function(){
    require(['feature','global'],function(Feature,Global){
        $(Global.ortum_replace_item).eq(0).before("<div id='ortum_exchange_tempObj' class='ortum_display_NONE'></div>")
        $(Global.ortum_active_item).eq(0).before(Global.ortum_replace_item);
        $("#ortum_exchange_tempObj").eq(0).replaceWith(Global.ortum_active_item)
        Global.ortum_replace_item = null;
        Global.ortum_active_item = null;
        $('#ortum_replaceItem_model').modal('hide');
    });
});

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
        switchTableAct("edit",{formId:searchObj.formId,version:0})
    };
    //切换新增
    $(".ortum_form_switch").off("click.switch").on('click.switch',function (e) {
        let sureSwitch = confirm("确定切换成新表单,并使用当前表单的内容吗？");
        if(sureSwitch){
            switchTableAct("new");
        }
    });
})



//getFormContentJson函数的返回值 从数组中获取 name和title数组
/*function getTitleAndNameFun(arr){
    let nameArr = [];
    let titleArr = [];
    arr.forEach((item,index)=>{
        if(!item.bindComponentName){//该组件没有绑定组件
            if(item.name){
                //只处理form组件
                if(item.componentKey && require("settings").menuListDataJSON[item.componentKey].sort === "form"){
                    nameArr.push(item.name)
                    titleArr.push(item.title)
                }else if(item.childrenType==="choose"){
                    nameArr.push(item.name)
                    titleArr.push(item.title)
                };
                if(item.children.length){
                    let backData = getTitleAndNameFun(item.children);
                    nameArr = nameArr.concat(backData.nameArr)
                    titleArr = titleArr.concat(backData.titleArr)
                }
            }
        }
    })
    return {
        titleArr:titleArr,
        nameArr:nameArr,
    };
}*/

let showTipSetTime;//定时器

//初始化提示
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
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
            // Feature.exportFileListen(e);
            Feature.exportJsonFileListen(e);
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
            };

            Global.ortum_edit_component=undefined;//正在编辑的对象
            Global.ortum_codemirrorJS_setVal=undefined;;//设置codemirror的初始值
            Global.ortum_codemirrorJS_save=undefined;;//codemirror关闭函数
        
            Global.ortum_preview_windowSon=undefined;;//打开的预览窗口
            Global.ortum_preview_windowSonUrl=undefined;;//打开的预览窗口Blob url
        
            Global.ortum_life_function=undefined;;//全局生命周期json
            Global.ortum_life_json={};//参数json

            $('#ortum_collapseOne .form-group').show();
            $('#ortum_collapseOne input').each(function(){
                if($(this).attr("type")!="checkbox" && $(this).attr("type")!="radio"){
                    $(this).val('');
                }
            });
            $('#ortum_collapseOne textarea').val('');
            $('#ortum_collapseOne input[type=radio]').removeProp("checked");
            $('#ortum_collapseOne input[type=checkbox]').removeProp("checked");
            $('#ortum_collapseOne select').val('');
            $("#ortum_field").empty();
            $("#originState").removeClass("originStateHide");
        })
        return;
    }

    //保存
    if($(this).hasClass('icon-baocun')){
        require(['feature','assist','settings','global'],function(Feature,Assist,Settings,Global){
            let tableName = $("#ortum_table_name").val().trim();
            let tableCode = $("#ortum_table_code").val().trim();
            let actWay = $(".ortum_table_method").eq(0).attr('data-method') || "newPCTable";
            let formId = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-formid") || '';
            let formVersion = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-version") || 0;

            if(!tableName){
                Assist.dangerTip("表单名称不可为空")
                return;
            }
            if(!tableCode){
                Assist.dangerTip("表单编号不可为空")
                return;
            }
            let ortumJson = Feature.getFormContentJson("id",{id:"ortum_field",HasProperties:true});
            let ortumJS = Global.ortum_life_function;
            let ortumSet = Global.ortum_life_json;
            let ortumCss = Global.ortum_life_Css;


            let getTitleAndName =  Feature.getTitleAndNameFun(ortumJson)//后端需要的数据

            let titleArr = getTitleAndName.titleArr;
            let nameArr = getTitleAndName.nameArr;
            // console.log(ortumJson);
            // console.log(nameArr)
            // console.log(titleArr)
            // debugger;
            // return;

            showOrtumLoading(true);

            //获取localstore中的信息
            let CATARC_INFO_SYS = window.localStorage.getItem("CATARC_INFO_SYS");
            let account = JSON.parse(CATARC_INFO_SYS).account;
            let usename = JSON.parse(account).usname;
            let ajaxJsom = {
                columnID:nameArr.toString(),
                columnName:titleArr.toString(),
                contentHtml:JSON.stringify({
                    ortumJson:ortumJson,
                    ortumJS:ortumJS,
                    ortumSet:ortumSet,
                    ortumCss:ortumCss,
                }),
                editor:"ortum",
                editName:usename,
                editTime:new Date().toLocaleString(),
                formCode:tableCode,
                formName:tableName,
                id:formId,
                version:formVersion*1 + 1,
            }
            if(actWay == "newPCTable"){
                ajaxJsom.dataSourceId = '';
                ajaxJsom.delFlag = '0';
                ajaxJsom.formWrite = '0';
            }

            //有formID时 校验版本号
            formId && axios.get("/catarc_infoSys/api/form/"+formId)
                .then(function (res) {
                    if(res.data.ok){
                        if((res.data.data.version)*1 > formVersion*1 ){
                            Assist.dangerTip("当前版本号小于数据库的版本号！")
                            return Promise.reject({"noShowTip":true})
                        }else{
                            return axios.put("/catarc_infoSys/api/form?_ts="+(new Date()).getTime(),ajaxJsom)
                        }
                    }else{
                        Assist.dangerTip(res.data.message)
                    }
                })
                .then(function(res){
                    if(res.data.ok){
                        Assist.infoTip("保存成功");
                        //更新版本号和formId
                        $("#ortum_table_info .ortum_table_method").eq(0).attr("data-version",res.data.data.version);
                    }else{
                        Assist.dangerTip(res.data.message)
                    }
                    showOrtumLoading(true);
                })
                .catch(function (error) {
                    if(!error || !error.noShowTip){
                        Assist.dangerTip("保存失败");
                    }
                    console.error(error);
                }).finally(function () {
                    showOrtumLoading(false);
                });
            //无formID时 不检查版本号
            !formId && axios.post("/catarc_infoSys/api/form?_ts="+(new Date()).getTime(),ajaxJsom)
                .then(function(res){
                    if(res.data.ok){
                        Assist.infoTip("保存成功");
                        //切换为编辑
                        switchTableAct("edit",{formName:res.data.data.formName,formCode:res.data.data.formCode,formId:res.data.data.id,version:res.data.data.version})
                    }else{
                        Assist.dangerTip(res.data.message);
                    }
                })
                .catch(function (error) {
                    console.error(error);
                    Assist.dangerTip("保存失败");
                }).finally(function () {
                    showOrtumLoading(false);
                });
            /*ortumReq({
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
            })*/
        })
        return;
    }
    //编辑js
    if($(this).hasClass('icon-js')){
        require(["global"],function(Global){
            $('#ortum_top_dialog_xl').modal({
                "backdrop":"static",
                // "focus":false,
                "keyboard":false,
            });
            let funStr = "";

            if(Global.ortum_life_function){
                //函数字符串
                funStr = "var ortum_life_function={beigin_function:"+ Global.ortum_life_function.beigin_function.toString() +",completed_function:"+ Global.ortum_life_function.completed_function.toString() +",submit_function:"+ Global.ortum_life_function.submit_function.toString() +"};";
            }else{
                funStr = "var ortum_life_function={beigin_function:function(){},completed_function:function(){},submit_function:function(){},};";
            }

            if(Global.ortum_life_json){
                funStr += "/*表单参数配置*/\nvar ortum_life_json=" + JSON.stringify(Global.ortum_life_json) +";";
            }
            //格式化
            funStr = js_beautify(funStr,2);
            
            Global.ortum_codemirrorJS_setVal = function(codeObj){
                codeObj.setValue(`/*函数名请勿编辑，只需编辑函数体内容\nbeigin_function函数是dom渲染前会执行的函数\ncompleted_function函数是dom渲染后会执行的函数*/\n${funStr}
                `)
            };
            Global.ortum_codemirrorJS_save = function(val){
                let packer = new Packer;
                let valFormat = packer.pack(val, 0, 0); 
                try{
                    eval(valFormat);
                    Global.ortum_life_function = {};
                    Global.ortum_life_function.beigin_function=ortum_life_function.beigin_function.toString().replace(/\n/g,'').replace(/(\s)+/g," ");
                    Global.ortum_life_function.completed_function=ortum_life_function.completed_function.toString().replace(/\n/g,'').replace(/(\s)+/g," ");
                    Global.ortum_life_function.submit_function=ortum_life_function.submit_function.toString().replace(/\n/g,'').replace(/(\s)+/g," ");
                    Global.ortum_life_json = ortum_life_json;
                }catch(err){
                    console.error("编辑有勿！")
                }
               
            };
            $("#ortum_top_model_xl_content").load("html/common/codemirror.html",function(){
                $('#ortum_top_model_xl_wait').hide();
            });
        })
        return;
    }


    //编辑css
    if($(this).hasClass('icon-css1')){
        require(["global",'assist'],function(Global,Assist){
            $('#ortum_top_dialog_xl').modal({
                "backdrop":"static",
                // "focus":false,
                "keyboard":false,
            });
            let cssStr = "";

            if(Global.ortum_life_Css){
                cssStr = Assist.actCssCoder.format(Global.ortum_life_Css);
            }

            Global.ortum_codemirrorCSS_setVal = function(codeObj){
                codeObj.setValue(`/*****编辑CSS*****/\n` + cssStr);
            };
            Global.ortum_codemirrorCSS_save = function(val){
                let packCss = Assist.actCssCoder.pack(val);
                Global.ortum_life_Css = packCss;
            };
            $("#ortum_top_model_xl_content").load("html/common/codemirrorCss.html",function(){
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
    // navigator.sendBeacon('http://localhost:3000/Beacon', 'foo=bar');

    e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
        e.returnValue = '请确定所做修改已经保存！';
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return '请确定所做修改已经保存！';
};


