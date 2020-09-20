require.config({
    // waitSeconds: 500000,
    paths:{
        //用绝对路径更准确，使用相对路径，在相对的其他文件中会引入失败
        // "jquery":"jquery.min",
        "Assist":"/js/assist",
        "Feature":"/js/feature",
        "Config":"/js//config",
        "Global":"/js/global",

        "BootStrapAsider":"/js/bootstrap/asider",
        "BootStrapInput":"/js/bootstrap/input",
        "BootStrapGrid":"/js/bootstrap/grid",
        "CreateDom":"/js/createDom",
    }
})


require(['Feature','Global'],function(Feature,Global){

    //【1】初始化
    Feature.init('ortum');
 
})