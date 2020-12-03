/* 功能性辅助小工具 */
define(['require'],function(require){
    /**
     * 处理css代码
     * @type {{format: (function(*): *), pack: (function(*): *)}}
     */
    let actCssCoder = {
        format: function (s) {//格式化代码
            s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
            s = s.replace(/;\s*;/g, ";"); //清除连续分号
            s = s.replace(/\,[\s\.\#\d]*{/g, "{");
            s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
            s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
            s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
            if ($("#chk").prop("checked")) {
                s = s.replace(/(\r|\n|\t)/g, "");
                s = s.replace(/(})/g, "$1\r\n");
            }
            return s;
        },
        pack: function (s) {//压缩代码
            s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
            s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
            s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
            s = s.replace(/;\s*;/g, ";"); //清除连续分号
            s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
            return (s == null) ? "" : s[1];
        }
    };

    /**
     * 获取uuid
     * @returns {string}
     */
    let getUUId = function() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

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
        },time);
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
        let parentDom = delOrtumItem.parent();
        
        require('global').ortum_edit_component = null;//清空正在编辑的组件
        
        //还原编辑组件属性的表单状态
        resetSetPropertyCom();

        delOrtumItem.remove();
        //删除后的下一步处理方式
        if(parentDom.length){
            //bootstrap的td
            if($(parentDom).hasClass('ortum_bootstrap_td')){
                require("BootstrapTable").sonOrtumItemDelete(parentDom);
            };
        };

        return false;
    }


    /**
     * 功能：编辑组件的js
     * @param {*} e
     */
    let ortumComponentSetJs = function(e){
        let editOrtumItem = $(this).parents('.ortum_item').eq(0);
        let ortum_component_properties = editOrtumItem.prop("ortum_component_properties");
        let ortum_component_type = editOrtumItem.prop("ortum_component_type");

        //首字母大写
        let s = ortum_component_type[1].slice(0,1).toUpperCase();
        let h = ortum_component_type[1].slice(1);

        // require(ortum_component_type[0] + s + h).ortumComponentSetJs();

        $('#ortum_top_dialog_xl').modal({
            "backdrop":"static",
            "keyboard":false,
        });
        require('global').ortum_codemirrorJS_setVal = require(ortum_component_type[0] + s + h).ortumComponentSetJs;
        require('global').ortum_codemirrorJS_save = require(ortum_component_type[0] + s + h).ortumComponentSaveJs;
        $("#ortum_top_model_xl_content").load("html/common/codemirror.html",function(){
            $('#ortum_top_model_xl_wait').hide();
        });
        return false;
    }

    /**
     * 功能：编辑组件的js
     * @param {*} e
     */
    let ortumComponentSetAttr = function(e){
        let editOrtumItem = $(this).parents('.ortum_item').eq(0);
        let ortum_component_properties = editOrtumItem.prop("ortum_component_properties");
        let ortum_component_type = editOrtumItem.prop("ortum_component_type");

        //首字母大写
        let s = ortum_component_type[1].slice(0,1).toUpperCase();
        let h = ortum_component_type[1].slice(1);

        $('#ortum_top_dialog').modal({
            "backdrop":"static",
            "keyboard":false,
        });

        if(require(ortum_component_type[0] + s + h).ortumComponentSetAttrs){
            require('global').ortum_attributesArr_setVal = require(ortum_component_type[0] + s + h).ortumComponentSetAttrs;
        }else{
            require('global').ortum_attributesArr_setVal = ortumComponentSetAttrs
        }
        if(require(ortum_component_type[0] + s + h).ortumComponentSaveAttrs){
            require('global').ortum_attributesArr_save = require(ortum_component_type[0] + s + h).ortumComponentSaveAttrs;
        }else{
            require('global').ortum_attributesArr_save = ortumComponentSaveAttrs;
        }

        $("#ortum_top_model_content").load("html/common/attributesArr.html",function(){
            $('#ortum_top_model_wait').hide();
        });
        return false;
    };

    /**
     * 功能: 设置标签属性
     */
    let ortumComponentSetAttrs = function (tableDom,addBtn) {
        if(!require('global').ortum_edit_component || !require('global').ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =require('global').ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        let attributesArr = evenProperties.data.attributesArr;
        if(Array.isArray(attributesArr)){
            attributesArr.forEach(function(item,index){
                if(index){$(addBtn).click();}
                let trDom = tableDom.find('.ortum_order_dataTr').eq(index);
                trDom && trDom.find(".ortum_attr_label").eq(0).val(item.label)
                trDom && trDom.find(".ortum_attr_value").eq(0).val(item.value)
            })
        };
    }
    /**
     * 功能: 保存标签属性
     */
    let ortumComponentSaveAttrs = function (valueArr) {
        if(!require('global').ortum_edit_component || !require('global').ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =require('global').ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        let attributesArr = evenProperties.data.attributesArr;
        let name = evenProperties.data.name;
        let componentDom = $(globalComponent).find("*[name="+name+"]");
        let oldKeyArr = [];
        let newKeyArr = [];
        if(Array.isArray(attributesArr)){
            attributesArr.forEach(function(item){
                oldKeyArr.push(item.label)
            });
        }
        if(Array.isArray(valueArr)){
            valueArr.forEach(function(item){
                newKeyArr.push(item.label)
            });
        }
        //删除被清除的属性
        oldKeyArr.forEach(function(item){
            if(newKeyArr.indexOf(item) === -1){
                componentDom.removeAttr(item);
            }
        })
        //修改编辑的属性
        valueArr.forEach(function(item){
            componentDom.attr(item.label,item.value);
        });
        //绑定到组件属性上
        evenProperties.data.attributesArr = valueArr;
    };





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
            <div id="ortum_shadow" draggable="true">
            </div>
        `);
        //绑定拖拽事件
        componentsBindDrag(shadowDiv);

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
        //bootstrap_table
        if($(this).hasClass('ortum_bootstrap_table')){
            shadowDiv.append(`
                <span class="iconfont icon-shezhi1  ortum_shadow_bootstrapTable_settings" title="设置"></span>
             `)
        }


        shadowDiv.append(`
            <span class="iconfont icon-js  ortum_shadow_editJs"  title="编辑js"></span>
        `)
        shadowDiv.append(`
            <span class="iconfont icon-duixiangshuxingObjectAttributes18  ortum_shadow_editAttrs"  title="编辑属性"></span>
        `)

        shadowDiv.append(`
            <span class="iconfont icon-shanchu  ortum_shadow_deleteImg"  title="删除"></span>
        `)

        $(this).append(shadowDiv)

        //删除按钮绑定事件
        $("#ortum_shadow .ortum_shadow_deleteImg").off('click.delete').on('click.delete',deleteComponent);
        //编辑js按钮绑定事件
        $("#ortum_shadow .ortum_shadow_editJs").off('click.editjs').on('click.editjs',ortumComponentSetJs);
        //编辑属性按钮绑定事件
        $("#ortum_shadow .ortum_shadow_editAttrs").off('click.editAttrs').on('click.editAttrs',ortumComponentSetAttr);

        //radio的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_radio')){
            $("#ortum_shadow .ortum_shadow_bootstrapRadio_settings").off('click.setting').on('click.setting',require('BootstrapRadio').showRadioItems);
        }
        //grid的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_grid')){
            $("#ortum_shadow .ortum_shadow_bootstrapGrid_settings").off('click.setting').on('click.setting',require('BootstrapGrid').showGridItems);
        }
        //checkbox的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_checkbox')){
            $("#ortum_shadow .ortum_shadow_bootstrapCheckbox_settings").off('click.setting').on('click.setting',require('BootstrapCheckbox').showCheckboxItems);
        }
        //select的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_select')){
            $("#ortum_shadow .ortum_shadow_bootstrapSelect_settings").off('click.setting').on('click.setting',require('BootstrapSelect').showSelectOptions);
        }
        //table的设置按钮绑定事件
        if($(this).hasClass('ortum_bootstrap_table')){
            $("#ortum_shadow .ortum_shadow_bootstrapTable_settings").off('click.setting').on('click.setting',require('BootstrapTable').setTableColumns);
        }

        let properiesObj = $(this).prop('ortum_component_properties')
        let properiesType = $(this).prop('ortum_component_type');

        //还原编辑组件属性的表单状态
        resetSetPropertyCom()
        
        switch(properiesType[0]){
            case 'Bootstrap':
                require('BootstrapAsider').setProperties(properiesObj,properiesType[1],$(this));
                break;
            default:
                break;
        }
        return false;
    }
    /**
     * 功能：给可拖拽组件添加事件
     *  */
    let componentsBindDrag = function(ele){
        $(ele).on("dragstart",function (e) {
            $(this).addClass("ortum_componentsDragStyle");
            require("global").ortumNowDragObj = $(this).parents(".ortum_item").eq(0);
            //e.dataTransfer.setData("dragTarget",this);//不能存储对象，因为会进行toString转化
        });
        $(ele).on("dragend",function (e) {
            $(this).removeClass("ortum_componentsDragStyle");
            require("global").ortumNowDragObj = null;
            require("feature").ortumDragShadow(e,"dragend",{That:this});
        });
    };

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
        actCssCoder,
        getUUId,

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

        componentsBindDrag,
    }
})
