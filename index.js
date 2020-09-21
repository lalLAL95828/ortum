function findGloabl(){
    require(['Feature','Global'],function(Feature,Global){
        console.log(Global.ortumComponents);
        console.log(Global.ortumField);
        console.log(Global.ortumItem);
    })
}

//监听到form中有值改变
// $('#ortum_component_propertiesForm').change(function(){
// })

require(['Global'],function(Global){
     //默认值
    $('#ortum_property_defaultVal').on('input',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('defaultVal',$(this).val())
    })
    //校验
    $('#ortum_property_verification').on('input',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('verification',$(this).val())
    })
    //权限
    $('input[name=ortum_property_authority]').on('click',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('authority',$(this).val())
    })
    //placeholder
    $('#ortum_property_placeholder').on('input',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('placeholder',$(this).val())
    })
    //css类
    $('#ortum_property_cssClass').on('input',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('cssClass',$(this).val())
    })
    //隐藏label
    $('input[name=ortum_property_hideLabel]').on('click',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('hideLabel',$(this).val())
    })
    //label位置
    $('input[name=ortum_property_labelPosition]').on('click',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('labelPosition',$(this).val())
    })
    //label名称
    $('#ortum_property_labelName').on('input',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('labelName',$(this).val())
    })
    //label宽度
    $('#ortum_property_labelWidth').on('input',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('labelWidth',$(this).val())
    })
    //labelCss
    $('#ortum_property_labelCSS').on('input',function(){
        Global.ortum_edit_component && Global.ortum_edit_component.listen('labelCSS',$(this).val())
    })   
})


