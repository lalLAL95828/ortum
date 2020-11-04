define(["require","assist","createDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            verification:"",//校验
            authority:"3",//权限
            cssClass:"ortum_bootstrap_pDom",
            title:"",
            bindComponentName:"",//关联组件，label的权限由绑定组件一致
            defaultVal:"绑定",
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
            title:3,
            bindComponentName:3,
            defaultVal:3,
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
     */
    let PDom = function(parentDom,moreProps=null){
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
            <div class="ortum_item ortum_bootstrap_p" data-frame="Bootstrap" 
            data-componentKey="pDom">
               
            </div>
            `
        );
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);
        //拖拽事件
        dropAddComponent !== false && require("feature").bindDropEventToOrtumItem(outerDom);

        let ortum_component_properties = customProps ? customProps : Assist.deepClone(component_properties);
        //设定name
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('p'));

        $(outerDom).append($(`            
            <p class="${ortum_component_properties.data.cssClass}" 
                ${ortum_component_properties.data.bindComponentName ? "ortum_bindcomponentname="+ortum_component_properties.data.bindComponentName : '' } >
                ${ortum_component_properties.data.defaultVal}
            </p>
        `))

        //dom绑定property
        clickChangeAttrs !== false && $(outerDom).prop('ortum_component_properties',ortum_component_properties).prop('ortum_component_type',['Bootstrap','p']);

        if(parentDom){
            $(parentDom).append(outerDom);
        }else if(createJson){//生成json
            return {
                "name":ortum_component_properties.data.name,
                "html":outerDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "bindComponentName":ortum_component_properties.data.bindComponentName,
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
        switch(property){
            case "defaultVal":
                $(globalComponent).find('p').eq(0).text(val)
                break;
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find('p').eq(0).attr(property,val)
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
        let val= $(that).val();
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
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('p').eq(0).attr(property,val)
                }
                break;
        }
    }

    /**
     * 功能：change事件
     * @param {*} property
     * @param {*} val
     * @param {*} e
     */
    let changeSetProperties = function(property,that,e){
        let val= $(that).val();
        let checked= $(that).prop('checked');

        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');

        //判断值是否合理
        let vertifyPause = evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]["change"] && evenProperties.verify[property]["change"](globalComponent,e,val);
        if(vertifyPause){
            return false;
        }
        switch(property){
            case "bindComponentName":
                evenProperties.data[property] = val;
                val && $(globalComponent).find('p').eq(0).attr("ortum_bindcomponentname",val);
                !val && $(globalComponent).find('p').eq(0).removeAttr("ortum_bindcomponentname");
                break
            default:
                if(evenProperties.changeChange.indexOf(property) != -1){
                    $(globalComponent).find('label').eq(0).attr(property,val)
                }
                break;
        }
    }
    /**
     * 功能：参数设置显示之前的操作
     */
    let beforeSetPrperies = function () {
        //设置关联组件选项
        let optionArr = require('feature').getFormComponentsProps(null,"name");
        $("#ortum_property_bindComponentName").html('')
        if(optionArr.length){
            $("#ortum_property_bindComponentName").append(`<option value="" selected>请选择</option>`)
            optionArr.forEach((item)=>{
                $("#ortum_property_bindComponentName").append(`
                    <option value="${item.text}">${item.title}</option>
                `)
            })
        }else{
            $("#ortum_property_bindComponentName").append(`<option value="" disabled>暂无组件可选</option>`)
        }
    }

    return {
        PDom,

        inputSetProperties,
        blurSetProperties,
        changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,
        beforeSetPrperies,
    }
})