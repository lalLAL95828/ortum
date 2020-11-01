/* 

设置全局属性

*/
define(['assist'],function(Assist){
    let menuListDataJSON;
    let menuListsData = [
    {
        key:"inputDom",
        name:"单行文本",
        createFn:"createInputDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"rangeInputDom",
        name:"进度选择器",
        createFn:"createRangeInputDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"textareaDom",
        name:"多行文本",
        createFn:"createTextareaDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"radioDom",
        name:"单选框",
        createFn:"createRadioDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"checkboxDom",
        name:"多选框",
        createFn:"createCheckboxDom",
        children:{
            "Bootstrap":null,
        },
    },
    /*{
        key:"timerDom",
        name:"时间选择器",
        createFn:"createTimerDom",
        children:{
            "Bootstrap":null,
        },
    },*/
    {
        key:"dateDom",
        name:"日期选择器",
        createFn:"createDateDom",
        children:{
            "Bootstrap":null,
        },
    },
    /*{
        key:"scoreDom",
        name:"评分",
        createFn:"createScoreDom",
        children:{
            "Bootstrap":null,
        },
    },*/
    /*{
        key:"colorDom",
        name:"颜色选择器",
        createFn:"createColorDom",
        children:{
            "Bootstrap":null,
        },
    },*/
    {
        key:"selectDom",
        name:"下拉选择框",
        createFn:"createSelectDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"switchDom",
        name:"开关",
        createFn:"createSwitchDom",
        children:{
            "Bootstrap":null,
        },
    },
    /*{
        key:"slideDom",
        name:"滑块",
        createFn:"createSlideDom",
        children:{
            "Bootstrap":null,
        },
    },*/
    {
        key:"fileDom",
        name:"文件上传",
        createFn:"createFileDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"gridDom",
        name:"栅格布局",
        createFn:"createGridDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"labelDom",
        name:"标签",
        createFn:"createLabelDom",
        children:{
            "Bootstrap":null,
        },
    },
    ];

    let contextMenuMaxHeight=210;
    let contextMenuWidth=120;

    //可以创建的组件数组转Json
    menuListDataJSON = Assist.toggleMapArr(menuListsData)

    let ortum_tableAct = {
        "newPCTable":{
            name:"新增表单",
            simpleName: "新增",
            way:"POST",
        },
        "editPCTable":{
            name:"编辑表单",
            simpleName:"编辑",
            way:"PUT",
        },
    };

    return {
        //可以创建的组件
        menuListsData,
        //右键菜单的最大高度
        contextMenuMaxHeight,
        //右键菜单的宽度
        contextMenuWidth,
        //组件数组转json
        menuListDataJSON,

        //表单操作
        ortum_tableAct,
    }

})
