define(["require","assist","createDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            defaultVal:"",//默认值
            verification:"",//校验
            authority:"3",//权限
            placeholder:"请输入",
            cssClass:"form-control col",//css类
            hideLabel:false,//是否隐藏标签
            labelName:"名称",//标签名称
            labelPosition:"rowLeft",//标签位置
            // labelWidth:"",//标签宽度
            labelCSS:"col-form-label col-2",//标签css类
            rows:3,//行数
            title:"",
            uuid: "",
            attributesArr:[{
                "label":"maxlength",
                "value":200,
            }],//属性数组

            onBefore:"",//渲染之前的回调
            onAfter:"",//渲染之后的回调
            onClick:"",//点击事件的回调
            onBlur:"",
            onInput:"",
        },
        inputChange:["id","name","defaultVal","verification","placeholder","cssClass","labelName","labelCSS","rows","title"],//input事件修改值
        clickChange:["authority","hideLabel","labelPosition"],
        purview:{//属性编辑权限
            id:3,//id
            name:3,
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
            title:3,
        },
        dataShowType:{
            hideLabel:'switch',
            authority:"checkbox",
            labelPosition:"checkbox",
        },
    }

    /**
     * 功能：创建bootstrap的textarea
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
     * @param {*} moreProps.nameSuffix 名称后缀
     */
    let TextareaDom = function(parentDom,moreProps=null){
        let customProps = null;
        // let generateDom =  null;
        let clickChangeAttrs = true;
        let dropAddComponent = true;
        let createJson = false;
        let HasProperties = false;
        let ortumChildren = null;
        let customName = '';//自定义name

        let nameSuffix = null;

        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            // moreProps.generateDom !== null && moreProps.generateDom !== undefined && (generateDom =moreProps.generateDom);
            moreProps.clickChangeAttrs === false && (clickChangeAttrs = moreProps.clickChangeAttrs);
            moreProps.createJson !== null && moreProps.createJson !== undefined && (createJson =moreProps.createJson);
            moreProps.HasProperties !== null && moreProps.HasProperties !== undefined && (HasProperties =moreProps.HasProperties);
            moreProps.dropAddComponent === false && (dropAddComponent = moreProps.dropAddComponent);
            moreProps.ortumChildren !== null && moreProps.ortumChildren !== undefined && (ortumChildren = moreProps.ortumChildren);
            moreProps.customName !== null && moreProps.customName !== undefined && (customName =moreProps.customName);
            moreProps.nameSuffix !== null && moreProps.nameSuffix !== undefined && (nameSuffix = moreProps.nameSuffix);
        }

        let outerDom=$(
            `
            <div class="form-group ortum_item row ortum_bootstrap_textarea" data-frame="Bootstrap" 
            data-componentKey="textareaDom">
               
            </div>
            `
        );
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);
        //拖拽事件
        dropAddComponent !== false && require("feature").bindDropEventToOrtumItem(outerDom);

        let ortum_component_properties = customProps ? customProps : Assist.deepClone(component_properties);

        //生成uuid
        ortum_component_properties.data.uuid || (ortum_component_properties.data.uuid = Assist.getUUId());
        outerDom.attr("ortum_uuid",ortum_component_properties.data.uuid);
        //设定name
        customName && (ortum_component_properties.data.name = customName);
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('textarea'));
        let nameArr = ortum_component_properties.data.name.split("_");
        if(nameSuffix && createJson){
            ortum_component_properties.data.name = nameArr[0] + "_"+ nameArr[1] + nameSuffix;
        }else{
            ortum_component_properties.data.name = nameArr[0] + "_"+ nameArr[1]
        }

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

        let textareaDom = $(`
            <textarea 
            ${ortum_component_properties.data.title ? "title="+ortum_component_properties.data.title : '' } 
            ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : '' } 
            ${ortum_component_properties.data.defaultVal ? "value="+ortum_component_properties.data.defaultVal : '' } 
            name="${ortum_component_properties.data.name}" 
            class="${ortum_component_properties.data.cssClass}" 
            placeholder="${ortum_component_properties.data.placeholder}"
            rows="${ortum_component_properties.data.rows}"></textarea>
        `);

        //插入label
        $(outerDom).append($(`
            <label class="${ortum_component_properties.data.labelCSS}">${ortum_component_properties.data.labelName}</label>
        `))
        //修改编辑的属性
        if(Array.isArray(ortum_component_properties.data.attributesArr)){
            ortum_component_properties.data.attributesArr.forEach(function(item){
                textareaDom.attr(item.label,item.value);
            });
        }
        //插入dom
        $(outerDom).append(textareaDom)


        //scriptDom
        let scriptDom ='';
        if(createJson){
            scriptDom = $(`<script>
                    ${(ortum_component_properties.data.onClick && typeof ortum_component_properties.data.onClick === "function") ? '$("*[ortum_uuid='+ ortum_component_properties.data.uuid +']").find("textarea").eq(0).off("click.ortum").on("click.ortum",'+ ortum_component_properties.data.onClick +');' : ''}
                    ${(ortum_component_properties.data.onBlur && typeof ortum_component_properties.data.onBlur === "function") ? '$("*[ortum_uuid='+ ortum_component_properties.data.uuid +']").find("textarea").eq(0).off("blur.ortum").on("blur.ortum",'+ ortum_component_properties.data.onBlur +');' : ''}
                    ${(ortum_component_properties.data.onInput && typeof ortum_component_properties.data.onInput === "function") ? '$("*[ortum_uuid='+ ortum_component_properties.data.uuid +']").find("textarea").eq(0).off("input.ortum").on("input.ortum",'+ ortum_component_properties.data.onInput +');' : ''}
                    ${(ortum_component_properties.data.onAfter && typeof ortum_component_properties.data.onAfter === "function") ? '!'+ortum_component_properties.data.onAfter+'($("*[ortum_uuid='+ ortum_component_properties.data.uuid +']").find("textarea").eq(0),"'+ ortum_component_properties.data.name +'");' : ''}
                </script>`);
        }


        //dom绑定property
        clickChangeAttrs !== false && $(outerDom).prop('ortum_component_properties',ortum_component_properties).prop('ortum_component_type',['Bootstrap','textarea']);
        if(parentDom){
            $(parentDom).append(outerDom);
        }else if(createJson){//生成json
            return {
                "name":ortum_component_properties.data.name,
                "html":outerDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "title":(ortum_component_properties.data.title ? ortum_component_properties.data.title : ortum_component_properties.data.labelName),
                "componentProperties":(HasProperties ? Assist.jsonStringify(ortum_component_properties) : undefined),
                "ortumChildren":ortumChildren,
                "script":scriptDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," ").length >= 20 ? scriptDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," ") : '',
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
                $('#ortum_property_cssClass').val($(globalComponent).find('textarea').eq(0).attr("class"))
                $('#ortum_property_labelCSS').val($(globalComponent).find('label').eq(0).attr("class"))
                evenProperties.data.cssClass = $(globalComponent).find('textarea').eq(0).attr("class")
                evenProperties.data.labelCSS = $(globalComponent).find('label').eq(0).attr("class")
                break;    
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('textarea').eq(0).attr(property,val)
                }
                break;
        }
    }

    /**
     * 功能：设置js
     */
    let ortumComponentSetJs = function(codeObj){
        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');

        let setStr = "var ortum_BootstrapInput_setJs = {";
        if(evenProperties.data.onBefore){
            setStr += "\n//DOM渲染前的执行函数\nonBefore:"+ evenProperties.data.onBefore.toString() + ",";
        }else{
            setStr += "\n//DOM渲染前的执行函数\nonBefore:function(){},"
        }
        if(evenProperties.data.onAfter){
            setStr += "\n//DOM渲染后的执行函数\nonAfter:"+ evenProperties.data.onAfter.toString() + ",";
        }else{
            setStr += "\n//DOM渲染后的执行函数\nonAfter:function(that,name){},"
        }
        if(evenProperties.data.onClick){
            setStr += "\n//click事件\nonClick:"+ evenProperties.data.onClick.toString() + ",";
        }else{
            setStr += "\n//click事件\nonClick:function(){},"
        }
        if(evenProperties.data.onBlur){
            setStr += "\n//blur事件\nonBlur:"+ evenProperties.data.onBlur.toString() + ",";
        }else{
            setStr += "\n//blur事件\nonBlur:function(){},"
        }
        if(evenProperties.data.onInput){
            setStr += "\n//input事件\nonInput:"+ evenProperties.data.onInput.toString() + ",";
        }else{
            setStr += "\n//input事件\nonInput:function(){},"
        }
        setStr +="\n};";

        //格式化
        setStr = js_beautify(setStr,2);
        codeObj.setValue(setStr)
    };
    /**
     * 功能：保存js
     */
    let ortumComponentSaveJs = function(val){
        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');

        let packer = new Packer;
        let valFormat = packer.pack(val, 0, 0);
        try{
            eval(valFormat);
            evenProperties.data.onBefore = ortum_BootstrapInput_setJs.onBefore;
            evenProperties.data.onAfter = ortum_BootstrapInput_setJs.onAfter;
            evenProperties.data.onClick = ortum_BootstrapInput_setJs.onClick;
            evenProperties.data.onBlur = ortum_BootstrapInput_setJs.onBlur;
            evenProperties.data.onInput = ortum_BootstrapInput_setJs.onInput;

        }catch (e) {
            console.error(e);
            console.error("设置input的js有误，请重新设置");
        }
    };

    return {
        TextareaDom,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

        ortumComponentSetJs,
        ortumComponentSaveJs,

    }
})