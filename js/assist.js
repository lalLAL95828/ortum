/* 功能性辅助小工具 */
define(['require'],function(require){
    let getDetailType= function(obj){
        return Object.prototype.toString.call(obj).slice(8,-1);
    }
    /**
     * 功能：提示1
     */
    let dangerTip = function(text="火速赶制中！！！",time=1000) {
        $('#ortum_tip_content_danger').text(text).show();
        $('.ortum_tip').show();
        setTimeout(function(){
            $('.ortum_tip').hide();
            $('#ortum_tip_content_danger').hide();
        },time)
    }
    /**
     * 功能：提示2
     */
    let infoTip = function(text="一切OK！！！",time=1000) {
        $('#ortum_tip_content_info').text(text).show();
        $('.ortum_tip').show();
        setTimeout(function(){
            $('.ortum_tip').hide();
            $('#ortum_tip_content_info').hide();
        },time)
    }

    /**
     * 功能：实现深copy
     * @param {*} obj 
     */
    let deepClone = function(obj) {
        let type = Object.prototype.toString.call(obj)
        if(type == "[object Array]"){
            let backObj = [];
            for(let val of obj){
                backObj.push(deepClone(val))
            };
            return backObj;
        }
        if(type == "[object Object]"){
            let backObj = {};
            for(let key in obj){
                if(obj.hasOwnProperty(key)){
                    backObj[key] = deepClone(obj[key])
                }
            };
            return backObj;
        }
        return obj;
    }

    /**
     * 功能：实现自定义的JSON.stringify
     * 特点：实现函数转化成string
     * //TODO 以后补充对正则和其他对象的转换
     */
    let jsonStringify = function(obj){
        let type = Object.prototype.toString.call(obj)
        if(type == "[object Object]"){
            let backObj = {};
            for(let key in obj){
                if(obj.hasOwnProperty(key)){
                    let sonType = Object.prototype.toString.call(obj[key])
                    if(sonType == "[object Object]"){//是对象，重新调用该函数
                        backObj[key] = jsonStringify(obj[key])
                    }else if(sonType == "[object Function]"){
                        backObj[key] = obj[key].toString().replace(/\n/g,'').replace(/(\s)+/g," ")
                    }else if(sonType == "[object Array]"){
                        backObj[key] = jsonStringify(obj[key])
                    }else{
                        backObj[key] = obj[key]
                    }
                }
            };
            return JSON.stringify(backObj);
        }
        if(type == "[object Array]"){
            let backObj = [];
            for(let val of obj){
                backObj.push(jsonStringify(val))
            };
            return JSON.stringify(backObj);
        }
        if(type == "[object Function]"){
            return obj.toString().replace(/\n/g,'').replace(/(\s)+/g," ")
        }
        return obj;
    };

    /**
     * 功能：实现自定义的JSON.parse
     * 特点：实现函数转化成parse
     * //TODO 以后补充对正则和其他对象的转换
     */
    let jsonParase = function(str){
        let type = Object.prototype.toString.call(str)
        let arrReg = /^(\s)*?\[([\s\S])*\](\s)*?$/;
        let jsonReg = /^(\s)*?\{([\s\S])*\}(\s)*?$/;
        let funReg = /^(\s)*?function/;

        if(type == "[object String]"){
            if(arrReg.test(str)){
                let newArr = JSON.parse(str)
                return jsonParase(newArr)
            }else if(jsonReg.test(str)){
                let jsonObj = JSON.parse(str);
                return jsonParase(jsonObj)
            }else if(funReg.test(str)){
                return Function('return ' + str)()
            }else{
                return str;
            }
        }
        if(type == "[object Object]"){
            let backObj = {};
            for(let key in str){
                if(str.hasOwnProperty(key)){
                    backObj[key] = jsonParase(str[key])
                }
            };
            return backObj;
        }
        if(type == "[object Array]"){
            let backObj = [];
            for(let val of str){
                backObj.push(jsonParase(val))
            };
            return backObj;
        }
        return str
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

        let delOrtumItem = $(this).parents('.ortum_item').eq(0)
        let nextOrtumItem = delOrtumItem.parent()
        
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
     * 功能：编辑组件的js
     * @param {*} e
     */
    let ortumComponentSetJs = function(e){

        let editOrtumItem = $(this).parents('.ortum_item').eq(0);
        debugger

        /* let delOrtumItem = $(this).parents('.ortum_item').eq(0)
        let nextOrtumItem = delOrtumItem.parent()
        
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
        } */
        return false;
    }


    /**
     * 功能：选中当前正在编辑的组件，进行属性编辑
     * @param {*} e
     */
    let addClickChoose = function(e){
        //已经被选中，不在选中
        if($(this).hasClass('selectedShadow'))return;
        $('*').removeClass('selectedShadow');
        $('#ortum_shadow').remove();

        $(this).addClass('selectedShadow');

        let shadowDiv= $(`
            <div id="ortum_shadow">
            </div>
        `)

        //bootstrap_grid
        if($(this).hasClass('ortum_bootstrap_grid')){
            shadowDiv.append(`
                <span class="iconfont icon-shezhi1  ortum_shadow_bootstrapGrid_settings" title="设置"></span>
             `)
        }
        //bootstrap_radio
        if($(this).hasClass('ortum_bootstrap_radio')){
            shadowDiv.append(`
                <span class="iconfont icon-shezhi1  ortum_shadow_bootstrapRadio_settings" title="设置"></span>
             `)
        }
        //bootstrap_checkbox
        if($(this).hasClass('ortum_bootstrap_checkbox')){
            shadowDiv.append(`
                <span class="iconfont icon-shezhi1  ortum_shadow_bootstrapCheckbox_settings" title="设置"></span>
             `)
        }
        //bootstrap_select
        if($(this).hasClass('ortum_bootstrap_select')){
            shadowDiv.append(`
                <span class="iconfont icon-shezhi1  ortum_shadow_bootstrapSelect_settings" title="设置"></span>
             `)
        }

        shadowDiv.append(`
            <span class="iconfont icon-shanchu  ortum_shadow_deleteImg"  title="删除"></span>
        `)
        shadowDiv.append(`
            <span class="iconfont icon-js  ortum_shadow_editJs"  title="编辑js"></span>
        `)

        $(this).append(shadowDiv)

        //删除按钮绑定事件
        $("#ortum_shadow .ortum_shadow_deleteImg").off('click.delete').on('click.delete',deleteComponent);
        //编辑js按钮绑定事件
        $("#ortum_shadow .ortum_shadow_editJs").off('click.editjs').on('click.editjs',ortumComponentSetJs);

        //radio的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_radio')){
            $("#ortum_shadow .ortum_shadow_bootstrapRadio_settings").off('click.setting').on('click.setting',require('BootStrapRadio').showRadioItems);
        }
        //grid的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_grid')){
            $("#ortum_shadow .ortum_shadow_bootstrapGrid_settings").off('click.setting').on('click.setting',require('BootStrapGrid').showGridItems);
        }
        //checkbox的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_checkbox')){
            $("#ortum_shadow .ortum_shadow_bootstrapCheckbox_settings").off('click.setting').on('click.setting',require('BootStrapCheckbox').showCheckboxItems);
        }
        //select的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_select')){
            $("#ortum_shadow .ortum_shadow_bootstrapSelect_settings").off('click.setting').on('click.setting',require('BootStrapSelect').showSelectOptions);
        }

        
        let properiesObj = $(this).prop('ortum_component_properties')
        let properiesType = $(this).prop('ortum_component_type');

        //还原编辑组件属性的表单状态
        resetSetPropertyCom()
        
        switch(properiesType[0]){
            case 'Bootstrap':
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
    let timestampName = function(type,UUID=true){
        let uuidCode = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        if(UUID){
            return type+"_"+(new Date().getTime() + uuidCode);
        }else{
            return type+"_"+(new Date().getTime());
        }
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
        getDetailType,
        deepClone,
        dangerTip,
        infoTip,
        jsonStringify,
        jsonParase,

        toggleMapArr,
        addClickChoose,
        timestampName,

        resetSetPropertyCom,

    }
})
