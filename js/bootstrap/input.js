define(["Assist","CreateDom","Global"],function(Assist,CreateDom,Global){
    let component_properties = {
        defaultVal:"",//默认值
        verification:"",//校验
        authority:"3",//权限
        placeholder:"请输入",
        cssClass:"",//css类
        labelName:"名称",//标签名称
        labelPosition:"rowLeft",//标签位置
        labelPosition:"",//标签宽度
        labelCSS:"",//标签css类
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
        $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        $(outerDom).append($(`
            <label class="col-2 col-form-label">名称</label>
            <input type="text" name="${Assist.timestampName('input')}" class="form-control col-10" placeholder="请输入">
        `))
        $(outerDom).prop('ortum_component_properties',JSON.parse(JSON.stringify(component_properties)))

        


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



    return {
        InputDom,
        InputDomReset,
    }
})