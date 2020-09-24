require.config({
    // waitSeconds: 500000,
    baseUrl:"/js",
    paths:{
        //用绝对路径更准确，使用相对路径，在相对的其他文件中会引入失败
        // "jquery":"jquery.min",
        // "Assist":"/js/assist",
        // "Feature":"/js/feature",
        // "Settings":"/js/settings",
        // "Global":"/js/global",

        "BootStrapAsider":"bootstrap/asider",
        "BootStrapInput":"bootstrap/input",
        "BootStrapGrid":"bootstrap/grid",
        "CreateDom":"createDom",
    },
    shim:{},//给不规则AMD格式插件使用
    map:{//配置版本
       
    },
})
require(['feature'],function(Feature){
    //【1】初始化
    Feature.init('ortum');
})