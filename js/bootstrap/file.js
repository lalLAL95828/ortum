define(["require","assist","createDom","global","ortumReq"],function(require,Assist,CreateDom,Global,OrtumReq){
    /**
     * 监听文件变化，并且实时上传
     */
    let changeLabelName = function(e){
        let filelists = $(this).prop('files')
        let names = [];
        for(let file of filelists){
            names.push(file.name)
        }
        $(this).next("label").text(names)
    }

    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            // defaultVal:"",//默认值
            verification:"",//校验
            authority:"3",//权限
            // placeholder:"请输入",
            cssClass:"custom-file-input",//css类
            // hideLabel:false,//是否隐藏标签
            labelName:"名称",//标签名称
            // labelPosition:"rowLeft",//标签位置
            // labelWidth:"",//标签宽度
            // labelCSS:"col-form-label col-2",//标签css类

            accept:"*/*",//接收类型
            browse:"浏览",//浏览
            multiple:false,//多个文件
            onChange:changeLabelName,//文件改变，修改labelName
            uploadUrl:"http://localhost:3000/uploadfile",//自动上传的url
            formName:"files",//form的name
            automatic:true,//自动上传
        },
        inputChange:["id","name","accept","verification","cssClass","labelName","formName","uploadUrl"],//input事件修改值
        clickChange:["authority","multiple","automatic"],
        purview:{//属性编辑权限
            id:3,//id
            name:2,
            // defaultVal:3,
            verification:3,
            authority:1,//权限
            // placeholder:3,
            cssClass:3,//css类
            // hideLabel:3,//是否隐藏标签
            labelName:3,//标签名称
            // labelPosition:3,//标签位置
            // labelWidth:1,//标签宽度
            // labelCSS:3,//标签css类

            accept:3,
            browse:3,//浏览
            multiple:3,
            uploadUrl:3,//自动上传的url
            formName:3,//form的name
            automatic:3,//自动上传
        },
        verify:{//编辑属性时的验证
            automatic:{
                click:function(globalComponent,e,val,checked){
                    //获取要编辑的组件的属性
                    let ortum_component_properties = $(globalComponent).prop('ortum_component_properties');
                    //修改前的值
                    let oldData = ortum_component_properties.data;

                    if(checked && !oldData.formName){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('自动上传，formName的值不能为空')
                        $(e.target).prop('checked',false)
                        return true;
                    }
                    if(checked && !oldData.uploadUrl){
                        $(e.target).addClass('is-invalid');
                        $(e.target).parent().find('.invalid-feedback').eq(0).text('自动上传，uploadUrl的值不能为空')
                        $(e.target).prop('checked',false)
                        return true;
                    }
                    $(e.target).removeClass('is-invalid')
                },
            },
        }
    }
    /**
     * 监听文件变化，并且实时上传
     */
    let uploadFile = function(e){
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');

        let filelists = $(this).prop('files')
        //发送到后端
        let fd = new FormData();
        let L = filelists.length;
        if(L)return;//为空不上传

        for(let i=0;i<L;i++){
            fd.append(evenProperties.data.formName, filelists[i]);
        }
        $(globalComponent).find(".progress").eq(0).css("display","flex")
        OrtumReq.ortumReq({
            "url":evenProperties.data.uploadUrl,
            "method":"POST",
            "data":fd,
            "success":(xhr,e)=>{
                require("assist").infoTip("上传成功。");
            },
            "error":(xhr,e)=>{
                require("assist").dangerTip("上传失败！");
            },
            progress:(xhr,e)=>{
                let pro = e.loaded/e.total * 100
                // console.log(pro);
                $(globalComponent).find(".progress-bar").eq(0).css("width", pro+"%")
                $(globalComponent).find(".progress-bar").eq(0).attr("aria-valuenow", pro)
            },
            final:(xhr,e)=>{
                setTimeout(function(){
                    $(globalComponent).find(".progress").eq(0).css("display","none")
                    $(globalComponent).find(".progress-bar").eq(0).css("width","0%")
                    $(globalComponent).find(".progress-bar").eq(0).attr("aria-valuenow", 0)
                },300)
            }
        })
    }

    /**
     * 功能：创建bootstrap的input
     */
    let FileDom = function(parentDom){
        let outerDom=$(
            `
            <div class="form-group ortum_item" style="margin:0;padding-bottom:0.8rem">
               
            </div>
            `
        );
        //点击事件，修改属性
        $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);

        let ortum_component_properties = Assist.deepClone(component_properties);
        ortum_component_properties.data.name = Assist.timestampName('file');//设定name
        
        //<button class="btn btn-outline-secondary" type="button">预览</button>
        //<button class="btn btn-outline-secondary" type="button">下载</button>

        $(outerDom).append($(`
            <div class="input-group">
                <div class="custom-file">
                    <input type="file" class="${ortum_component_properties.data.cssClass}" 
                    name="${ortum_component_properties.data.name}" 
                    ${ortum_component_properties.data.multiple ? "multiple" : ""}
                    id="${ortum_component_properties.data.id ? ortum_component_properties.data.id : ortum_component_properties.data.name}" 
                    accept="${ortum_component_properties.data.accept}" 
                    />
                    <label class="custom-file-label" data-browse="${ortum_component_properties.data.browse}"
                    for="${ortum_component_properties.data.id ? ortum_component_properties.data.id : ortum_component_properties.data.name}">
                    ${ortum_component_properties.data.labelName}</label>
                </div>
                <div class="input-group-append" style="margin-left:0">
                </div>
            </div>
            <div class="progress" style="height: 5px;margin-top:5px;display:none">
                <div class="progress-bar" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        `))
        $(outerDom).prop('ortum_component_properties',ortum_component_properties)
        $(outerDom).prop('ortum_component_type',['bootstrap','file']);
        //绑定文件onchange
        $(outerDom).find('input').on('change.changeLabelname',ortum_component_properties.data.onChange)
        if(ortum_component_properties.data.automatic && ortum_component_properties.data.uploadUrl && ortum_component_properties.data.formName){
            $(outerDom).find('input').off("change.automatic").on("change.automatic",uploadFile)
        }else{
            $(outerDom).find('input').off("change.automatic")
        }
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
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "cssClass":
                $(globalComponent).find('input').eq(0).attr('class',val)
                break; 
            case "labelName":
                $(globalComponent).find('label').eq(0).text(val)
                break; 
            case "browse":
                $(globalComponent).find('label').eq(0).attr('data-browse',val)
                break; 
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find('input').eq(0).attr(property,val)
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
        let vertifyPause = evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]["blur"] && evenProperties.verify[property]["blur"](globalComponent,e,val,checked);
        
        if(vertifyPause){
            return false;
        };

        //更新到dom属性上
        switch(property){
            case "multiple":case "automatic":
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
        let vertifyPause = evenProperties.verify && evenProperties.verify[property] && evenProperties.verify[property]["click"] && evenProperties.verify[property]["click"](globalComponent,e,val,checked);
        if(vertifyPause){
            return false;
        }
        switch(property){
            case "automatic":
                if(checked){
                    $(globalComponent).find('input').eq(0).off("change.automatic").on("change.automatic",uploadFile)
                }else{
                    $(globalComponent).find('input').eq(0).off("change.automatic")
                }
                break;
            case "authority":
                //TODO 权限
                console.log(val)
                break;
            case "multiple":
                if(checked){
                    $(globalComponent).find('input').eq(0).attr(property,checked)
                }else{
                    $(globalComponent).find('input').eq(0).removeAttr(property)
                }
                break;
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('input').eq(0).attr(property,val)
                }
                break;
        }
    }

    return {
        FileDom,

        inputSetProperties,
        blurSetProperties,
        // changeSetProperties,
        clickSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

    }
})