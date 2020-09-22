define(["require","Assist","CreateDom","Global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        defaultVal:"",//默认值
        verification:"",//校验
        authority:"3",//权限
        placeholder:"请输入",
        cssClass:"col-10",//css类
        hideLabel:true,//是否隐藏标签
        labelName:"名称",//标签名称
        labelPosition:"rowLeft",//标签位置
        labelWidth:"",//标签宽度
        labelCSS:"col-2",//标签css类
        
    }

    /**
     * 功能：创建bootstrap的input
     */
    let InputDom = function(parentDom){
        let outerDom=$(
            `
            <div class="form-group ortum_item row" style="margin:0;padding-bottom:0.8rem">
               
            </div>
            `
        );
        //点击事件，修改属性
        $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        $(outerDom).append($(`
            <label class="col-form-label col-2">名称</label>
            <input type="text" name="${Assist.timestampName('input')}" class="form-control col-10" placeholder="请输入">
        `))
        $(outerDom).prop('ortum_component_properties',JSON.parse(JSON.stringify(component_properties)))
        $(outerDom).prop('ortum_component_type',['bootstrap','input']);

        $(parentDom).append(outerDom);

    }

    /**
     * 功能：重置bootstrap的input
     */
    let InputDomReset = function(outerDom){
        let properties = $(outerDom).prop('ortum_component_properties')
        let nowValue = $(outerDom).val();
        
        let labelDom = $(outerDom).find('.col-form-label').eq(0);
        let inputDom = $(outerDom).find('input.form-control').eq(0);
        
        //标签位置
        switch(properties.labelPosition){
            case 'topLeft':
                break;
            case 'topLeft':
                break;
            case 'rowLeft':
                break;
            case 'rowRight':
                break;
            default:
                break;
        }
        //权限
        switch(properties.authority){
            case '1':
                break;
            case '2':
                break;
            case '3':
                break;
            case '4':
                break;
            default:
                break;
        }
        $(inputDom).attr('placeholder',properties.placeholder)
        $(inputDom).attr('value',properties.defaultVal)
        $(inputDom).addClass(properties.cssClass);


        $(labelDom).addClass(properties.labelCSS);
        if(nowValue){
            $(inputDom).val(nowValue)
        }
    }

    /**
     * 功能：实时设置input的值
     */
    let setInputProperty = function(property,val){
        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties')
        switch(property){
            case "defaultVal":
                $(globalComponent).find('input.form-control').eq(0).attr('value',val)
                break;
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "authority":
                //TODO 权限
                console.log(val)
                break;
            case "placeholder":
                $(globalComponent).find('input.form-control').eq(0).attr('placeholder',val)
                break; 
            case "cssClass":
                // $(globalComponent).find('input.form-control').eq(0).addClass(val)
                $(globalComponent).find('input.form-control').eq(0).attr('className',evenProperties.cssClass+" " + val)

                break; 
            case "hideLabel":
                //TODO 隐藏label
                console.log(val)
                break; 
            case "labelName":
                $(globalComponent).find('.col-form-label').eq(0).text(val)
                break; 
            case "labelPosition":
                //TODO 位置
                console.log(val)
                break;   
            case "labelWidth":
                $(globalComponent).find('.col-form-label').eq(0).attr('width',val)
                break; 
            case "labelCSS":
                // $(globalComponent).find('.col-form-label').eq(0).addClass(val)
                $(globalComponent).find('.col-form-label').eq(0).attr('className',evenProperties.labelCSS+" " + val)
                break;  
            default:
                break;
        }
    }

    /**
     * 回显input参数到《参数配置中》
     */
    let setProperties = function(obj,that){
        for(let key in obj){
            switch(key){
                case "authority":case "labelPosition"://checkbox
                    $('input[name=ortum_property_'+ key +'][value='+obj[key]+']').attr("checked",'checked'); 
                    break;
                case "hideLabel"://开关
                    $('input[name=ortum_property_'+ key +']').prop("checked",obj[key]); 
                    break;
                default:
                    $('#ortum_property_'+key).val(obj[key])
                    break
            }
            // console.log(key)
        }
        //绑定正在编辑的对象
        Global.ortum_edit_component={
            frame:"bootstrap",
            type:'input',
            listen:setInputProperty,
            comObj:that,
        }
    };

    return {
        InputDom,
        InputDomReset,
        setProperties,
    }
})