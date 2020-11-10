/* 

设置全局对象

*/

define([],function(){
    /* 全局对象 */
    let ortum_field;//components列表栏
    // let ortum_components;//绘制表单的区域栏
    let ortum_item={};//各个可以拖拽的表单元素
    let ortum_nowDragObj;//现在正在拖动的表单元素
    let ortum_contextMenuObj;//右键点击菜单对象

    let ortum_edit_component;//正在编辑的对象
    let ortum_codemirrorJS_setVal;//设置codemirror的初始值
    let ortum_codemirrorJS_save;//codemirror关闭函数

    let ortum_preview_windowSon;//打开的预览窗口
    let ortum_preview_windowSonUrl;//打开的预览窗口Blob url

    let ortum_createDom_frame = "Bootstrap";//默认创建组件使用的框架
    // {
    //     frame:"bootstrap",
    //     type:'input',
    //     listen:require('BootStrapInput').setInputProperty,
    // }


    return{
        ortumField:ortum_field,
        // ortumComponents:ortum_components,
        ortumItem:ortum_item,
        ortumNowDragObj:ortum_nowDragObj,
        ortumCOntextMenuObj:ortum_contextMenuObj,
        ortum_edit_component:ortum_edit_component,

        ortum_codemirrorJS_setVal:ortum_codemirrorJS_setVal,
        ortum_codemirrorJS_save:ortum_codemirrorJS_save,

        ortum_createDom_frame:ortum_createDom_frame,

        ortum_preview_windowSon:ortum_preview_windowSon,
        ortum_preview_windowSonUrl:ortum_preview_windowSonUrl,
    }
})
