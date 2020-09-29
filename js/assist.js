/* 功能性辅助小工具 */
define(['require'],function(require){
    let getDetailType= function(obj){
        return Object.prototype.toString.call(obj).slice(8,-1);
    }


    /**
     * 功能：实现深copy
     * @param {*} obj 
     */
    let deepClone = function(obj) {
        let type = getDetailType(obj);
        if(["Array","Object"].indexOf(type) == -1)return obj;
        let objClone = (type=='Array') ? [] : {};
        //进行深拷贝的不能为空，并且是对象或者是
        if (obj && ["Array","Object"].indexOf(type) > -1) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] && ["Array","Object"].indexOf(type) > -1) {
                        objClone[key] = deepClone(obj[key]);
                    } else {
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    }


    /**
     * 功能：一个对象转成数组或者一个数组转成对象
     * @param {*} obj 
     * @param {*} key 
     */
    let toggleMapArr = function(obj,key='key'){
        if(Array.isArray(obj)){
            let arr = obj.reduce(function(prev,item){
                return { ...prev,[item[key]]:item}
            },{});
            return arr;
        }else if(obj instanceof Object){
            let obje = Object.values(obj);
            return obje;
        }

        return obj;
    }

    /**
     * 功能：通过点击删除 当前选中的组件(删除第一个有ortum_item类的元素)
     * @param {*} e
     */
    let deleteComponent = function(e){
        // console.log($(this))
        // console.log($(this).parents('.ortum_item'))

        let delOrtumItem = $(this).parents('.ortum_item').eq(0)
        let nextOrtumItem = delOrtumItem.parents('.ortum_item').eq(0)
        
        require('global').ortum_edit_component = null;//清空正在编辑的组件
        

        //还原编辑组件属性的表单状态
        resetSetPropertyCom()

        delOrtumItem.remove();
        //删除后的下一步处理方式
        if(nextOrtumItem){
            //bootstrap的栅格col
            if($(nextOrtumItem).hasClass('ortum_boot_col_default')){
                $(nextOrtumItem).addClass('ortum_boot_col_waitInsert')
                $(nextOrtumItem).append(require('BootStrapAsider').tipAddComponentFn(false))//增加提示语
            };
        }
        return false;
    }


    /**
     * 功能：选中当前正在编辑的组件，进行属性编辑
     * @param {*} e
     */
    let addClickChoose = function(e){
        //已经被选中，不在选中
        if($(this).hasClass('selectedShadow'))return false;
        $('*').removeClass('selectedShadow');
        $('#ortum_shadow').remove();

        //排除grid等待插入中
        if($(this).hasClass('ortum_boot_col_waitInsert'))return false;

        $(this).addClass('selectedShadow');

        let shadowDiv= $(`
            <div id="ortum_shadow">
            </div>
        `)
        //bootstrap_radio
        if($(this).hasClass('ortum_bootstrap_radio')){
            shadowDiv.append(`
                <span class="iconfont icon-shezhi1  ortum_shadow_bootstrapRadio_settings" title="设置"></span>
             `)
        }

        shadowDiv.append(`
            <span class="iconfont icon-shanchu  ortum_shadow_deleteImg"  title="删除"></span>
        `)

        $(this).append(shadowDiv)

        //删除按钮绑定事件
        $("#ortum_shadow .ortum_shadow_deleteImg").off('click.delete').on('click.delete',deleteComponent);
        //radio的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_radio')){
            $("#ortum_shadow .ortum_shadow_bootstrapRadio_settings").off('click.setting').on('click.setting',require('BootStrapRadio').showRadioItems);
        }
        
        let properiesObj = $(this).prop('ortum_component_properties')
        let properiesType = $(this).prop('ortum_component_type');

        //还原编辑组件属性的表单状态
        resetSetPropertyCom()
        
        switch(properiesType[0]){
            case 'bootstrap':
                require('BootStrapAsider').setProperties(properiesObj,properiesType[1],$(this));
                break;
            default:
                break;
        }
        return false;
    }

    /**
     * 功能：创建组件的name时间戳
     * @param {*} e
     */
    let timestampName = function(type){
        return type+"_"+(new Date().getTime());
    }

    /**
     * 功能：还原编辑组件属性的表单元素状态
     */
    let resetSetPropertyCom = function(){
        //清空校验css
        $('#ortum_collapseOne .is-invalid').removeClass('is-invalid')
        //清空值
        $('#ortum_collapseOne input[type=text]').val('')
        $('#ortum_collapseOne input[type=radio]').prop('checked',false)
        $('#ortum_collapseOne input[type=radio]').removeAttr('checked')
        $('#ortum_collapseOne input[type=checkbox]').prop('checked',false)
        $('#ortum_collapseOne input[type=checkbox]').removeAttr('checked')
        $('#ortum_collapseOne input[type=range]').val('');

        //显示
        $('#ortum_collapseOne .form-group').show();
        //可编辑
        $('#ortum_collapseOne .form-group input').removeAttr('disabled')
    }

    return {
        deepClone,

        toggleMapArr,
        addClickChoose,
        timestampName,

        resetSetPropertyCom,
    }
})
