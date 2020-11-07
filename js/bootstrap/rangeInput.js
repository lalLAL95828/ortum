define(["require","assist","createDom","global"],function(require,Assist,CreateDom,Global){
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
            cssClass:"form-control-rangeInput col",//css类
            hideLabel:false,//是否隐藏标签
            labelName:"名称",//标签名称
            labelPosition:"rowLeft",//标签位置
            labelCSS:"col-form-label col-2",//标签css类
            title:"",
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
            title:3,
        },
        dataShowType:{
            hideLabel:'switch',
            authority:"checkbox",
            labelPosition:"checkbox",
        },
        inputChange:["id","name","defaultVal","max","min","step","verification","cssClass","labelName","labelCSS","title"],//input事件修改值
        clickChange:["authority","hideLabel","labelPosition"],
        verify:{//编辑属性时的验证
            max:{
                blur:function(globalComponent,e,val){
                    /*获取要编辑的组件的属性*/
                    let ortum_component_properties = $(globalComponent).prop('ortum_component_properties');
                    /*修改前的值*/
                    let oldData = ortum_component_properties.data;

                    if(val*1 <= oldData.min*1){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('最大范围不能小于等于最小范围');
                        $(e.target).val(oldData.max*1);
                        $(globalComponent).find('input').eq(0).attr('max',oldData.max*1);
                        return true;
                    };
                    if(val*1 < oldData.defaultVal*1){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('最大范围不能小于默认值');
                        $(e.target).val(oldData.max*1);
                        $(globalComponent).find('input').eq(0).attr('max',oldData.max*1);
                        return true;
                    };

                    $(e.target).removeClass('is-invalid');
                },
            },
            min:{
                blur:function(globalComponent,e,val){
                    /*获取要编辑的组件的属性*/
                    let ortum_component_properties = $(globalComponent).prop('ortum_component_properties');
                    /*修改前的值*/
                    let oldData = ortum_component_properties.data;

                    if(val*1 >= oldData.max*1){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('最小范围不能大于等于最大范围');
                        $(e.target).val(oldData.min*1);
                        $(globalComponent).find('input').eq(0).attr('min',oldData.min*1);
                        return true;
                    };
                    if(val*1 > oldData.defaultVal*1){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('最小范围不能大于默认值');
                        $(e.target).val(oldData.min*1);
                        $(globalComponent).find('input').eq(0).attr('min',oldData.min*1);
                        return true;
                    };

                    $(e.target).removeClass('is-invalid');
                },
            },
            defaultVal:{
                blur:function(globalComponent,e,val){
                    /*获取要编辑的组件的属性*/
                    let ortum_component_properties = $(globalComponent).prop('ortum_component_properties');
                    /*修改前的值*/
                    let oldData = ortum_component_properties.data;

                    if(val*1 > oldData.max*1){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('默认值不能大于最大值');
                        $(e.target).val(oldData.defaultVal);
                        $(globalComponent).find('input').eq(0).attr('value',oldData.defaultVal*1);
                        $(globalComponent).find('input').eq(0).val(oldData.defaultVal*1);
                        return true;
                    };
                    if(val*1 < oldData.min){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('默认值不能小于最小值');
                        $(e.target).val(oldData.defaultVal*1);
                        $(globalComponent).find('input').eq(0).attr('value',oldData.defaultVal*1);
                        $(globalComponent).find('input').eq(0).val(oldData.defaultVal*1);
                        return true;
                    };

                    $(globalComponent).find('input').eq(0).val(val);

                    $(e.target).removeClass('is-invalid');
                },
            }
        }
    }
    /**
     * 功能：创建bootstrap的input
     * @param {*} parentDom 
     * @param {*} moreProps 一个json对象，
     * @param {*} moreProps.customProps 自定义属性
     * @param {*} moreProps.generateDom 函数也存在dom中
     * @param {*} moreProps.createJson 生成对应的json
     * @param {*} moreProps.HasProperties 保存组件的component_properties
     * @param {*} moreProps.clickChangeAttrs 是否允许修改点击属性（=== false的时候，去除点击修改属性）
     * @param {*} moreProps.dropAddComponent 拖拽添加组件
     * @param {*} moreProps.ortumChildren 插入<ortum_children>的data-order
     * @param {*} moreProps.customName 自定义name
     */
    let RangeInputDom = function(parentDom,moreProps=null){
        let customProps = null;
        let generateDom =  null;
        let clickChangeAttrs = true;
        let dropAddComponent = true;
        let customName = '';//自定义name

        let createJson = false;
        let HasProperties = false;
        let ortumChildren = null;

        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            moreProps.generateDom !== null && moreProps.generateDom !== undefined && (generateDom =moreProps.generateDom);
            moreProps.clickChangeAttrs === false && (clickChangeAttrs = moreProps.clickChangeAttrs);
            moreProps.HasProperties !== null && moreProps.HasProperties !== undefined && (HasProperties =moreProps.HasProperties);
            moreProps.createJson !== null && moreProps.createJson !== undefined && (createJson =moreProps.createJson);
            moreProps.dropAddComponent === false && (dropAddComponent = moreProps.dropAddComponent);
            moreProps.ortumChildren !== null && moreProps.ortumChildren !== undefined && (ortumChildren = moreProps.ortumChildren);
            moreProps.customName !== null && moreProps.customName !== undefined && (customName =moreProps.customName);
        }

        let outerDom=$(
            `
            <div class="form-group ortum_item row" data-frame="Bootstrap" 
            data-componentKey="rangeInputDom">
            </div>
            `
        );
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);
        //拖拽事件
        dropAddComponent !== false && require("feature").bindDropEventToOrtumItem(outerDom);

        let ortum_component_properties = customProps ? customProps : Assist.deepClone(component_properties);
        //设定name
        customName && (ortum_component_properties.data.name = customName);
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('rangeInput'));


        //控制标签
        if(ortum_component_properties.data.hideLabel){
            ortum_component_properties.data.labelCSS.indexOf("ortum_display_NONE") ==-1 ? (ortum_component_properties.data.labelCSS+= " ortum_display_NONE") : '';
        }else{
            switch(ortum_component_properties.data.labelPosition){
                case "topLeft":case "topRight":
                    $(outerDom).removeClass('row');
                    break;
                case "rowLeft":
                    $(outerDom).addClass('row');
                    break;
                default:
                    break;
            }
        }

        //生成rangeInputDom
        let rangeInputDom = $(`
            <input type="range" class="${ortum_component_properties.data.cssClass}" 
            ${ortum_component_properties.data.title ? "title="+ortum_component_properties.data.title : '' } 
            value="${ortum_component_properties.data.defaultVal}"
            min="${ortum_component_properties.data.min}"
            step="${ortum_component_properties.data.step}"
            max="${ortum_component_properties.data.max}" name="${ortum_component_properties.data.name}">
        `)

        //插入label
        $(outerDom).append($(`
            <label class="${ortum_component_properties.data.labelCSS}">${ortum_component_properties.data.labelName}</label>
        `))
        //插入dom
        $(outerDom).append(rangeInputDom)

        //dom绑定property
        clickChangeAttrs !== false && $(outerDom).prop('ortum_component_properties',ortum_component_properties).prop('ortum_component_type',['Bootstrap','rangeInput']);
        if(parentDom){
            $(parentDom).append(outerDom);
        }else if(createJson){//生成json
            return {
                "name":ortum_component_properties.data.name,
                "html":outerDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "title":(ortum_component_properties.data.title ? ortum_component_properties.data.title : ortum_component_properties.data.labelName),
                "componentProperties":(HasProperties ? Assist.jsonStringify(ortum_component_properties) : undefined),
                "ortumChildren":ortumChildren,
            }
        }else{
            return outerDom
        } 
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
                $(globalComponent).find('input').eq(0).attr('value',val)
                $(globalComponent).find('input').eq(0).val(val)
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "cssClass":
                // $(globalComponent).find('input').eq(0).addClass(val)
                $(globalComponent).find('input').eq(0).attr('class',evenProperties.cssClass+" " + val)
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
                    $(globalComponent).find('input').eq(0).attr(property,val)
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
                if(checked){
                    $(globalComponent).find('label').eq(0).addClass('ortum_display_NONE');
                }else{
                    $(globalComponent).find('label').eq(0).removeClass('ortum_display_NONE');
                }
                evenProperties.data.labelCSS = $(globalComponent).find('label').eq(0).attr("class")
                $('#ortum_property_labelCSS').val($(globalComponent).find('label').eq(0).attr("class"))
                break; 
            case "labelPosition":
                //TODO 位置
                switch(val){
                    case "topLeft":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('input').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_rangeInput_label_Right')
                        break;
                    case "topRight":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('input').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).addClass('ortum_boot_rangeInput_label_Right')
                        break;
                    case "rowLeft":
                        let evenLabelCss = $('#ortum_property_labelCSS').val();
                        evenLabelCss = evenLabelCss.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                        $('#ortum_property_labelCSS').val(evenLabelCss + ' col-form-label col-2')
                        $(globalComponent).addClass('row');
                        $(globalComponent).find('label').eq(0).addClass('col-form-label col-2')
                        $(globalComponent).find('input').eq(0).addClass('col');
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_rangeInput_label_Right')
                        break;
                    // case "rowRight":
                    //     $(globalComponent).addClass('row');
                    //     $(globalComponent).find('label').eq(0).addClass('col-form-label').addClass('col-2')
                    //     $(globalComponent).find('input').eq(0).addClass('col')
                    //     break;
                    default:
                        break;
                }
                $('#ortum_property_cssClass').val($(globalComponent).find('input').eq(0).attr("class"))
                $('#ortum_property_labelCSS').val($(globalComponent).find('label').eq(0).attr("class"))
                evenProperties.data.cssClass = $(globalComponent).find('input').eq(0).attr("class")
                evenProperties.data.labelCSS = $(globalComponent).find('label').eq(0).attr("class")
                break;    
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('input').eq(0).attr(property,val)
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