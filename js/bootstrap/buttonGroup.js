define(["require","assist","createDom","global","settings"],function(require,Assist,CreateDom,Global,Settings){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            verification:"",//校验
            authority:"edit",//权限
            cssClass:"ortum_bootstrap_buttonGroup_div ortum_append",
            title:"",
            childrenSlot:0,//子button的个数
        },
        inputChange:["id","name","verification","cssClass","title"],//input事件修改值
        clickChange:["authority"],
        changeChange:[],
        purview:{//属性编辑权限
            id:3,//id
            name:3,
            cssClass:3,
            verification:3,
            authority:3,//权限
            title:3,
        },
        dataShowType:{
            authority:"checkbox",
        },
    }

    /**
     * grid的拖拽事件
     * @param {*} ele 
     */
    let bindDropEventToButtonGroup = function(ele){
        $(ele).on('dragover.firstbind',function(e){
            return false;
        })
        $(ele).on('drop.firstbind',function(e){
            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');
            if(!componentKey){//不存在对应key
                return false;
            }
            
            if(!require('createDom')[Settings.menuListDataJSON[componentKey].createFn]){
                Assist.dangerTip();
                return false;
            }

            if(componentKey == "buttonDom" || componentKey == "iconButtonDom"){
                //执行对应的生成组件的函数(此处要解决 grid.js 与createDom 循环依赖的问题)
                let btnDom =require('createDom')[Settings.menuListDataJSON[componentKey].createFn](null,Global.ortum_createDom_frame)
                $(this).append(btnDom);
                //设置childrenSlot
                $(this).parents(".ortum_item").eq(0).prop("ortum_component_properties").data.childrenSlot++;

                //把拖拽对象制空
                Global.ortumNowDragObj = null;

                return false;
            }else{
                let createDom = require('createDom')[Settings.menuListDataJSON[componentKey].createFn](null,Global.ortum_createDom_frame)
                let parentsItemLength = $(this).parents(".ortum_item").length;
                if(parentsItemLength){
                    $(this).parents(".ortum_item").eq(parentsItemLength-1).before(createDom)
                }else{
                    $(this).before(createDom)
                }
                //把拖拽对象制空
                Global.ortumNowDragObj = null;
                return false;
            }
        })
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
     * @param {*} moreProps.customName 自定义name
     * @param {*} moreProps.ortumChildren 插入<ortum_children>的data-order
     */
    let ButtonGroupDom = function(parentDom,moreProps=null){
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
            <div class="ortum_item ortum_bootstrap_buttonGroup" data-frame="Bootstrap" 
            data-componentKey="buttonGroupDom">
               
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
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('buttonGroup'));

        let divGroup = $(`
            <div ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : '' } 
            name="${ortum_component_properties.data.name}" 
            class="${ortum_component_properties.data.cssClass}" >

            </div>
        `);
        //拖拽组件
        dropAddComponent !== false && bindDropEventToButtonGroup(divGroup);
        dropAddComponent !== false && $(divGroup).addClass("ortum_bootstrap_buttonGroup_drop_div");
        createJson && $(divGroup).addClass("ortum_append");//添加组件

        if(ortum_component_properties.data.childrenSlot && /(^[1-9]\d*$)/.test(ortum_component_properties.data.childrenSlot)){//需要建立按钮插槽
            let slotNum = ortum_component_properties.data.childrenSlot;
            while (slotNum>0){
                $(divGroup).append(`<ortum_children data-order=${ortum_component_properties.data.childrenSlot-slotNum}></ortum_children>`)
                slotNum--;
            };
        };

        $(outerDom).append(divGroup)

        //dom绑定property
        clickChangeAttrs !== false && $(outerDom).prop('ortum_component_properties',ortum_component_properties).prop('ortum_component_type',['Bootstrap','buttonGroup']);

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
                $(globalComponent).find('.btn').eq(0).attr('class',val).addClass("ortum_bootstrap_buttonGroup_drop_div")
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
        ButtonGroupDom,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

        ortumComponentSetJs,
    }
})