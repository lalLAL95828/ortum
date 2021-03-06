/* 

设置全局属性

*/
define(['assist'],function(Assist){
    let menuListDataJSON;
    let menuListsData = [
    {
        key:"inputDom",
        sort:"form",
        name:"单行文本",
        createFn:"createInputDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"rangeInputDom",
        sort:"form",
        name:"进度选择器",
        createFn:"createRangeInputDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"textareaDom",
        name:"多行文本",
        sort:"form",
        createFn:"createTextareaDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"radioDom",
        name:"单选框",
        sort:"form",
        createFn:"createRadioDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"checkboxDom",
        name:"多选框",
        sort:"form",
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
        sort:"form",
        name:"日期选择器",
        createFn:"createDateDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"buttonDom",
        sort:"form",//表单组件
        name:"按钮",
        createFn:"createButtonDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"hDom",
        name:"标题",
        sort:"decorate",//修饰组件
        createFn:"createHDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"iconButtonDom",
        name:"图标按钮",
        sort:"form",//表单组件
        createFn:"createIconButtonDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"buttonGroupDom",
        name:"按钮组",
        sort:"layout",//布局组件
        createFn:"createButtonGroupDom",
        children:{
            "Bootstrap":null,
        },
    },
    /*{
        key:"scoreDom",
        sort:"form",
        name:"评分",
        createFn:"createScoreDom",
        children:{
            "Bootstrap":null,
        },
    },*/
    /*{
        key:"colorDom",
        sort:"form",
        name:"颜色选择器",
        createFn:"createColorDom",
        children:{
            "Bootstrap":null,
        },
    },*/
    {
        key:"selectDom",
        name:"下拉选择框",
        sort:"form",
        createFn:"createSelectDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"switchDom",
        name:"开关",
        sort:"form",
        createFn:"createSwitchDom",
        children:{
            "Bootstrap":null,
        },
    },
    /*{
        key:"slideDom",
        name:"滑块",
        sort:"form",
        createFn:"createSlideDom",
        children:{
            "Bootstrap":null,
        },
    },*/
    {
        key:"fileDom",
        name:"文件上传",
        sort:"form",
        createFn:"createFileDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"customHtmlDom",
        name:"自定义组件",
        sort:"super",
        createFn:"createCustomHtmlDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"tableDom",
        name:"表格[待删除]",
        sort:"layout",
        createFn:"createTableDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"newTableDom",
        name:"表格",
        sort:"layout",
        createFn:"createNewTableDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"gridDom",
        name:"单行栅格",
        sort:"layout",
        createFn:"createGridDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"multiGridDom",
        name:"多行栅格",
        sort:"layout",
        createFn:"createMultiGridDom",
        children:{
            "Bootstrap":null,
        },
    },
    {
        key:"labelDom",
        name:"标签",
        sort:"decorate",//修饰组件
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
