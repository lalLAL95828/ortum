define(["require","assist","createDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            verification:"",//校验
            authority:"edit",//权限
            cssClass:"btn btn-primary",
            title:"",
            defaultVal:"按钮",
        },
        inputChange:["id","name","verification","cssClass","title","defaultVal"],//input事件修改值
        clickChange:["authority"],
        changeChange:[],
        purview:{//属性编辑权限
            id:3,//id
            name:3,
            cssClass:3,
            verification:3,
            authority:3,//权限
            // labelCSS:3,//css类
            // labelName:3,//标签名称
            title:3,
            defaultVal:3,
        },
        dataShowType:{
            authority:"checkbox",
        },
    }

    /**
     * 功能：创建bootstrap的label
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
    let ButtonDom = function(parentDom,moreProps=null){
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
            moreProps.customName !== null && moreProps.customName !== undefined && (customName =moreProps.customName);
            moreProps.dropAddComponent === false && (dropAddComponent = moreProps.dropAddComponent);
            moreProps.ortumChildren !== null && moreProps.ortumChildren !== undefined && (ortumChildren = moreProps.ortumChildren);
        }

        let outerDom=$(
            `
            <div class="ortum_item ortum_bootstrap_button" data-frame="Bootstrap" 
            data-componentKey="buttonDom">
               
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
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('button'));

        let btn = $(`
            <button type="button" class="${ortum_component_properties.data.cssClass}" 
            name=${ortum_component_properties.data.name} 
            ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : '' }>
                    ${ortum_component_properties.data.defaultVal}
            </button>
        `);
        $(outerDom).append(btn)

        //dom绑定property
        clickChangeAttrs !== false && $(outerDom).prop('ortum_component_properties',ortum_component_properties).prop('ortum_component_type',['Bootstrap','button']);

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
            case "defaultVal":
                $(globalComponent).find('.btn').eq(0).text(val)
                break;
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "cssClass":
                $(globalComponent).find('.btn').eq(0).attr('class',val)
                break; 
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find('.btn').eq(0).attr(property,val)
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
                if(val=="hide"){//不可见
                    $(globalComponent).hide();
                    $("*[ortum_bindcomponentname]").parents(".ortum_item").eq(0).hide();
                }
                if(val=="edit"){//可编辑
                    // $(globalComponent).show();
                    // $(globalComponent).find("input").removeAttr("readonly");
                    // $(globalComponent).find("input").removeAttr("disabled");
                    // $("*[ortum_bindcomponentname]").parents(".ortum_item").eq(0).show();
                }
                if(val=="readonly"){//只读可点击
                    $(globalComponent).show();
                    $(globalComponent).find(".btn").attr("readonly","readonly");
                    $(globalComponent).find(".btn").removeAttr("disabled");
                    $("*[ortum_bindcomponentname]").parents(".ortum_item").eq(0).show();
                }
                if(val=="disabled"){//只读且无法点击
                    $(globalComponent).show();
                    $(globalComponent).find(".btn").attr("readonly","readonly");
                    $(globalComponent).find(".btn").attr("disabled","disabled");
                    $("*[ortum_bindcomponentname]").parents(".ortum_item").eq(0).show();
                }
                break;
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('.btn').eq(0).attr(property,val)
                }
                break;
        }
    }
    /**
     * 功能：设置js
     */
    let ortumComponentSetJs = function(){
        
    }

    return {
        ButtonDom,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

        ortumComponentSetJs,
    }
})