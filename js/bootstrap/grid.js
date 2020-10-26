define(["require","assist","settings","global",'BootStrapAsider'],function(require,Assist,Settings,Global,BootStrapAsider){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            cssClass:"row",//css类
            columns:2,//多少列
        },
        inputChange:["id","name","cssClass","columns"],//input事件修改值
        clickChange:[],
        purview:{//属性编辑权限
            id:3,//id
            name:2,
            cssClass:2,//css类
            columns:3,
        },
    }
    /**
     * 功能：创建bootstrap的栅格系统
     * @param {*} moreProps.customProps 自定义属性
     * @param {*} moreProps.generateDom 函数转化为String，保存到script标签中
     * @param {*} moreProps.clickChangeAttrs 是否允许修改点击属性（=== false的时候，去除点击修改属性）
     */
    let GridDom = function(parentDom,moreProps=null){
        let customProps = null;
        let generateDom =  null;
        let clickChangeAttrs = true;
        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            generateDom =  moreProps.generateDom;
            clickChangeAttrs =  moreProps.clickChangeAttrs
        }

        let outerDom= $('<div class="ortum_item ortum_bootstrap_grid" data-frame="Bootstrap" data-componentKey="gridDom" style="margin: 0!important;padding:0!important;"></div>');
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        let ortum_component_properties = customProps ? customProps : Assist.deepClone(component_properties);
        //设定name
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('grid'));


        let row = $(`
            <div class="${ortum_component_properties.data.cssClass}" 
            style="margin: 0"
            ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : ''} 
            data-col-num=${ortum_component_properties.data.columns}></div>
        `)
        for(let i=0;i<ortum_component_properties.data.columns;i++){
            let col=BootStrapAsider.tipAddComponentFn(true,moreProps)
            $(row).append(col)
        }

        outerDom.append(row);

        if(parentDom){
            $(outerDom).prop('ortum_component_properties',ortum_component_properties)
            $(outerDom).prop('ortum_component_type',['Bootstrap','grid']);
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
        let vertifyPause =  evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]['input'] && evenProperties.verify[property]["input"](globalComponent,e,val,checked);
        if(vertifyPause){
            return false;
        }
        //更新到dom属性上
        // evenProperties.data[property] = val;
        switch(property){
            case "columns":
                $(globalComponent).attr('data-col-num',val);
                let cloumLength = $(globalComponent).find(".row").eq(0).children().length;
                if(cloumLength > val*1){
                    for(let i =0;i<(cloumLength -(val*1));i++){
                        $(globalComponent).find(".row").eq(0).children().last().remove();
                    }
                }
                if(cloumLength < val*1){
                    for(let i =0;i<(val*1 - cloumLength);i++){
                        let col=BootStrapAsider.tipAddComponentFn()
                        $(globalComponent).find(".row").eq(0).append(col)
                    }
                }
                break; 
            case "cssClass":
                $(globalComponent).find(".row").attr('class',val)
                break; 
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find(".row").eq(0).attr(property,val)
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
            // case "hideLabel":case "useRemote":
            //     evenProperties.data[property] = checked;
            //     break;
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
        switch(property){
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find(".row").eq(0).attr(property,val)
                }
                break;
        }
    }


    return {
        GridDom,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,
    }
})