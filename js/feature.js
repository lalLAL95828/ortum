/* ortun的辅助函数 */
define(["settings","global",'CreateDom'],function(Settings,Global,CreateDom){
    /**
     * 功能：初始化函数
     * @param {*} mainId 
     */
    let init = function(mainId){
        let ortumMain = document.getElementById(mainId)
        let ortumLeft = $(ortumMain).find('#ortum_left').eq(0);//左边部分
        let ortumBody = $(ortumMain).find('#ortum_body').eq(0);//中间部分

        let ortumComponents = document.createElement("div");
        ortumComponents.id = 'ortum_components';
        Global.ortumComponents = ortumComponents;
        
        let ortumField = document.createElement("div");
        ortumField.id = 'ortum_field';
        ortumField.className = 'ortum_field_originState';
        ortumField.innerHTML="<div class='originState'>组件拖拽</div>";
        Global.ortumField = ortumField;
        bindFeatureToOrtumField(ortumField);

        //创建文档片段，一次传入多个doomappendChild
        let fragment = document.createDocumentFragment()
        Settings.menuListsData.forEach(element => {
            let item =createDragComponents(element);
            //此处的dom节点要做存储处理
            Global.ortumItem[element.key] = item;
            //绑定事件
            bindFeatureToComponents(item);

            fragment.appendChild(item)
        });

        ortumComponents.appendChild(fragment);

        $(ortumLeft).append(ortumComponents)
        $(ortumBody).append(ortumField)

        //事件监听注册
        $('#ortum_import_file').on('change',importFileListen)
        propertiesSetListen();

        //radio的选项新增行
        // $('#ortum_radio_add_newLine').on('click',function(e){
        //     console.log($('.ortum_radio_newValue_item'))
        //     let lineNum = $('.ortum_radio_newValue_item').length;
        //     $('.ortum_radio_newValue_item').eq(lineNum-1).after(`
        //         <div class="row ortum_radio_newValue_item" style="padding:0;">
        //             <div class="col-6" style="padding-right:0;">
        //                 <input type="text" class="form-control form-control-sm" placeholder="名称">
        //             </div>
        //             <div class="col-6" style="padding-left:0;">
        //                 <input type="text" class="form-control form-control-sm" placeholder="值">
        //             </div>
        //         </div>
        //     `)
        // })
    }
    /**
     * 功能：创建可拖拽组件
     *  */
    let createDragComponents = function(elementInfo){
        let item = document.createElement("div");
        item.className = 'ortum_componentItem';
        item.draggable = true;
        item.dataset.key=elementInfo.key;
        item.innerText = elementInfo.name;
        item.title = elementInfo.name;
        item.dataset.toggle = "tooltip"
        item.dataset.placement = "bottom"
        //绑定事件
        return item;
    };

    /**
     * 功能：给可拖拽组件添加事件
     *  */
    let bindFeatureToComponents = function(ele){
        ele.ondragstart = function(e){//我被拖动时，开始的那一刻
            Global.ortumNowDragObj = e.target;
            // console.log(Global.ortumNowDragObj);
            //e.dataTransfer.setData("dragTarget",this);//不能存储对象，因为会进行toString转化
        }
    };
    /**
     * 功能：给表单区域添加事件
     *  */
    let bindFeatureToOrtumField = function(ele){
        ele.ondragover = function(e){
            e.preventDefault();//ondrop事件才能触发
            // console.log("我是ondragover")
            // console.log(this)
        }
        ele.ondrop = function(e){
            if(!Global.ortumNowDragObj)return;

            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');

            //清空正在拖拽的对象
            Global.ortumNowDragObj = null;
            if(!CreateDom[Settings.menuListDataJSON[componentKey].createFn]){
                $('#ortum_tip_content').text("火速赶制中！！！")
                $('.ortum_tip').show();
                setTimeout(function(){
                    $('.ortum_tip').hide();
                },1000)
                return;
            }


            e.preventDefault();//阻值浏览器对拖拽对象进行处理
            // var dropData = e.dataTransfer.getData("dragTarget");

            if($(this).hasClass('ortum_field_originState')){
                $(this).removeClass('ortum_field_originState')
                this.innerHTML = "";
            }

            //执行对应的生成组件的函数
            CreateDom[Settings.menuListDataJSON[componentKey].createFn](this,Settings.menuListDataJSON[componentKey].useType)
           
            //eval( CreateDom[Settings.menuListDataJSON[componentKey].createFn]+ "("+ this +","+ Settings.menuListDataJSON[componentKey].useType +")");
            
            // this.appendChild(Global.ortumNowDragObj.cloneNode(true))//深copy
            
        }

        //右键事件
        // ele.oncontextmenu = function(e){
        //     e.preventDefault();
        //     createContextMenuObj(e)
        //     if(!e){
        //         window.event.returnValue =false;//IE
        //     }
        //     return false
        // }
    };

    /**
     * //TODO
     * 功能：创建右键菜单
     *  */ 
    let createContextMenuObj = function (e){
        let xClientAxis = e.clientX
        //获取当前浏览器可视大小
        let widInnerWidth = window.innerWidth;
        let xDis = widInnerWidth - xClientAxis;

        let leftChange =0;
        //120为最大宽度
        if(xDis <=  (Settings.contextMenuWidth +14)){
            leftChange = xClientAxis-Settings.contextMenuWidth-14;
        }else{
            leftChange =xClientAxis
        }
        let topChange =e.pageY;
        let targetHeight = parseFloat($(e.target).css('height'))//Feild的高度
        if(e.clientY + Settings.contextMenuMaxHeight-22 >=  targetHeight){
            topChange = topChange - (e.clientY+Settings.contextMenuMaxHeight-22-targetHeight);
        }
        if(Global.ortum_contextMenuObj){
            Global.ortum_contextMenuObj.style.top = topChange+'px';
            Global.ortum_contextMenuObj.style.left= leftChange + 'px';
            Global.ortum_contextMenuObj.style.display="block";
        }else{
            let ulObj = document.createElement('ul');
            ulObj.id= 'ortum_contextMenu';
            ulObj.style.top = topChange+'px';
            ulObj.style.left= leftChange + 'px';
            ulObj.style.maxHeight = Settings.contextMenuMaxHeight + "px";
            ulObj.style.width = Settings.contextMenuWidth + "px";
            for(let i=0 ;i<Settings.menuListsData.length;i++){
                let liObj = document.createElement('li');
                liObj.dataset.key = Settings.menuListsData[i].key;
                liObj.innerText = Settings.menuListsData[i].name;
                //阻止冒泡事件
                $(liObj).on('click',function(e){
                    console.log(this.dataset.key)
                    return false;
                }).on('mouseup',function(e){
                    return false;
                })
 
                ulObj.appendChild(liObj)
            }
            document.getElementsByTagName('body')[0].append(ulObj)
            Global.ortum_contextMenuObj = ulObj;
        }
        
        //TODO 给body绑定特定的点击事件
        $("body").unbind("mouseup.cancelContextMenu").bind("mouseup.cancelContextMenu",function(){
            console.log("body监听到点击事件了")
            if(Global.ortum_contextMenuObj){
                Global.ortum_contextMenuObj.style.top="-20000px";
                Global.ortum_contextMenuObj.style.display="none";
            }
            $("body").unbind("mouseup.cancelContextMenu");
        });
    };
    /**
     * 功能：监听文件导入
     * @param {*} e 
     */
    let importFileListen = function(e){
        let FileList = $(this).prop('files');
        let htmlFile = FileList[0];
        if(FileList.length>2){
            $('#ortum_tip_content').text("只能导入html和js文件！")
            $('.ortum_tip').show();
            setTimeout(function(){
                $('.ortum_tip').hide();
            },1000)
            return false;
        }
        if(!htmlFile)return false;
        // var name = htmlFile.name; //读取选中文件的文件名
        // var size = htmlFile.size; //读取选中文件的大小
        var reader = new FileReader(); 
        reader.readAsText(htmlFile); 
        reader.onload = function() {
            let domArr = $(this.result);
            // console.log(domArr)
            for(let i of domArr){
                // console.log($(domArr[i]))
                if($(i).attr('id') =='ortum_body'){
                    $('#ortum_field').removeClass("ortum_field_originState")
                    $('#ortum_field').html($(i).find('#ortum_field').html())
                }
            }
        }
    }
    /**
     * 功能：监听文件导出
     * @param {*} e 
     */
    let exportFileListen = function(e){
        console.log(e)
        let contentData=document.getElementById('ortum_body').outerHTML;
        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([contentData]);
        // console.log(urlObject)
        // console.log(export_blob)
        let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")//参考https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElementNS
        save_link.href = urlObject.createObjectURL(export_blob);
        // urlObject.revokeObjectURL(save_link.href);//一般需要从内存中释放objectURL
        save_link.download = "表单.html";
        let ev = document.createEvent("MouseEvents");//原生实现一个点击事件
        ev.initMouseEvent(
            "click", true, false, window, 0, 0, 0, 0, 0
            , false, false, false, false, 0, null
            );
        save_link.dispatchEvent(ev);
    }
    /**
     * 功能：监听修改属性
     */
    let propertiesSetListen = function(){
        //input事件
        $('#ortum_collapseOne input').on('input',function(e){
            let nameVal = $(this).attr('name')
            if(nameVal){
                let nameValArr = nameVal.split('_') || [];
                nameValArr.length && Global.ortum_edit_component && 
                Global.ortum_edit_component.inputEvent && 
                Global.ortum_edit_component.inputEvent(nameValArr[nameValArr.length-1],$(this),e)
            }
            
        })
        //click事件
        $('#ortum_collapseOne input').on('click',function(e){
            let nameVal = $(this).attr('name')
            if(nameVal){
                let nameValArr = nameVal.split('_') || [];
                nameValArr.length && Global.ortum_edit_component && 
                Global.ortum_edit_component.clickEvent && 
                Global.ortum_edit_component.clickEvent(nameValArr[nameValArr.length-1],$(this),e);
            }
        })
        //blur事件
        $('#ortum_collapseOne input').on('blur',function(e){
            let nameVal = $(this).attr('name')
            if(nameVal){
                let nameValArr = nameVal.split('_') || [];
                nameValArr.length && Global.ortum_edit_component && 
                Global.ortum_edit_component.blurEvent && 
                Global.ortum_edit_component.blurEvent(nameValArr[nameValArr.length-1],$(this),e);
            }
        })
    }

    /**
     * 功能: 设置右侧编辑属性的权限
     */
    let setEditPropertiesPurview = function(id, val){
        switch(val){
            case 1: case "1"://不可见
                $('#ortum_property_'+id).parents('.form-group').eq(0).hide();
                break;
            case 2: case "2"://只读
                $('#ortum_property_'+id).parents('.form-group').eq(0).show();
                $('#ortum_property_'+id).attr('disabled',"disabled")
                break;
            case 3: case "3"://可编辑
                $('#ortum_property_'+id).parents('.form-group').eq(0).show();
                break;
            case 4: case "4"://必填
                $('#ortum_property_'+id).parents('.form-group').eq(0).show();
                //TODO
                break;
            default:
                break
        }

    }

    /**
     * 功能: 找到表单中所有的组件的id和name
     */
    let getComponentsPropsHint = function(){
        let backArr = []
        $("#ortum_body").find("input").each(function(index,item){
            if($(item).prop("id")){
                backArr.push({
                    id:"id_"+$(item).prop("id"),
                    text:$(item).prop("id"),
                    type:"id",
                    className:"ortum_hint",
                    render:function(ele,self,data){
                        var dom = $(`
                        <span>${data.text}</span><span style="float:right; margin-left:30px">${data.type}</span>
                        `)
                        $(ele).html(dom)
                    }
                })
            }
            if($(item).prop("name")){
                backArr.push({
                    id:"name_"+$(item).prop("name"),
                    text:$(item).prop("name"),
                    type:"name",
                    className:"ortum_hint",
                    render:function(ele,self,data){
                        var dom = $(`
                        <span>${data.text}</span><span style="float:right; margin-left:30px">${data.type}</span>
                        `)
                        $(ele).html(dom)
                    }
                })
            }
            
        })
        return backArr;
    }

    return {
        createContextMenuObj:createContextMenuObj,
        init:init,
        bindFeatureToOrtumField:bindFeatureToOrtumField,
        bindFeatureToComponents:bindFeatureToComponents,
        
        importFileListen,
        propertiesSetListen,
        exportFileListen,
        setEditPropertiesPurview,

        getComponentsPropsHint,
    }
})