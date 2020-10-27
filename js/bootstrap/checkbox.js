define(["require","assist","createDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            // id:"",//id
            name:'',//name
            defaultVal:["option1"],//默认值
            verification:"",//校验
            authority:"3",//权限
            // placeholder:"请输入",
            cssClass:"form-check-input",//css类
            // hideLabel:false,//是否隐藏标签
            // labelName:"名称",//标签名称
            // labelPosition:"rowLeft",//标签位置
            // labelWidth:"",//标签宽度
            labelCSS:"form-check-label",//标签css类,
            inline:true,//单行显示
            items:[
                {
                    "label":"香水",
                    "value":"option1",
                    "data-id":"miao",
                    "checked":true,//默认选中
                },
                {
                    "label":"玫瑰",
                    "value":"option2",
                    "data-id":"hao",
                },
            ],
        },
        inputChange:["name","verification","cssClass","labelCSS"],//input事件修改值
        clickChange:["authority","inline"],
        purview:{//属性编辑权限
            // id:3,//id
            name:2,
            // defaultVal:1,
            verification:3,
            authority:3,//权限
            // placeholder:3,
            cssClass:3,//css类
            // hideLabel:3,//是否隐藏标签
            // labelName:3,//标签名称
            // labelPosition:3,//标签位置
            // labelWidth:1,//标签宽度
            labelCSS:3,//标签css类
            inline:3,//单行显示
        },
    }

    /**
     * 功能：创建bootstrap的checkbox
     * @param {*} parentDom 
     * @param {*} moreProps 一个json对象，
     * @param {*} moreProps.customProps 自定义属性
     * @param {*} moreProps.generateDom 函数也存在dom中
     * @param {*} moreProps.clickChangeAttrs 是否允许修改点击属性（=== false的时候，去除点击修改属性）
     */
    let CheckboxDom = function(parentDom,moreProps=null){
        let customProps = null;
        let generateDom =  null;
        let clickChangeAttrs = true;
        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            moreProps.generateDom !== null && moreProps.generateDom !== undefined && (generateDom =moreProps.generateDom);
            moreProps.clickChangeAttrs === false && (clickChangeAttrs = moreProps.clickChangeAttrs)
        }

        let outerDom=$(
            `
            <div class="form-group ortum_item ortum_bootstrap_checkbox" 
            data-frame="Bootstrap" 
            data-componentKey="checkboxDom">
               
            </div>
            `
        );
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        let ortum_component_properties = customProps ? customProps : Assist.deepClone(component_properties);
        //设定name
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('checkbox'));

        for(let i=0;i<ortum_component_properties.data.items.length;i++){
            let choose = false;
            if(ortum_component_properties.data.defaultVal.indexOf(ortum_component_properties.data.items[i].value) != -1){
                choose = true
            }
            
            let newDom = $(`
            <div class="form-check ${ortum_component_properties.data.inline?'form-check-inline':''}">
                <input class="${ortum_component_properties.data.cssClass}" ${choose ? "checked" :""} type="checkbox" name="${ortum_component_properties.data.name}" id="${ortum_component_properties.data.name+"_"+i}" value="${ortum_component_properties.data.items[i].value}">
                <label class="${ortum_component_properties.data.labelCSS}" for="${ortum_component_properties.data.name+"_"+1}">
                    ${ortum_component_properties.data.items[i].label}
                </label>
            </div>
            `);
            let obj =ortum_component_properties.data.items[i]
            for (key in obj) {
                if (obj.hasOwnProperty(key) && key != "label" && key != 'value') {
                    $(newDom).find('.form-check-input').eq(0).attr(key,obj[key])
                }
            }
            $(outerDom).append(newDom)
        }

        if(parentDom){
            $(outerDom).prop('ortum_component_properties',ortum_component_properties)
            $(outerDom).prop('ortum_component_type',['Bootstrap','checkbox']);
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
        switch(property){
            // case "defaultVal":
            //     $(globalComponent).find('input').removeAttr('checked')
            //     $(globalComponent).find('input[value='+ val+']').eq(0).attr('checked',true)
            //     $(globalComponent).find('input[value='+ val+']').eq(0).prop('checked',false)
            //     break;
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "cssClass":
                // $(globalComponent).find('input.form-control').eq(0).addClass(val)
                $(globalComponent).find('input').attr('class',val)
                break; 
            case "labelCSS":
                // $(globalComponent).find('label').eq(0).addClass(val)
                $(globalComponent).find('label').attr('class',val)
                break;  
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find('input').eq(0).attr(property,val)
                }
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
            case "inline":
                if(checked){
                    $(globalComponent).find('.form-check').addClass('form-check-inline');
                }else{
                    $(globalComponent).find('.form-check').removeClass('form-check-inline');
                }
                break;    
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('input.form-control').eq(0).attr(property,val)
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
        //更新到dom属性上
        switch(property){
            case "inline":
                evenProperties.data[property] = checked;
                break;
            default:
                evenProperties.data[property] = val;
                break;
        }
    }

    /**
     * 功能：新增选项
     * @param {*} newArr 
     */
    let setCheckboxItems = function(newArr){
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');


        $(globalComponent).find('.form-check').remove();

        //默认选中值清空
        evenProperties.data.defaultVal = [];

        for(let i=0;i<newArr.length;i++){
            let choose = false;
            if(newArr[i].checked){
                choose = true;
                evenProperties.data.defaultVal.push(newArr[i].value)
            }
            let newDom = $(`
            <div class="form-check ${evenProperties.data.inline?'form-check-inline':''}">
                <input class="${evenProperties.data.cssClass}" ${choose ? "checked" :""} type="checkbox" name="${evenProperties.data.name}" id="${evenProperties.data.name+"_"+i}" value="${newArr[i].value}">
                <label class="${evenProperties.data.labelCSS}" for="${evenProperties.data.name+"_"+1}">
                    ${newArr[i].label}
                </label>
            </div>
            `);
            let obj =newArr[i];
            for (key in obj) {
                if (obj.hasOwnProperty(key) && key != "label" && key != 'value') {
                    $(newDom).find('.form-check-input').eq(0).attr(key,obj[key])
                }
            }
            $(globalComponent).append(newDom)
        }
        evenProperties.data.items = newArr;
    }
    /**
     * 功能：回显选项
     */
    let showCheckboxItems = function(){
        //显示弹窗
        $('#ortum_top_dialog').modal({
            "backdrop":"static",
        });
        //加载配置
        $("#ortum_top_model_content").load("html/bootstrap/checkbox_settings.html",function(){
            let globalComponent =Global.ortum_edit_component.comObj;
            let evenProperties = $(globalComponent).prop('ortum_component_properties');

            let itemsArr = evenProperties.data.items;
            let itemsLength = itemsArr.length;
            for(let i =1 ;i<itemsLength;i++){
                $('#ortum_checkbox_addLine').click();
            }
            itemsLength && $('#ortum_checkbox_ModalLabel .ModalLabelTable').find('.ortum_order_dataTr').each(function(index,item){
                $(item).find('.ortum_checkbox_label').eq(0).val(itemsArr[index].label)
                $(item).find('.ortum_checkbox_value').eq(0).val(itemsArr[index].value)
                if(itemsArr[index].checked){
                    $(item).find('.ortum_default_checked').eq(0).prop('checked',true)
                }
            })

            $('#ortum_top_model_wait').hide();
        });

        return false;
    };

    return {
        CheckboxDom,

        setCheckboxItems,
        showCheckboxItems,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

    }
})