define(["require","assist","CreateDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            defaultVal:"",//默认值
            verification:"",//校验
            authority:"3",//权限
            placeholder:"请输入",
            cssClass:"form-control col-10",//css类
            hideLabel:false,//是否隐藏标签
            labelName:"名称",//标签名称
            labelPosition:"rowLeft",//标签位置
            // labelWidth:"",//标签宽度
            items:[
                {
                    "label":"香水",
                    "value":"option1",
                    "data-id":"miao",
                },
                {
                    "label":"玫瑰",
                    "value":"option2",
                    "data-id":"hao",
                },
            ],
            labelCSS:"col-form-label col-2",//标签css类
        },
        inputChange:["id","name","defaultVal","verification","placeholder","cssClass","labelName","labelCSS"],//input事件修改值
        clickChange:["authority","hideLabel","labelPosition"],
        purview:{//属性编辑权限
            id:3,//id
            name:2,
            defaultVal:3,
            verification:3,
            authority:3,//权限
            placeholder:3,
            cssClass:3,//css类
            hideLabel:3,//是否隐藏标签
            labelName:3,//标签名称
            labelPosition:3,//标签位置
            // labelWidth:1,//标签宽度
            labelCSS:3,//标签css类
        },
    }

    /**
     * 功能：创建bootstrap的input
     */
    let RadioDom = function(parentDom){
        let outerDom=$(
            `
            <div class="form-group ortum_item ortum_bootstrap_radio" style="margin:0;padding-bottom:0.8rem">
               
            </div>
            `
        );
        //点击事件，修改属性
        $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        let ortum_component_properties = Object.assign({},component_properties);
        ortum_component_properties.data.name = Assist.timestampName('input');//设定name
        for(let i=0;i<ortum_component_properties.data.items.length;i++){
            let newDom = $(`
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${ortum_component_properties.data.name}" id="${ortum_component_properties.data.name+"_"+i}" value="${ortum_component_properties.data.items[i].value}">
                <label class="form-check-label" for="${ortum_component_properties.data.name+"_"+1}">
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

        $(outerDom).prop('ortum_component_properties',ortum_component_properties)
        $(outerDom).prop('ortum_component_type',['bootstrap','radio']);

        $(parentDom).append(outerDom);

    }

    /**
     * 功能：新增选项
     * @param {*} newArr 
     */
    let setRadioItems = function(newArr){
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        $(globalComponent).find('.form-check').remove()
        for(let i=0;i<newArr.length;i++){
            let newDom = $(`
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${evenProperties.data.name}" id="${evenProperties.data.name+"_"+i}" value="${newArr[i].value}">
                <label class="form-check-label" for="${evenProperties.data.name+"_"+1}">
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
    let showRadioItems = function(){
        
        $('#ortum_top_dialog').modal({
            "backdrop":"static",
        })
        $("#ortum_top_model_content").load("/html/bootstrap/radio_settings.html",function(){
            let globalComponent =Global.ortum_edit_component.comObj;
            let evenProperties = $(globalComponent).prop('ortum_component_properties');

            let itemsArr = evenProperties.data.items;
            let itemsLength = itemsArr.length;
            for(let i =1 ;i<itemsLength;i++){
                $('#ortum_radio_addLine').click();
            }
            $('#ortum_radio_ModalLabel .ModalLabelTable').find('.ortum_order_dataTr').each(function(index,item){
                $(item).find('.ortum_radio_label').eq(0).val(itemsArr[index].label)
                $(item).find('.ortum_radio_value').eq(0).val(itemsArr[index].value)
            })

            $('#ortum_top_model_wait').hide();
        });
    };

    return {
        RadioDom,

        setRadioItems,
        showRadioItems,

        // inputSetProperties,
        // blurSetProperties,
        // changeSetProperties,
        // clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

    }
})