/* ortun的辅助函数 */
define(["settings","global",'createDom'],function(Settings,Global,CreateDom){
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
            if(!CreateDom[Settings.menuListDataJSON[componentKey].createFn] || !CreateDom[Settings.menuListDataJSON[componentKey].createFn]["ortum_"+Global.ortum_createDom_frame]){
                require("assist").dangerTip();
                return false;
            }


            e.preventDefault();//阻值浏览器对拖拽对象进行处理
            // var dropData = e.dataTransfer.getData("dragTarget");

            if($(this).hasClass('ortum_field_originState')){
                $(this).removeClass('ortum_field_originState')
                this.innerHTML = "";
            }

            //执行对应的生成组件的函数
            CreateDom[Settings.menuListDataJSON[componentKey].createFn](this,Global.ortum_createDom_frame)
           
            //eval( CreateDom[Settings.menuListDataJSON[componentKey].createFn]+ "("+ this +","+ Global.ortum_createDom_frame +")");
            
            // this.appendChild(Global.ortumNowDragObj.cloneNode(true))//深copy

            return false;
            
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
            require("assist").dangerTip("只能导入一个html和js文件！");
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
       /* let contentData=document.getElementById('ortum_field').outerHTML;
        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([contentData]);
        let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")//参考https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElementNS
        save_link.href = urlObject.createObjectURL(export_blob);
        // urlObject.revokeObjectURL(save_link.href);//一般需要从内存中释放objectURL
        save_link.download = "表单.html";
        let ev = document.createEvent("MouseEvents");//原生实现一个点击事件
        ev.initMouseEvent(
            "click", true, false, window, 0, 0, 0, 0, 0
            , false, false, false, false, 0, null
            );
        save_link.dispatchEvent(ev);*/

        //TODO 此处完善是否需要保存组件属性HasProperties
        let saveArrJSON = getFormContentJson("id",{id:"ortum_field",HasProperties:true})
        let prevDom = $('<div id="ortum_field_preview"></div>')
        let datasJson = JsonHtmlRenderDom(saveArrJSON,prevDom,"append")

        //TODO 后期补上其他内容,需要引入的js和css
        let outInner = $(`<div><div id="ortum_css"></div><div id="ortum_html"></div><div id="ortum_script"></div></div>`);
        //插入css
        datasJson.css && datasJson.css.forEach((index,item)=>{
            $(outInner).find("#ortum_css").append($(item))
        })
        //插入html
        $(outInner).find("#ortum_html").append(prevDom)
        //保存ortum组件属性
        datasJson.componentSet && $(outInner).find("#ortum_script").append(`<script>window.ortum_componentSet = ${JSON.stringify(datasJson.componentSet)} <\/script>`)
        //插入script
        datasJson.script && datasJson.script.forEach((index,item)=>{
            $(outInner).find("#ortum_script").append($(item))
        })

        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([outInner[0].outerHTML]);
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
        //select的change事件
        $('#ortum_collapseOne select').on('change',function(e){
            let nameVal = $(this).attr('name')
            if(nameVal){
                let nameValArr = nameVal.split('_') || [];
                nameValArr.length && Global.ortum_edit_component &&
                Global.ortum_edit_component.changeEvent &&
                Global.ortum_edit_component.changeEvent(nameValArr[nameValArr.length-1],$(this),e);
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
     * 从json的componentProperties渲染成 dom
     * @param prevArrJSON
     * @param parentDom
     * @param way
     */
    let JsonPropsRenderDom = function (prevArrJSON,parentDom,way="append") {
        switch (way) {
            case 'append':
                for(let item of prevArrJSON){
                    let frame = item.frame;
                    let componentKey = item.componentKey;
                    let component_properties = require("assist").jsonParase(item.componentProperties);

                    let appendDom = CreateDom[Settings.menuListDataJSON[componentKey].createFn](null,frame,{
                        customProps:component_properties,
                    })
                    $(parentDom).append(appendDom)
                    if(item.children && item.children.length){
                        JsonPropsRenderDom(item.children,appendDom,"replace")
                    }
                }
                break;
            case "replace":
                for(let item of prevArrJSON){
                    let frame = item.frame;
                    let componentKey = item.componentKey;
                    let component_properties = require("assist").jsonParase(item.componentProperties);

                    let appendDom = CreateDom[Settings.menuListDataJSON[componentKey].createFn](null,frame,{
                        customProps:component_properties,
                    })
                    $(parentDom).find("*[data-children=true]").eq(0).replaceWith(appendDom)

                    if(item.children && item.children.length){
                        JsonPropsRenderDom(item.children,appendDom,"replace")
                        for(let item2 of item.children){
                            JsonPropsRenderDom(item2,)
                        }
                    }
                }
                break;
        }
        // let cssDomSet = [];
        // let scriptDomSet = [];
        // let componentSet = {};//组件集合
        // for(let item of prevArrJSON){
        //     let htmlDom = $(item.html)
        //     if(item.children.length){
        //         let backDatas =JsonHtmlRenderDom(item.children,htmlDom,"replace");
        //         cssDomSet = cssDomSet.concat(backDatas.css);
        //         scriptDomSet = scriptDomSet.concat(backDatas.script);
        //         Object.assign(componentSet,backDatas.componentSet)
        //     }
        //     if(way=="append" && item.html){
        //         parentDom.append(htmlDom)
        //     }
        //     if(way=="replace" && item.html){
        //         $(parentDom).find("ortum_children").eq(0).replaceWith(item.html)
        //     }
        //
        //     item.css && cssDomSet.push(item.css);
        //     item.script && scriptDomSet.push(item.script);
        //
        //     //将框架，组件类型， name 和 ortum的属性，合并到一个json中
        //     componentSet[item.name] = {
        //         name:item.name,
        //         componentProperties:item.componentProperties,
        //         frame:item.frame,
        //         componentKey:item.componentKey,
        //     }
        // }
        // return {
        //     dom:parentDom,
        //     css:cssDomSet,
        //     script:scriptDomSet,
        //     componentSet:componentSet,
        // }
    };
    /**
     * 功能：从json的html渲染成 dom
     * @param prevArrJSON dom树
     * @param parentDom 父级dom
     * @param way 子级插入父级的方式
     */
    let JsonHtmlRenderDom = function (prevArrJSON,parentDom,way="append") {
        let cssDomSet = [];
        let scriptDomSet = [];
        let componentSet = {};//组件集合
        for(let item of prevArrJSON){
            let htmlDom = $(item.html)
            if(item.children.length){
                let backDatas =JsonHtmlRenderDom(item.children,htmlDom,"replace");
                cssDomSet = cssDomSet.concat(backDatas.css);
                scriptDomSet = scriptDomSet.concat(backDatas.script);
                Object.assign(componentSet,backDatas.componentSet)
            }
            if(way=="append" && item.html){
                parentDom.append(htmlDom)
            }
            if(way=="replace" && item.html){
                $(parentDom).find("ortum_children").eq(0).replaceWith(item.html)
            }

            item.css && cssDomSet.push(item.css);
            item.script && scriptDomSet.push(item.script);

            //将框架，组件类型， name 和 ortum的属性，合并到一个json中
            componentSet[item.name] = {
                name:item.name,
                componentProperties:item.componentProperties,
                frame:item.frame,
                componentKey:item.componentKey,
            }
        }
        return {
            dom:parentDom,
            css:cssDomSet,
            script:scriptDomSet,
            componentSet:componentSet,
        }
    };

    /**
     * 功能: 获取win下表单信息,生成dom节点
     * @param {*} id 
     * @param {*} win 
     */
    let getFormContentHtml =function(mode="id",datas={"win":window}){
        !datas.win && (datas.win = window.document);
        switch (mode) {
            case "id":
                if(!datas.id){
                    return $("缺少id")
                }
                let prevHtml =$(`
                    <div id="ortum_field_preview"></div>
                `)

                $(datas.win).find('#'+datas.id).find(".ortum_item").each(function(index,item){
                    let appendDom;

                    let frame= $(item).attr("data-frame");
                    let componentKey = $(item).attr("data-componentKey");

                    //如果父级存在bootstrap的grid，不进行处理
                    if($(item).parents(".ortum_bootstrap_grid").length){
                        return true;
                    }
                    //组件为bootstrap_grid时，特殊处理
                    if(frame == "Bootstrap" && componentKey == "gridDom"){
                        let bootstrapGridSonArr = getFormContentHtml(mode="dom",{dom:$(item),win:datas.win})
                        appendDom = CreateDom[Settings.menuListDataJSON[componentKey].createFn](null,frame,{
                            customProps:$(item).prop('ortum_component_properties'),
                            generateDom:true,
                            clickChangeAttrs:false,
                            createWaitSpan:false,
                            bindDropEvent:false,
                        })
                        $(appendDom).find(".ortum_boot_col_default").each(function (index2,item2) {
                            if(bootstrapGridSonArr[index2]){
                                $(item2).removeClass("ortum_boot_col_waitInsert")
                                $(item2).html(bootstrapGridSonArr[index2])
                            }
                        })
                        prevHtml.append(appendDom)
                    }
                    frame && componentKey && !appendDom && (
                        prevHtml.append(CreateDom[Settings.menuListDataJSON[componentKey].createFn](null,frame,{
                            customProps:$(item).prop('ortum_component_properties'),
                            generateDom:true,
                            clickChangeAttrs:false,
                        }))
                    )
                })
                return prevHtml;
                break;
            case "dom"://处理bootstrap的grid
                if(!datas.dom){
                    return $("缺少dom")
                }

                let prevHtmlArr = [];

                $(datas.win).find(datas.dom).find(".ortum_boot_col_default").each(function(index,item){
                    let OrtumItem = $(item).find(".ortum_item")
                    if(!OrtumItem.length){
                        return true;
                    }
                    let frame= $(OrtumItem).eq(0).attr("data-frame");
                    let componentKey = $(OrtumItem).eq(0).attr("data-componentKey");
                    frame && componentKey && (
                        prevHtmlArr[index] = CreateDom[Settings.menuListDataJSON[componentKey].createFn](null,frame,{
                            customProps:$(OrtumItem).prop('ortum_component_properties'),
                            generateDom:true,
                            clickChangeAttrs:false,
                        })
                    )
                })
                return  prevHtmlArr;
                break;
            default:
                break;
        }
    }
    /**
     * 功能: 获取win下表单信息,生成对应的dom数组
     * @param {*} id
     * @param {*} win
     */
    let getFormContentJson = function(mode="id",datas={"win":window}){
        let parentsJson = [];
        if(datas && datas.parentsJson){
            parentsJson = datas.parentsJson;
        }

        !datas.win && (datas.win = window.document);
        let HasProperties = false;//保存Properties
        if(datas && datas.HasProperties){
            HasProperties = true;
        }

        switch (mode) {
            case "id":
                if(!datas.id){
                    return $("缺少id")
                }
                $(datas.win).find('#'+datas.id).find(".ortum_item").each(function(index,item){
                    //父级存在ortum_item，不在该case处理，在case: "dom"处理
                    if($(item).parents(".ortum_item").length){
                        return true;
                    };

                    let frame= $(item).attr("data-frame");
                    let componentKey = $(item).attr("data-componentKey");

                    let comDom = CreateDom[Settings.menuListDataJSON[componentKey].createFn](null,frame,{
                        customProps:$(item).prop('ortum_component_properties'),
                        createJson:true,//生成对应的json
                        generateDom:true,
                        clickChangeAttrs:false,
                        bindDropEvent:false,
                        createWaitSpan:false,
                        HasProperties:HasProperties,
                    });
                    parentsJson.push({
                        "frame":frame,
                        "componentKey":componentKey,
                        "title":comDom.title,
                        "name":comDom.name,
                        "html":comDom.html,
                        "attrs":comDom.attrs,
                        "css":comDom.css,
                        "script":comDom.script,
                        "children":comDom.children || [],
                        "bindComponentName":comDom.bindComponentName,
                        "componentProperties":comDom.componentProperties,
                        //table独有
                        "ortum_table_add_context":comDom.ortum_table_add_context,
                    })



                    //如果是Bootstrap_tableDom 不在向下寻找ortum_item;
                    if(frame == "Bootstrap" && componentKey == "tableDom"){
                        return true;
                    }
                    let parentsJsonLength = parentsJson.length;
                    $(item).find(".ortum_item").each(function(index2,html2){
                        getFormContentJson(mode="dom",{
                            "dom":$(html2),
                            "win":datas.win,
                            "parent":parentsJson[parentsJsonLength-1],
                            "HasProperties":HasProperties,
                        });
                    })
                })
                return parentsJson;
                break;
            case "dom"://处理bootstrap的grid
                if(!datas.dom){
                    return $("缺少dom")
                }
                if(!datas.parent){
                    return $("缺少parent")
                }
                let frame= $(datas.dom).attr("data-frame");
                let componentKey = $(datas.dom).attr("data-componentKey");

                let comDom = CreateDom[Settings.menuListDataJSON[componentKey].createFn](null,frame,{
                    customProps:$(datas.dom).prop('ortum_component_properties'),
                    createJson:true,//生成对应的json
                    generateDom:true,
                    clickChangeAttrs:false,
                    bindDropEvent:false,
                    createWaitSpan:false,
                    HasProperties:HasProperties,
                });

                datas.parent.children.push({
                    "frame":frame,
                    "componentKey":componentKey,
                    "name":comDom.name,
                    "html":comDom.html,
                    "attrs":comDom.attrs,
                    "css":comDom.css,
                    "script":comDom.script,
                    "children":[],
                    "title":comDom.title,
                    "bindComponentName":comDom.bindComponentName,
                    "componentProperties":comDom.componentProperties,

                    "ortum_table_add_context":comDom.ortum_table_add_context,
                });
                let length = datas.parent.children.length;
                $(datas.dom).find(".ortum_item").each(function(index2,html2){
                    getFormContentJson(mode="dom",{
                        "dom":$(html2),
                        "win":datas.win,
                        "parent":datas.parent.children[length-1],
                        "HasProperties":HasProperties,
                    })
                })
                break;
            default:
                break;
        }
    }
    /**
     * 功能：预览文件内容,html方式
     * @param {*} id 
     */
    let previewTableHtmlContent = function(id){
        window.open("preview.html","preview")
        return false;
    }
    /**
     * 功能：预览文件内容,Blob方式
     * @param {*} id 
     */
    let previewTableBlobContent = function(id){
        let urlOrigin=window.location.origin;
        let outInner = `
        <!DOCTYPE HTML>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>ortum预览</title>
            <link rel="stylesheet" href="${urlOrigin}/css/index.css">
            <link rel="stylesheet" href="${urlOrigin}/css/bootstrap.css">
            <link rel="stylesheet" href="${urlOrigin}/css/iconfont.css">
            <!-- 引入bootstrap css-->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
            
            <script src="${urlOrigin}/lib/jquery.min.js"></script>
        
            <!-- 引入bootstrap js -->
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"><\/script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"><\/script>
        
            <script src="${urlOrigin}/lib/ortumReq.js"><\/script>
        </head>
        <body>
            <div id="ortum_preview_ModalLabel_body"></div>
            
            <script>
                let prev = window.opener.require("feature").getFormContentHtml("id",{id:"ortum_field",win:window.opener.document})
                $("#ortum_preview_ModalLabel_body").html(prev)
            <\/script>
        </body>
        </html>
        `;
        //先销毁
        if(Global.ortum_preview_windowSonUrl){
            window.URL.revokeObjectURL(Global.ortum_preview_windowSonUrl)
            Global.ortum_preview_windowSonUrl =null;
        }

        var oMyBlob = new Blob([outInner], {type : 'text/html'}); //得到 blob
        var urldemo = Global.ortum_preview_windowSonUrl = window.URL.createObjectURL(oMyBlob);//url
        //重新打开窗口
        var winSon= window.open(urldemo,"preview");
        
        return false;
    }

    /**
     * 功能: 找到表单中有prop的组件信息
     * @param dom 查找的dom范围
     * @param props 包含的prop
     * @param exclude 排除的名称
     * @returns {[]}
     */
    let getFormComponentsProps = function(ajaxDom,props=["id","name"],exclude={}){
        let backArr = [];
        let dom = ajaxDom || $("#ortum_body");
        if(Array.isArray(props)){
            for(let propName of props){
                $(dom).find("input,select,textarea").each(function(index,item){
                    let parentProp = $(item).parents(".ortum_item").eq(0).prop('ortum_component_properties');
                    if($(item).prop(propName)){
                        backArr.push({
                            id:propName+ "_"+$(item).prop(propName),
                            text:$(item).prop(propName),
                            title: parentProp.data.title|| parentProp.data.labelName,
                            type:propName,
                        })
                    }
                })
            }
        }else{
            let propName = props.toString();
            $(dom).find("input,select,textarea").each(function(index,item){
                let parentProp = $(item).parents(".ortum_item").eq(0).prop('ortum_component_properties');
                if($(item).prop(propName)){
                    backArr.push({
                        id:propName+ "_"+$(item).prop(propName),
                        text:$(item).prop(propName),
                        title: parentProp.data.title|| parentProp.data.labelName,
                        type:propName,
                    })
                }
            })
        }
        return backArr;
    };

    /**
     * 功能：绑定拖拽事件到ortum_Item
     * @param {*} ele 
     */
    let bindDropEventToOrtumItem = function(ele){
        $(ele).on('dragover.firstbind',function(e){
            return false;
        })
        $(ele).on('drop.firstbind',function(e){
            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');
            if(!componentKey){//不存在对应key
                return false;
            }

            if(!require('createDom')[Settings.menuListDataJSON[componentKey].createFn]){
                Assist.dangerTip();
                return false;
            }

            //执行对应的生成组件的函数(此处要解决 grid.js 与createDom 循环依赖的问题)
            let createDom = require('createDom')[Settings.menuListDataJSON[componentKey].createFn](null,Global.ortum_createDom_frame)
            let parentsItemLength = $(this).parents(".ortum_item").length;
            if(parentsItemLength){
                $(this).parents(".ortum_item").eq(parentsItemLength-1).before(createDom)
            }else{
                $(this).before(createDom)
            }
            
            //把拖拽对象制空
            Global.ortumNowDragObj = null;

            return false;
        })
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

        getFormComponentsProps,

        getFormContentHtml,//预览
        previewTableBlobContent,
        previewTableHtmlContent,

        JsonPropsRenderDom,//props生成dom
        JsonHtmlRenderDom,//dom数生成dom
        getFormContentJson,//生成dom数组

        bindDropEventToOrtumItem,//ortum_item的拖拽事件
    }
})