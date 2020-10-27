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
require(['feature'],function(Feature){
    //【1】初始化
    Feature.init('ortum');
})