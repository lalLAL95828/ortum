define(["require","assist","createDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            defaultVal:"",//默认值
            verification:"",//校验
            authority:"3",//权限
            placeholder:"请输入",
            cssClass:"form-control col-10",//css类
            hideLabel:false,//是否隐藏标签
            labelName:"名称",//标签名称
            labelPosition:"rowLeft",//标签位置
            // labelWidth:"",//标签宽度
            labelCSS:"col-form-label col-2",//标签css类
            rows:3,//行数
        },
        inputChange:["id","name","defaultVal","verification","placeholder","cssClass","labelName","labelCSS","rows"],//input事件修改值
        clickChange:["authority","hideLabel","labelPosition"],
        purview:{//属性编辑权限
            id:3,//id
            name:2,
            defaultVal:3,
            verification:3,
            authority:1,//权限
            placeholder:3,
            cssClass:3,//css类
            hideLabel:3,//是否隐藏标签
            labelName:3,//标签名称
            labelPosition:3,//标签位置
            // labelWidth:1,//标签宽度
            labelCSS:3,//标签css类
            rows:3,
        },
    }

    /**
     * 功能：创建bootstrap的textarea
     * @param {*} parentDom 
     * @param {*} moreProps 一个json对象，
     * @param {*} moreProps.customProps 自定义属性
     * @param {*} moreProps.generateDom 函数也存在dom中
     * @param {*} moreProps.clickChangeAttrs 是否允许修改点击属性（=== false的时候，去除点击修改属性）
     */
    let TextareaDom = function(parentDom,moreProps=null){
        let customProps = null;
        let generateDom =  null;
        let clickChangeAttrs = true;
        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            generateDom =  moreProps.generateDom;
            clickChangeAttrs =  moreProps.clickChangeAttrs
        }

        let outerDom=$(
            `
            <div class="form-group ortum_item row" data-frame="Bootstrap" 
            data-componentKey="textareaDom">
               
            </div>
            `
        );
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        let ortum_component_properties = customProps ? customProps : Assist.deepClone(component_properties);
        //设定name
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('textarea'));

        //控制标签
        if(ortum_component_properties.data.hideLabel){
            ortum_component_properties.data.labelCSS.indexOf("ortum_display_NONE") ==-1 ? (ortum_component_properties.data.labelCSS+= "ortum_component_properties.data.labelCSS") : '';
        }else{
            switch(ortum_component_properties.data.labelPosition){
                case "topLeft":
                    $(outerDom).removeClass('row');
                    ortum_component_properties.data.labelCSS = ortum_component_properties.data.labelCSS.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                    ortum_component_properties.data.cssClass = ortum_component_properties.data.cssClass.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                    ortum_component_properties.data.labelCSS.replace("ortum_boot_textarea_label_Right",'')
                    break;
                case "topRight":
                    $(outerDom).removeClass('row');
                    ortum_component_properties.data.labelCSS = ortum_component_properties.data.labelCSS.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                    ortum_component_properties.data.cssClass = ortum_component_properties.data.cssClass.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                    ortum_component_properties.data.labelCSS.indexOf("ortum_boot_textarea_label_Right") == -1 ? ortum_component_properties.data.labelCSS+=" ortum_boot_textarea_label_Right" : ''

                    break;
                case "rowLeft":
                    ortum_component_properties.data.labelCSS = ortum_component_properties.data.labelCSS.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'');
                    ortum_component_properties.data.labelCSS += ' col-form-label col-2';
                    $(outerDom).addClass('row');
                    ortum_component_properties.data.cssClass = ortum_component_properties.data.cssClass.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                    ortum_component_properties.data.cssClass += " col";
                    ortum_component_properties.data.labelCSS.replace("ortum_boot_textarea_label_Right",'')
                    break;
                default:
                    break;
            }
        }

        //生成inputDom
        let textareaDom = $(`
            <textarea 
            ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : '' } 
            ${ortum_component_properties.data.defaultVal ? "value="+ortum_component_properties.data.defaultVal : '' } 
            name="${ortum_component_properties.data.name}" 
            class="${ortum_component_properties.data.cssClass}" 
            placeholder="${ortum_component_properties.data.placeholder}"
            rows="${ortum_component_properties.data.rows}"></textarea>
        `)

        //插入label
        $(outerDom).append($(`
            <label class="${ortum_component_properties.data.labelCSS}">${ortum_component_properties.data.labelName}</label>
        `))
        //插入dom
        $(outerDom).append(textareaDom)

        if(parentDom){
            $(outerDom).prop('ortum_component_properties',ortum_component_properties)
            $(outerDom).prop('ortum_component_type',['Bootstrap','textarea']);
            $(parentDom).append(outerDom);
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
        let vertifyPause =  evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]['input'] && evenProperties.verify[property]["input"](globalComponent,e);
        if(vertifyPause){
            return false;
        }
        //更新到dom属性上
        // evenProperties.data[property] = val;
        switch(property){
            case "defaultVal":
                $(globalComponent).find('textarea').eq(0).attr('value',val)
                $(globalComponent).find('textarea').eq(0).val(val)
                break;
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "cssClass":
                // $(globalComponent).find('input').eq(0).addClass(val)
                $(globalComponent).find('textarea').eq(0).attr('class',val)

                break; 
            case "labelName":
                $(globalComponent).find('label').eq(0).text(val)
                break; 
            // case "labelWidth":
            //     $(globalComponent).find('label').eq(0).attr('width',val)
            //     break; 
            case "labelCSS":
                // $(globalComponent).find('label').eq(0).addClass(val)
                $(globalComponent).find('label').eq(0).attr('class',val)
                break;  
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find('textarea').eq(0).attr(property,val)
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
        };

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
        //更新到dom属性上
        // evenProperties.data[property] = val;
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
                break; 
            case "labelPosition":
                //TODO 位置
                switch(val){
                    case "topLeft":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('textarea').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_textarea_label_Right')
                        break;
                    case "topRight":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('textarea').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).addClass('ortum_boot_textarea_label_Right')
                        break;
                    case "rowLeft":
                        let evenLabelCss = $('#ortum_property_labelCSS').val();
                        evenLabelCss = evenLabelCss.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                        $('#ortum_property_labelCSS').val(evenLabelCss + ' col-form-label col-2')
                        $(globalComponent).addClass('row');
                        $(globalComponent).find('label').eq(0).addClass('col-form-label col-2')
                        $(globalComponent).find('textarea').eq(0).addClass('col');
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_textarea_label_Right')
                        break;
                    // case "rowRight":
                    //     $(globalComponent).addClass('row');
                    //     $(globalComponent).find('label').eq(0).addClass('col-form-label').addClass('col-2')
                    //     $(globalComponent).find('inputl').eq(0).addClass('col')
                    //     break;
                    default:
                        break;
                }
                break;    
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('textarea').eq(0).attr(property,val)
                }
                break;
        }
    }


    return {
        TextareaDom,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

    }
})