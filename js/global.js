define([],function(){
    /* 全局对象 */
    let ortum_field;//components列表栏
    let ortum_components;//绘制表单的区域栏
    let ortum_item={};//各个可以拖拽的表单元素
    let ortum_nowDragObj;//现在正在拖动的表单元素
    let ortum_contextMenuObj;//右键点击菜单对象

    let ortum_edit_component;//正在编辑的对象
    // {
    //     frame:"bootstrap",
    //     type:'input',
    //     listen:require('BootStrapInput').setInputProperty,
    // }

    return{
        ortumField:ortum_field,
        ortumComponents:ortum_components,
        ortumItem:ortum_item,
        ortumNowDragObj:ortum_nowDragObj,
        ortumCOntextMenuObj:ortum_contextMenuObj,
        ortum_edit_component:ortum_edit_component,
    }
})
