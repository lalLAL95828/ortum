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
            title:'',

        },
        inputChange:["id","name","verification","cssClass","labelCSS","labelName","title"],//input事件修改值
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
            title:3,

        },
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
     */
    let SwitchDom = function(parentDom,moreProps=null){
        let customProps = null;
        let generateDom =  null;
        let clickChangeAttrs = true;
        let dropAddComponent = true;
        let createJson = false;
        let HasProperties = false;

        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            moreProps.generateDom !== null && moreProps.generateDom !== undefined && (generateDom =moreProps.generateDom);
            moreProps.clickChangeAttrs === false && (clickChangeAttrs = moreProps.clickChangeAttrs);
            moreProps.HasProperties !== null && moreProps.HasProperties !== undefined && (HasProperties =moreProps.HasProperties);
            moreProps.createJson !== null && moreProps.createJson !== undefined && (createJson =moreProps.createJson);
            moreProps.dropAddComponent === false && (dropAddComponent = moreProps.dropAddComponent);
        }

        let outerDom=$(
            `
            <div class="form-group ortum_item ortum_bootstrap_switch" data-frame="Bootstrap" 
            data-componentKey="switchDom">
               
            </div>
            `
        );
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);
        //拖拽事件
        dropAddComponent !== false && require("feature").bindDropEventToOrtumItem(outerDom);

        let ortum_component_properties = customProps ? customProps : Assist.deepClone(component_properties);
        //设定name
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('switch'));

        
        $(outerDom).append($(`
            <div class="custom-control custom-switch">
                <input type="checkbox" class="${ortum_component_properties.data.cssClass}" 
                ${ortum_component_properties.data.title ? "title="+ortum_component_properties.data.title : '' } 
                name="${ortum_component_properties.data.name}" 
                ${ortum_component_properties.data.checked ? "checked" :""}
                ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : '' } >
                <label class="${ortum_component_properties.data.labelCSS}" >${ortum_component_properties.data.labelName}</label>
            </div>
        `))


        //dom绑定property
        clickChangeAttrs !== false && $(outerDom).prop('ortum_component_properties',ortum_component_properties).prop('ortum_component_type',['Bootstrap','switch']);

        if(parentDom){
            $(parentDom).append(outerDom);
        }else if(createJson){//生成json
            return {
                "name":ortum_component_properties.data.name,
                "html":outerDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "title":(ortum_component_properties.data.title ? ortum_component_properties.data.title : ortum_component_properties.data.labelName),
                "componentProperties":(HasProperties ? Assist.jsonStringify(ortum_component_properties) : undefined),
            }
        }else{
            return outerDom
        } 

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