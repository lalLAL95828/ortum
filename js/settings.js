/* 

设置全局属性

*/
define(['assist'],function(Assist){
    let menuListDataJSON;
    let menuListsData = [
    {
        key:"inputDom",
        name:"单行文本",
        useType:"Bootstrap",
        createFn:"createInputDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"rangeInputDom",
        name:"进度选择器",
        useType:"Bootstrap",
        createFn:"createRangeInputDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"textareaDom",
        name:"多行文本",
        useType:"Bootstrap",
        createFn:"createTextareaDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"radioDom",
        name:"单选框",
        useType:"Bootstrap",
        createFn:"createRadioDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"checkDom",
        name:"多选框",
        useType:"Bootstrap",
        createFn:"createCheckboxDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"timerDom",
        name:"时间选择器",
        useType:"Bootstrap",
        createFn:"createTimerDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"dateDom",
        name:"日期选择器",
        useType:"Bootstrap",
        createFn:"createDateDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"scoreDom",
        name:"评分",
        useType:"Bootstrap",
        createFn:"createScoreDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"colorDom",
        name:"颜色选择器",
        useType:"Bootstrap",
        createFn:"createColorDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"selectDom",
        name:"下拉选择框",
        useType:"Bootstrap",
        createFn:"createSelectDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"switchDom",
        name:"开关",
        useType:"Bootstrap",
        createFn:"createSwitchDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"slideDom",
        name:"滑块",
        createFn:"createSlideDom",
        useType:"Bootstrap",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"gridDom",
        name:"栅格布局",
        useType:"Bootstrap",
        createFn:"createGridDom",
        children:{
            "Bootstrap":null,
        },
    },
    ];

    let contextMenuMaxHeight=210;
    let contextMenuWidth=120;

    //可以创建的组件数组转Json
    menuListDataJSON = Assist.toggleMapArr(menuListsData)

    return {
        //可以创建的组件
        menuListsData,
        //右键菜单的最大高度
        contextMenuMaxHeight,
        //右键菜单的宽度
        contextMenuWidth,
        //组件数组转json
        menuListDataJSON,
    }

})
