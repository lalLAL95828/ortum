define(["require","assist","createDom","global","ortumReq"],function(require,Assist,CreateDom,Global,OrtumReq){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            defaultVal:["123"],//默认值
            verification:"",//校验
            authority:"3",//权限
            placeholder:"请输入",
            cssClass:"custom-select col",//css类
            hideLabel:false,//是否隐藏标签
            labelName:"名称",//标签名称
            labelPosition:"rowLeft",//标签位置
            // labelWidth:"",//标签宽度
            labelCSS:"col-form-label col-2",//标签css类
            useRemote:false,//服务器获取option
            getOptions:null,
            options:[
                {
                    value:"123",
                    name:"玫瑰",
                    selected:true,
                },
                {
                    value:"321",
                    name:"兰花",
                    disabled:true,
                },
            ]
        },
        inputChange:["id","name","verification","placeholder","cssClass","labelName","labelCSS"],//input事件修改值
        clickChange:["authority","hideLabel","labelPosition","useRemote"],
        purview:{//属性编辑权限
            id:3,//id
            name:2,
            // defaultVal:3,
            verification:3,
            authority:1,//权限
            placeholder:3,
            cssClass:3,//css类
            hideLabel:3,//是否隐藏标签
            labelName:3,//标签名称
            labelPosition:3,//标签位置
            // labelWidth:1,//标签宽度
            labelCSS:3,//标签css类
            useRemote:3,
        },
    }

    /**
     * TODO
     * 功能：远端获取options
     */
    let getOptions = function(checked=false){
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        if(!evenProperties.data.useRemote || !checked)return;

        console.log("远端获取");
        // OrtumReq.ortumReq({
        //     "url":evenProperties.data.uploadUrl,
        //     "method":"POST",
        //     "data":fd,
        //     "success":(xhr,e)=>{
        //         require("assist").infoTip("上传成功。");
        //     },
        //     "error":(xhr,e)=>{
        //         require("assist").dangerTip("上传失败！");
        //     },
        //     progress:(xhr,e)=>{
        //         let pro = e.loaded/e.total * 100
        //         // console.log(pro);
        //         $(globalComponent).find(".progress-bar").eq(0).css("width", pro+"%")
        //         $(globalComponent).find(".progress-bar").eq(0).attr("aria-valuenow", pro)
        //     },
        //     final:(xhr,e)=>{
        //         setTimeout(function(){
        //             $(globalComponent).find(".progress").eq(0).css("display","none")
        //             $(globalComponent).find(".progress-bar").eq(0).css("width","0%")
        //             $(globalComponent).find(".progress-bar").eq(0).attr("aria-valuenow", 0)
        //         },300)
        //     }
        // })
    }

    /**
     * 功能：创建bootstrap的select
     */
    let SelectDom = function(parentDom){
        let outerDom=$(
            `
            <div class="form-group ortum_item row ortum_bootstrap_select" style="margin:0;padding-bottom:0.8rem">
               
            </div>
            `
        );
        //点击事件，修改属性
        $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        let ortum_component_properties = Assist.deepClone(component_properties);
        ortum_component_properties.data.name = Assist.timestampName('select');//设定nameselect
        
        let selectDom = $(`
            <select class="${ortum_component_properties.data.cssClass}" 
                id="${ortum_component_properties.data.id}"
                name="${ortum_component_properties.data.name}"
                placeholder="${ortum_component_properties.data.placeholder}" 
            </select>
        `)


        for(let i=0;i<ortum_component_properties.data.options.length;i++){
            let choose = false;
            if(ortum_component_properties.data.defaultVal.indexOf(ortum_component_properties.data.options[i].value) != -1){
                choose = true
            }
            selectDom.append(`
                <option 
                ${ortum_component_properties.data.options[i].selected ? "selected":""} 
                ${ortum_component_properties.data.options[i].disabled ? "disabled":""} 
                value="${ortum_component_properties.data.options[i].value}">${ortum_component_properties.data.options[i].name}</option>
            `)
        }

        $(outerDom).append($(`
            <label class="${ortum_component_properties.data.labelCSS}">${ortum_component_properties.data.labelName}</label>
        `))
        $(outerDom).append(selectDom)

        $(outerDom).prop('ortum_component_properties',ortum_component_properties)
        $(outerDom).prop('ortum_component_type',['bootstrap','select']);

        $(parentDom).append(outerDom);
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
            // case "defaultVal":
            //     $(globalComponent).find('input').eq(0).attr('value',val)
            //     $(globalComponent).find('input').eq(0).val(val)
            //     break;
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "cssClass":
                // $(globalComponent).find('input').eq(0).addClass(val)
                $(globalComponent).find('select').eq(0).attr('class',val)
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
                    $(globalComponent).find('select').eq(0).attr(property,val)
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
        switch(property){
            case "useRemote":
                if(checked){
                    getOptions(checked);
                }else{
                    setSelectOptions(null,true)
                }
                break;
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
                break; 
            case "labelPosition":
                //TODO 位置
                switch(val){
                    case "topLeft":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('select').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_select_label_Right')
                        break;
                    case "topRight":
                        $(globalComponent).removeClass('row');
                        $(globalComponent).find('label').eq(0).removeClass(function (index, className) { 
                            return (className.match (/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('select').eq(0).removeClass(function (index, className) {
                            return (className.match(/(?<=(^|\s))col(\S)*?(?=($|\s))/g) || []).join(' ');
                        });
                        $(globalComponent).find('label').eq(0).addClass('ortum_boot_select_label_Right')
                        break;
                    case "rowLeft":
                        let evenLabelCss = $('#ortum_property_labelCSS').val();
                        evenLabelCss = evenLabelCss.replace(/(?<=(^|\s))col(\S)*?(?=($|\s))/g,'')
                        $('#ortum_property_labelCSS').val(evenLabelCss + ' col-form-label col-2')
                        $(globalComponent).addClass('row');
                        $(globalComponent).find('label').eq(0).addClass('col-form-label col-2')
                        $(globalComponent).find('select').eq(0).addClass('col');
                        $(globalComponent).find('label').eq(0).removeClass('ortum_boot_select_label_Right')
                        break;
                    // case "rowRight":
                    //     $(globalComponent).addClass('row');
                    //     $(globalComponent).find('label').eq(0).addClass('col-form-label').addClass('col-2')
                    //     $(globalComponent).find('inputl').eq(0).addClass('col')
                    //     break;
                    default:
                        break;
                }
                break;    
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('select').eq(0).attr(property,val)
                }
                break;
        }
    }

    /**
     * 功能：新增选项
     * @param {*} newArr 
     */
    let setSelectOptions = function(newArr,setDefault=false){



        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');

        //TODO 可以完善
        if(evenProperties.data.useRemote) return;//从远端获取

        setDefault && (newArr = evenProperties.data.options);//设置默认值

        let selectDom = $(globalComponent).find('select').eq(0).empty();

        //默认选中值清空
        evenProperties.data.defaultVal = [];

        for(let i=0;i<newArr.length;i++){
            if(newArr[i].selected){
                evenProperties.data.defaultVal.push(newArr[i].value)
            }
            let newDom = $(`
            <option 
                ${newArr[i].selected ? "selected":""} 
                ${newArr[i].disabled ? "disabled":""} 
                value="${newArr[i].value}">${newArr[i].name}</option>
            `);
            $(selectDom).append(newDom);
        }
        evenProperties.data.options = newArr;
    }
    /**
     * 功能：回显选项
     */
    let showSelectOptions = function(){
        //显示弹窗
        $('#ortum_top_dialog').modal({
            "backdrop":"static",
        })
        //加载配置
        $("#ortum_top_model_content").load("/html/bootstrap/select_settings.html",function(){
            let globalComponent =Global.ortum_edit_component.comObj;
            let evenProperties = $(globalComponent).prop('ortum_component_properties');

            let itemsArr = evenProperties.data.options;
            let itemsLength = itemsArr.length;
            for(let i =1 ;i<itemsLength;i++){
                $('#ortum_select_addLine').click();
            }
            itemsLength && $('#ortum_select_ModalLabel .ModalLabelTable').find('.ortum_order_dataTr').each(function(index,item){
                $(item).find('.ortum_select_name').eq(0).val(itemsArr[index].name)
                $(item).find('.ortum_select_value').eq(0).val(itemsArr[index].value)
                if(itemsArr[index].selected){
                    $(item).find('.ortum_default_selected').eq(0).prop('checked',true)
                }
                if(itemsArr[index].disabled){
                    $(item).find('.ortum_default_disabled').eq(0).prop('checked',true)
                }
            })

            $('#ortum_top_model_wait').hide();
        });
    };


    return {
        SelectDom,

        setSelectOptions,
        showSelectOptions,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

    }
})