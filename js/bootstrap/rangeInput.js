define(["require","assist","CreateDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            defaultVal:20,//默认值
            maxValRange:100,//范围最大值
            stepRange:1,
            minValRange:0,
            verification:"",//校验
            authority:"3",//权限
            // placeholder:"请输入",
            cssClass:"form-control col-10",//css类
            hideLabel:false,//是否隐藏标签
            labelName:"名称",//标签名称
            labelPosition:"rowLeft",//标签位置
            labelWidth:"",//标签宽度
            labelCSS:"col-form-label col-2",//标签css类
        },
        purview:{//属性编辑权限{1:不可见,2:仅读,3:可编辑,4:必填}
            id:1,//id
            defaultVal:3,
            maxValRange:3,
            stepRange:3,
            minValRange:3,
            verification:3,
            authority:3,//权限
            // placeholder:3,
            cssClass:3,//css类
            hideLabel:3,//是否隐藏标签
            labelName:3,//标签名称
            labelPosition:3,//标签位置
            labelWidth:1,//标签宽度
            labelCSS:3,//标签css类
        },
    }

    /**
     * 功能：创建bootstrap的input
     */
    let RangeInputDom = function(parentDom){
        let outerDom=$(
            `
            <div class="form-group ortum_item row" style="margin:0;padding-bottom:0.8rem">
            </div>
            `
        );
        //点击事件，修改属性
        // $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        $(outerDom).append($(`
            <label class="col-form-label col-2">名称</label>
            <input type="range" class="form-control-range col" 
                value="${component_properties.data.defaultVal}"
                style="padding:0"
                min="${component_properties.data.minValRange}"
                step="${component_properties.data.stepRange}"
                max="${component_properties.data.maxValRange}" name="${Assist.timestampName('rangeInput')}">
            
        `))
        $(outerDom).prop('ortum_component_properties',JSON.parse(JSON.stringify(component_properties)))
        $(outerDom).prop('ortum_component_type',['bootstrap','rangeInput']);

        $(parentDom).append(outerDom);
    }
    
     /**
     * 功能：实时设置input的值
     */
    let setRangeInputProperty = function(property,val){
        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
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
                $(globalComponent).find('input.form-control').eq(0).addClass(val)
                // $(globalComponent).find('input.form-control').eq(0).attr('class',evenProperties.cssClass+" " + val)

                break; 
            case "hideLabel":
                if(val){
                    $(globalComponent).find('label').eq(0).addClass('ortum_display_NONE');
                }else{
                    $(globalComponent).find('label').eq(0).removeClass('ortum_display_NONE');
                }
                break; 
            case "labelName":
                $(globalComponent).find('label').eq(0).text(val)
                break; 
            case "labelPosition":
                //TODO 位置
                switch(val){
                    case "topLeft":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('input.form-control').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_input_label_Right')
                        break;
                    case "topRight":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('input.form-control').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).addClass('ortum_boot_input_label_Right')
                        break;
                    case "rowLeft":
                        let evenLabelCss = $('#ortum_property_labelCSS').val();
                        evenLabelCss = evenLabelCss.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                        $('#ortum_property_labelCSS').val(evenLabelCss + ' col-form-label col-2')
                        $(globalComponent).addClass('row');
                        $(globalComponent).find('label').eq(0).addClass('col-form-label col-2')
                        $(globalComponent).find('input.form-control').eq(0).addClass('col');
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_input_label_Right')
                        break;
                    // case "rowRight":
                    //     $(globalComponent).addClass('row');
                    //     $(globalComponent).find('label').eq(0).addClass('col-form-label').addClass('col-2')
                    //     $(globalComponent).find('input.form-control').eq(0).addClass('col')
                    //     break;
                    default:
                        break;
                }

                break;   
            case "labelWidth":
                $(globalComponent).find('label').eq(0).attr('width',val)
                break; 
            case "labelCSS":
                $(globalComponent).find('label').eq(0).addClass(val)
                // $(globalComponent).find('label').eq(0).attr('class',evenProperties.labelCSS+" " + val)
                break;  
            default:
                break;
        }
    }

    /**
     * 回显input参数到《参数配置中》
     */
    let setProperties = function(obj,that){
        $('#ortum_collapseOne .form-group').hide();//隐藏所有属性
        let data = obj.data;
        let purview = obj.purview;

        for(let key in data){
            //设置编辑属性权限
            require('feature').setEditPropertiesPurview(key,purview[key]);
            switch(key){
                case "authority":case "labelPosition"://checkbox
                    $('input[name=ortum_property_'+ key +'][value='+data[key]+']').prop("checked",true); 
                    break;
                case "hideLabel"://开关
                    $('input[name=ortum_property_'+ key +']').prop("checked",data[key]); 
                    break;
                default:
                    $('#ortum_property_'+key).val(data[key])
                    break
            }
            // console.log(key)
        }
        //绑定正在编辑的对象
        Global.ortum_edit_component={
            frame:"bootstrap",
            type:'input',
            listen:setRangeInputProperty,
            comObj:that,
        }
    };

    return {
        RangeInputDom,
        setProperties,

    }
})