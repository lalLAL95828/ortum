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
        

        "BootStrapAsider":"js/bootstrap/asider",
        "BootStrapInput":"js/bootstrap/input",
        "BootStrapGrid":"js/bootstrap/grid",
        "BootStrapRangeInput":"js/bootstrap/rangeInput",
        "BootStrapRadio":"js/bootstrap/radio",
        "BootStrapCheckbox":"js/bootstrap/checkbox",
        "BootStrapTextarea":"js/bootstrap/textarea",
        "BootStrapFile":"js/bootstrap/file",
        "BootStrapSwitch":"js/bootstrap/switch",
        "BootStrapSelect":"js/bootstrap/select",
        "BootStrapLabel":"js/bootstrap/label",
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
})
require(['feature','assist'],function(Feature,Assist){
    //【1】初始化
    Feature.init('ortum');

    //如果是编辑pc端
    let tableAct_method = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-method")
    let tableAct_formId = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-formid")

    //编辑表单
    if(tableAct_method == "editPCTable" && tableAct_formId){
        ortumReq({
            "url":"/catarc_infoSys/api/form/"+tableAct_formId,
            "method":"GET",
            "success":(xhr,e)=>{
                if(xhr.status == 200 && xhr.response){
                    let response = JSON.parse(xhr.response)
                    if(response.ok){
                        let tableContent = JSON.parse(response.data.contentHtml);
                        console.log(tableContent)
                        console.log(JSON.parse(tableContent[0].componentProperties))

                        $('#ortum_field').removeClass("ortum_field_originState").html('');

                        Feature.JsonPropsRenderDom(tableContent,$("#ortum_field"),"append")

                        // console.log(JSON.parse(response.data.contentHtml))
                    }
                }
                // console.log("成功")
                // console.log(xhr)
                // console.log(e)
            },
            "error":(xhr,e)=>{
                // console.log("失败")
                // console.log(xhr)
                // console.log(e)
            },
        })
    }
})