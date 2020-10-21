define(["require","assist","createDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            // defaultVal:"option2",//默认值
            verification:"",//校验
            authority:"3",//权限
            // placeholder:"请输入",
            cssClass:"custom-control-input",//css类
            // hideLabel:false,//是否隐藏标签
            labelName:"开关",//标签名称
            // labelPosition:"rowLeft",//标签位置
            // labelWidth:"",//标签宽度
            labelCSS:"custom-control-label",//标签css类,
            checked:true,//选中

        },
        inputChange:["id","name","verification","cssClass","labelCSS","labelName"],//input事件修改值
        clickChange:["authority","checked"],
        purview:{//属性编辑权限
            id:3,//id
            name:2,
            // defaultVal:3,
            verification:3,
            authority:3,//权限
            // placeholder:3,
            cssClass:3,//css类
            // hideLabel:3,//是否隐藏标签
            labelName:3,//标签名称
            // labelPosition:3,//标签位置
            // labelWidth:1,//标签宽度
            labelCSS:3,//标签css类
            checked:3,

        },
    }

    /**
     * 功能：创建bootstrap的input
     */
    let SwitchDom = function(parentDom){
        let outerDom=$(
            `
            <div class="form-group ortum_item" style="margin:0;padding-bottom:0.8rem">
               
            </div>
            `
        );
        //点击事件，修改属性
        $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        let ortum_component_properties = Assist.deepClone(component_properties);
        ortum_component_properties.data.name = Assist.timestampName('switch');//设定name
        
        $(outerDom).append($(`
            <div class="custom-control custom-switch">
                <input type="checkbox" class="${ortum_component_properties.data.cssClass}" 
                name="${ortum_component_properties.data.name}" 
                ${ortum_component_properties.data.checked ? "checked" :""}
                ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : '' } >
                <label class="${ortum_component_properties.data.labelCSS}" >${ortum_component_properties.data.labelName}</label>
            </div>
        `))

        $(outerDom).prop('ortum_component_properties',ortum_component_properties)
        $(outerDom).prop('ortum_component_type',['bootstrap','switch']);

        $(parentDom).append(outerDom);

    };


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
        let vertifyPause =  evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]['input'] && evenProperties.verify[property]["input"](globalComponent,e,val,checked);
        if(vertifyPause){
            return false;
        }
        //更新到dom属性上
        // evenProperties.data[property] = val;
        switch(property){
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "cssClass":
                // $(globalComponent).find('input').eq(0).addClass(val)
                $(globalComponent).find('input').eq(0).attr('class',val)

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
        };

        //更新到dom属性上
        switch(property){
            case "checked":
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
            case "checked":
                $(globalComponent).find('input').eq(0).prop(property,checked)
                break;
            case "authority":
                //TODO 权限
                console.log(val)
                break;
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('input').eq(0).attr(property,val)
                }
                break;
        }
    }


    


    return {
        SwitchDom,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

    }
})