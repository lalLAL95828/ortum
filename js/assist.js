/* 功能性辅助小工具 */
define(['require'],function(require){

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
        console.log($(this))
        console.log($(this).parents('.ortum_item'))

        let delOrtumItem = $(this).parents('.ortum_item').eq(0)
        let nextOrtumItem = delOrtumItem.parents('.ortum_item').eq(0)
        
        require('global').ortum_edit_component = null;//清空正在编辑的组件
        $('#ortum_collapseOne .form-group').show();//显示所有的可编辑属性

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

        $(this).append(`
            <div id="ortum_shadow">
                <div class="ortum_shadow_deleteImg"></div>
            </div>
        `)
        $("#ortum_shadow .ortum_shadow_deleteImg").off('click.delete').on('click.delete',deleteComponent);

        //TODO 在参数配置中配置
        let properiesObj = $(this).prop('ortum_component_properties')
        let properiesType = $(this).prop('ortum_component_type')
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

    return {
        toggleMapArr,
        addClickChoose,
        timestampName,
    }
})
