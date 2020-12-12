require.config({
    waitSeconds: 50000000,
    // baseUrl:"/js",
    paths:{
        //用绝对路径更准确，使用相对路径，在相对的其他文件中会引入失败
        // "jquery":"jquery.min",

        "assist":"js/assist",
        "global":"js/global",
        "createDom":"js/createDom",
        "settings":"js/settings",
        "feature":"js/feature",


        "BootstrapButton":"js/bootstrap/button",
        "BootstrapH":"js/bootstrap/h",
        "BootstrapIconButton":"js/bootstrap/iconButton",
        "BootstrapButtonGroup":"js/bootstrap/buttonGroup",
        "BootstrapAsider":"js/bootstrap/asider",
        "BootstrapInput":"js/bootstrap/input",
        "BootstrapGrid":"js/bootstrap/grid",
        "BootstrapMultiGrid":"js/bootstrap/multiGrid",
        "BootstrapRangeInput":"js/bootstrap/rangeInput",
        "BootstrapRadio":"js/bootstrap/radio",
        "BootstrapCheckbox":"js/bootstrap/checkbox",
        "BootstrapTextarea":"js/bootstrap/textarea",
        "BootstrapFile":"js/bootstrap/file",
        "BootstrapSwitch":"js/bootstrap/switch",
        "BootstrapSelect":"js/bootstrap/select",
        "BootstrapLabel":"js/bootstrap/label",
        "BootstrapDate":"js/bootstrap/date",
        "BootstrapTable":"js/bootstrap/table",
        "BootstrapNewTable":"js/bootstrap/newTable",
        "BootstrapCustomHtml":"js/bootstrap/customHtml",

        "CSS":"lib/css.min",

        "setCodemirror":"js/setCodemirror",
    },
    // shim:{
    //     "JSHINT":{
    //         exports: '/lib/jshint'
    //     }

    // },//给不规则AMD格式插件使用
    // map:{//配置版本映射
    //     '*': {
    //         'css': '/lib/css.min.js',
    //     },

    // },
    deps:["CSS"],//版本依赖,
    packages: [{
        name: "codemirror",
        location: "lib/codeMirror",
        main: "lib/codemirror"
    }],
});

require(['feature','assist','global'],function(Feature,Assist,Global){
    //【1】初始化
    Feature.init('ortum');

    //如果是编辑pc端
    let tableAct_method = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-method")
    let tableAct_formId = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-formid")

    //编辑表单
    if(tableAct_method == "editPCTable" && tableAct_formId){
        // 为给定 ID 的 user 创建请求
        axios.get("/catarc_infoSys/api/form/"+tableAct_formId)
            .then(function (res) {
                if(res.data.ok){
                    let tableContent = JSON.parse(res.data.data.contentHtml);
                    $("#ortum_table_name").val(res.data.data.formName);
                    $("#ortum_table_code").val(res.data.data.formCode);
                    $("#ortum_table_info .ortum_table_method").eq(0).attr("data-version",res.data.data.version);
                    //清空编辑区域
                    $('#ortum_field').html('');
                    $("#originState").addClass("ortum_display_NONE");

                    Feature.JsonPropsRenderDom(tableContent.ortumJson,$("#ortum_field"),"append");
                    Global.ortum_life_json = tableContent.ortumSet;
                    Global.ortum_life_function = tableContent.ortumJS;
                    Global.ortum_life_Css = tableContent.ortumCss;
                };
            })
            .catch(function (error) {
                console.error(error);
            });

        /*ortumReq({
            "url":"/catarc_infoSys/api/form/"+tableAct_formId,
            "method":"GET",
            "success":(xhr,e)=>{
                if(xhr.status == 200 && xhr.response){
                    let response = JSON.parse(xhr.response)
                    if(response.ok){
                        let tableContent = JSON.parse(response.data.contentHtml);
                        $("#ortum_table_name").val(response.data.formName);
                        $("#ortum_table_code").val(response.data.formCode);
                        $("#ortum_table_info .ortum_table_method").eq(0).attr("data-version",response.data.version)
                        $("#ortum_field").empty();
                        $("#originState").addClass("ortum_display_NONE");
                        Feature.JsonPropsRenderDom(tableContent,$("#ortum_field"),"append")
                    }
                }
            },
            "error":(xhr,e)=>{

            },
        })*/
    }
})