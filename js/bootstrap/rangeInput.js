define(["require","assist","CreateDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            defaultVal:20,//默认值
            max:100,//范围最大值
            step:1,
            min:0,
            verification:"",//校验
            authority:"3",//权限
            // placeholder:"请输入",
            cssClass:"form-control-range col-10",//css类
            hideLabel:false,//是否隐藏标签
            labelName:"名称",//标签名称
            labelPosition:"rowLeft",//标签位置
            labelCSS:"col-form-label col-2",//标签css类
        },
        purview:{//属性编辑权限{1:不可见,2:仅读,3:可编辑,4:必填}
            id:3,//id
            name:2,
            defaultVal:3,
            max:3,
            step:3,
            min:3,
            verification:3,
            authority:3,//权限
            // placeholder:3,
            cssClass:3,//css类
            hideLabel:3,//是否隐藏标签
            labelName:3,//标签名称
            labelPosition:3,//标签位置
            labelCSS:3,//标签css类
        },
        inputChange:["id","name","defaultVal","max","min","step","verification","cssClass","labelName","labelCSS"],//input事件修改值
        clickChange:["authority","hideLabel","labelPosition"],
        verify:{//编辑属性时的验证
            max:{
                blur:function(globalComponent,e,val){
                    //获取要编辑的组件的属性
                    let ortum_component_properties = $(globalComponent).prop('ortum_component_properties');
                    //修改前的值
                    let oldData = ortum_component_properties.data;

                    if(val*1 <= oldData.min*1){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('最大范围不能小于等于最小范围')
                        $(e.target).val(oldData.max*1);
                        $(globalComponent).find('input.form-control-range').eq(0).attr('max',oldData.max*1)
                        return true;
                    }
                    if(val*1 < oldData.defaultVal*1){
                        $(e.target).addClass('is-invalid')
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('最大范围不能小于默认值')
                        $(e.target).val(oldData.max*1);
                        $(globalComponent).find('input.form-control-range').eq(0).attr('max',oldData.max*1)
                        return true;
                    }

                    $(e.target).removeClass('is-invalid')
                },
            },
            min:{
                blur:function(globalComponent,e,val){
                    //获取要编辑的组件的属性
                    let ortum_component_properties = $(globalComponent).prop('ortum_component_properties');
                    //修改前的值
                    let oldData = ortum_component_properties.data;

                    if(val*1 >= oldData.max*1){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('最小范围不能大于等于最大范围')
                        $(e.target).val(oldData.min*1);
                        $(globalComponent).find('input.form-control-range').eq(0).attr('min',oldData.min*1)
                        return true;
                    }
                    if(val*1 > oldData.defaultVal*1){
                        $(e.target).addClass('is-invalid')
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('最小范围不能大于默认值')
                        $(e.target).val(oldData.min*1);
                        $(globalComponent).find('input.form-control-range').eq(0).attr('min',oldData.min*1)
                        return true;
                    }

                    $(e.target).removeClass('is-invalid')
                },
            },
            defaultVal:{
                blur:function(globalComponent,e,val){
                    //获取要编辑的组件的属性
                    let ortum_component_properties = $(globalComponent).prop('ortum_component_properties');
                    //修改前的值
                    let oldData = ortum_component_properties.data;

                    if(val*1 > oldData.max*1){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('默认值不能大于最大值')
                        $(e.target).val(oldData.defaultVal);
                        $(globalComponent).find('input.form-control-range').eq(0).attr('value',oldData.defaultVal*1)
                        $(globalComponent).find('input.form-control-range').eq(0).val(oldData.defaultVal*1)
                        return true;
                    }
                    if(val*1 < oldData.min){
                        $(e.target).addClass('is-invalid')
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('默认值不能小于最小值')
                        $(e.target).val(oldData.defaultVal*1);
                        $(globalComponent).find('input.form-control-range').eq(0).attr('value',oldData.defaultVal*1)
                        $(globalComponent).find('input.form-control-range').eq(0).val(oldData.defaultVal*1)
                        return true;
                    }

                    $(globalComponent).find('input.form-control-range').eq(0).val(val);

                    $(e.target).removeClass('is-invalid')
                },
            }
        }
    }
    /**
     * 功能：创建bootstrap的input
     * @param {]} parentDom 
     */
    let RangeInputDom = function(parentDom){
        let outerDom=$(
            `
            <div class="form-group ortum_item row" style="margin:0;padding-bottom:0.8rem">
            </div>
            `
        );
        //点击事件，修改属性
        $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);
        
        let ortum_component_properties =Assist.deepClone(component_properties);

        ortum_component_properties.data.name = Assist.timestampName('rangeInput');//设定name

        $(outerDom).append($(`
            <label class="${ortum_component_properties.data.labelCSS}">${ortum_component_properties.data.labelName}</label>
            <input type="range" class="${ortum_component_properties.data.cssClass}" 
                value="${ortum_component_properties.data.defaultVal}"
                style="padding:0"
                min="${ortum_component_properties.data.min}"
                step="${ortum_component_properties.data.step}"
                max="${ortum_component_properties.data.max}" name="${ortum_component_properties.data.name}">
        `))

        $(outerDom).prop('ortum_component_properties',ortum_component_properties)
        $(outerDom).prop('ortum_component_type',['bootstrap','rangeInput']);

        $(parentDom).append(outerDom);
    }
    

    /**
     * 功能：input事件，在这个事件上重置组件属性
     * @param {*} property 
     * @param {*} val 
     * @param {*} e 
     */
    let inputSetProperties = function(property,that,e){
        let val=$(that).val();
        let checked=$(that).prop('checked');

        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        
        //判断值是否合理
        let vertifyPause = evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]["input"] && evenProperties.verify[property]["input"](globalComponent,e,val);
        if(vertifyPause){
            return false;
        }

        switch(property){
            case "defaultVal":
                $(globalComponent).find('input.form-control-range').eq(0).attr('value',val)
                $(globalComponent).find('input.form-control-range').eq(0).val(val)
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "cssClass":
                // $(globalComponent).find('input.form-control-range').eq(0).addClass(val)
                $(globalComponent).find('input.form-control-range').eq(0).attr('class',evenProperties.cssClass+" " + val)
                break; 
            case "labelName":
                $(globalComponent).find('label').eq(0).text(val)
                break; 
            case "labelCSS":
                // $(globalComponent).find('label').eq(0).addClass(val)
                $(globalComponent).find('label').eq(0).attr('class',val)
                break;  
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find('input.form-control-range').eq(0).attr(property,val)
                }
                break;
        }
    }
    /**
     * 功能：blur事件
     * @param {*} property 
     * @param {*} val 
     * @param {*} e 
     */
    let blurSetProperties = function(property,that,e){
        let val=$(that).val();
        let checked=$(that).prop('checked');

        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        
        //判断值是否合理
        let vertifyPause = evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]["blur"] && evenProperties.verify[property]["blur"](globalComponent,e,val);
        if(vertifyPause){
            return false;
        }
        //更新到dom属性上
        //更新到dom属性上
        switch(property){
            case "hideLabel":
                evenProperties.data[property] = checked;
                break;
            default:
                evenProperties.data[property] = val;
                break;
        }
    }

    /**
     * 功能：click事件
     * @param {*} property 
     * @param {*} val 
     * @param {*} e 
     */
    let clickSetProperties = function(property,that,e){
        let val=$(that).val();
        let checked=$(that).prop('checked');

        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        
        //判断值是否合理
        let vertifyPause = evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]["click"] && evenProperties.verify[property]["click"](globalComponent,e,val);
        if(vertifyPause){
            return false;
        }
        
        switch(property){
            case "authority":
                //TODO 权限
                console.log(val)
                break;
            case "hideLabel":
                if(val){
                    $(globalComponent).find('label').eq(0).addClass('ortum_display_NONE');
                }else{
                    $(globalComponent).find('label').eq(0).removeClass('ortum_display_NONE');
                }
                break; 
            case "labelPosition":
                //TODO 位置
                switch(val){
                    case "topLeft":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('input.form-control-range').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_input_label_Right')
                        break;
                    case "topRight":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('input.form-control-range').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).addClass('ortum_boot_input_label_Right')
                        break;
                    case "rowLeft":
                        let evenLabelCss = $('#ortum_property_labelCSS').val();
                        evenLabelCss = evenLabelCss.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                        $('#ortum_property_labelCSS').val(evenLabelCss + ' col-form-label col-2')
                        $(globalComponent).addClass('row');
                        $(globalComponent).find('label').eq(0).addClass('col-form-label col-2')
                        $(globalComponent).find('input.form-control-range').eq(0).addClass('col');
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_input_label_Right')
                        break;
                    // case "rowRight":
                    //     $(globalComponent).addClass('row');
                    //     $(globalComponent).find('label').eq(0).addClass('col-form-label').addClass('col-2')
                    //     $(globalComponent).find('input.form-control-range').eq(0).addClass('col')
                    //     break;
                    default:
                        break;
                }
                break;    
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('input.form-control-range').eq(0).attr(property,val)
                }
                break;
        }
    
    }

    return {
        component_properties,
        RangeInputDom,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,
    }
})