/* ortun的辅助函数 */
define(["settings","global",'createDom'],function(Settings,Global,CreateDom,){
    /**
     * 功能：初始化函数
     * @param {*} mainId 
     */
    let init = function(mainId){
        let ortumMain = document.getElementById(mainId)
        let ortumLeft = $(ortumMain).find('#ortum_left').eq(0);//左边部分
        let ortumBody = $(ortumMain).find('#ortum_body').eq(0);//中间部分

        let formComponents = $(".ortum_components[data-type=form]").eq(0);
        let layoutComponents = $(".ortum_components[data-type=layout]").eq(0);
        let decorateComponents = $(".ortum_components[data-type=decorate]").eq(0);

        // let ortumComponents = document.createElement("div");
        // ortumComponents.className = 'ortum_components';
        // Global.ortumComponents = ortumComponents;
        
        let ortumField = document.createElement("div");
        ortumField.id = 'ortum_field';


        Global.ortumField = ortumField;
        bindFeatureToOrtumField(ortumField);

        //创建文档片段，一次传入多个doomappendChild
        let layoutFragment = document.createDocumentFragment();
        let formFragment = document.createDocumentFragment();
        let decorateFragment = document.createDocumentFragment();
        Settings.menuListsData.forEach(element => {
            let item =createDragComponents(element);
            //此处的dom节点要做存储处理
            Global.ortumItem[element.key] = item;
            //绑定事件
            bindFeatureToComponents(item);

            if(element.sort == "decorate"){
                decorateFragment.appendChild(item)
            };
            if(element.sort == "form"){
                formFragment.appendChild(item)
            };
            if(element.sort == "layout"){
                layoutFragment.appendChild(item)
            };
            // fragment.appendChild(item)
        });
        formComponents.append(formFragment);
        layoutComponents.append(layoutFragment);
        decorateComponents.append(decorateFragment);

        // ortumComponents.appendChild(fragment);
        // $(ortumLeft).append(ortumComponents)

        $(ortumBody).append(ortumField)

        //事件监听注册
        $('#ortum_import_file').on('change',importFileListen)
        propertiesSetListen();

        //监听键盘事件
        $(document).on("keydown",function(e){
            Global.ortum_keydown_event = {
                evenObj:e,
                ctrlKey:e.ctrlKey,
                keyCode:e.keyCode,
                shiftKey:e.shiftKey,
            }

        });
        $(document).on("keyup",function(e){
            Global.ortum_keydown_event = null;
        })

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
        // let ortum_dragenter = undefined;

        ele.ondragover = function(e){
            e.preventDefault();//ondrop事件才能触发
        }
        ele.ondragenter = function(e){//有拖动对象(包括自己作为拖动对象)进入我的领空时
            if(!Global.ortumNowDragObj)return false;
            ortumDragShadow(e,"enter",{That:this,addWay:"append"});
            return false;
        };

        ele.ondrop = function(e){
            ortumDragShadow(e,"drop",{That:this});

            if(!Global.ortumNowDragObj)return;

            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');
            //拖拽的是绘制区的组件
            let hasOrtumItem = $(Global.ortumNowDragObj).hasClass("ortum_item");

            if(hasOrtumItem){
                //执行对应的生成组件的函数(此处要解决 grid.js 与createDom 循环依赖的问题)
                let createDom =$(Global.ortumNowDragObj);
                $(this).append(createDom)

            }else{
                if(!CreateDom[Settings.menuListDataJSON[componentKey].createFn] || !CreateDom[Settings.menuListDataJSON[componentKey].createFn]["ortum_"+Global.ortum_createDom_frame]){
                    require("assist").dangerTip();
                    return false;
                };
                $("#originState").addClass("originStateHide");
                //执行对应的生成组件的函数
                CreateDom[Settings.menuListDataJSON[componentKey].createFn](this,Global.ortum_createDom_frame);
            }
            //清空正在拖拽的对象
            Global.ortumNowDragObj = null;
            e.preventDefault();//阻值浏览器对拖拽对象进行处理
            // var dropData = e.dataTransfer.getData("dragTarget");
            
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
        let FileOne = FileList[0];
        if(!FileOne)return false;
        if(FileList.length>2){
            // require("assist").dangerTip("只能导入一个html和js文件！");
            require("assist").dangerTip("只能一个json文件！");
            return false;
        }

        // var name = FileOne.name; //读取选中文件的文件名
        // var size = FileOne.size; //读取选中文件的大小
        let type = FileOne.type; //读取选中文件的mime
        if(type != "application/json"){
            require("assist").dangerTip("文件的MIME类型不是application/json")
            return false;
        }

        var reader = new FileReader();
        reader.readAsText(FileOne);
        reader.onload = function() {
            let jsonInfo = JSON.parse(this.result);
            let contenHtml = JSON.parse(jsonInfo.contentHtml);
            if(jsonInfo.id){
                switchTableAct("edit",{formId:jsonInfo.id,version:jsonInfo.version,formName:jsonInfo.formName,formCode:jsonInfo.formCode})

                $("#ortum_field").empty();
                $("#originState").addClass("originStateHide");

                JsonPropsRenderDom(contenHtml.ortumJson,$("#ortum_field"),"append");
                Global.ortum_life_json = contenHtml.ortumSet;
                Global.ortum_life_function = contenHtml.ortumJS;
                Global.ortum_life_Css = contenHtml.ortumCss;
            }else{
                switchTableAct("new");

                $("#ortum_field").empty();
                $("#originState").addClass("originStateHide");

                JsonPropsRenderDom(contenHtml.ortumJson,$("#ortum_field"),"append");
                Global.ortum_life_json = contenHtml.ortumSet;
                Global.ortum_life_function = contenHtml.ortumJS;
                Global.ortum_life_Css = contenHtml.ortumCss;
            }
        }
    }
    let exportJsonFileListen = function(e){
        let tableName = $("#ortum_table_name").val().trim();
        let tableCode = $("#ortum_table_code").val().trim();
        let actWay = $(".ortum_table_method").eq(0).attr('data-method') || "newPCTable";
        let formId = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-formid") || '';
        let formVersion = $("#ortum_table_info .ortum_table_method").eq(0).attr("data-version") || 0;
        // if(!tableName){
        //     require("assist").dangerTip("表单名称不可为空")
        //     return;
        // }
        // if(!tableCode){
        //     require("assist").dangerTip("表单编号不可为空")
        //     return;
        // }
        let ortumJson = getFormContentJson("id",{id:"ortum_field",HasProperties:true});
        let ortumJS = Global.ortum_life_function;
        let ortumSet = Global.ortum_life_json;
        let ortumCss = Global.ortum_life_Css;

        let getTitleAndName =  getTitleAndNameFun(ortumJson)//后端需要的数据

        let titleArr = getTitleAndName.titleArr;
        let nameArr = getTitleAndName.nameArr;

        //获取localstore中的信息
        // let CATARC_INFO_SYS = window.localStorage.getItem("CATARC_INFO_SYS");
        // let account = JSON.parse(CATARC_INFO_SYS).account;
        // let usename = JSON.parse(account).usname;
        let ajaxJsom = {
            columnID:nameArr.toString(),
            columnName:titleArr.toString(),
            contentHtml:JSON.stringify({
                ortumJson:ortumJson,
                ortumJS:ortumJS,
                ortumSet:ortumSet,
                ortumCss:ortumCss,
            }),
            editor:"ortum",
            // editName:usename,
            editTime:new Date().toLocaleString(),
            formCode:tableCode,
            formName:tableName,
            id:formId,
            version:formVersion*1,
        }
        if(actWay == "newPCTable"){
            ajaxJsom.dataSourceId = '';
            ajaxJsom.delFlag = '0';
            ajaxJsom.formWrite = '0';
        };


        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([JSON.stringify(ajaxJsom)]);
        let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")//参考https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElementNS
        save_link.href = urlObject.createObjectURL(export_blob);
        // urlObject.revokeObjectURL(save_link.href);//一般需要从内存中释放objectURL
        save_link.download = tableName ? (tableName+".json") : "表单.json";
        let ev = document.createEvent("MouseEvents");//原生实现一个点击事件
        ev.initMouseEvent(
            "click", true, false, window, 0, 0, 0, 0, 0
            , false, false, false, false, 0, null
        );
        save_link.dispatchEvent(ev);
    };
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
        datasJson.css && datasJson.css.forEach((item,index)=>{
            $(outInner).find("#ortum_css").append($(item))
        })
        //插入html
        $(outInner).find("#ortum_html").append(prevDom);

        //保存ortum组件属性
        //datasJson.componentSet && $(outInner).find("#ortum_script").append(`<script>window.ortum_componentSet = ${JSON.stringify(datasJson.componentSet)} <\/script>`)
        //插入script
        datasJson.script && datasJson.script.forEach((item,index)=>{
            $(outInner).find("#ortum_script").append($(item))
        });

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
        if(!Array.isArray(prevArrJSON))return false;
        prevArrJSON.forEach(function (item) {
            let domItem = item;
            /*if(item.childrenType == "choose"){
                (typeof item.chooseFun !=="function") && (item.chooseFun = Function('return ' + item.chooseFun)());
                domItem = item.chooseFun(parentDom);
            };*/
            let frame = domItem.frame;
            let componentKey = domItem.componentKey;
            let component_properties = require("assist").jsonParase(domItem.componentProperties);

            let appendDom;
            if(frame && componentKey){
                appendDom= CreateDom[Settings.menuListDataJSON[componentKey].createFn](null,frame,{
                    customProps:component_properties,
                });
            }else if(domItem.html){
                appendDom= domItem.html;
            }else{
                console.error("缺少渲染节点");
            }

            switch (way) {
                case 'append':
                    $(parentDom).append(appendDom);
                    break;
                case "replace":
                    if(parentDom.find("*[data-children]").length && /[\d]+$/.test(domItem.ortumChildren)){
                        parentDom.find("*[data-children="+ domItem.ortumChildren +"]").eq(0).html(appendDom);
                    }else if(parentDom.find("*[data-children]").length){
                        parentDom.find("*[data-children]").eq(0).html(appendDom);
                    };
                    break;
            };

            //如果是bootstrap的grid，不处理其children
            if(frame == "Bootstrap" && componentKey=="tableDom"){
                //return，break会终止for of循环
                //forEach的return实现continue的效果
                return;
            };

            if(domItem.children && domItem.children.length){
                JsonPropsRenderDom(domItem.children,appendDom,"replace")
            };
        })

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
            let domItem = item;
            if(item.childrenType == "choose" && item.chooseFun){
                (typeof item.chooseFun !=="function") && (item.chooseFun = Function('return ' + item.chooseFun)());
                domItem = item.chooseFun(parentDom);
            };
            let htmlDom = $(domItem.html);
            if(domItem.children && domItem.children.length){
                let backDatas =JsonHtmlRenderDom(domItem.children,htmlDom,"replace");
                cssDomSet = cssDomSet.concat(backDatas.css);
                scriptDomSet = scriptDomSet.concat(backDatas.script);
                Object.assign(componentSet,backDatas.componentSet)
            };
            if(way=="append" && domItem.html){
                parentDom.append(htmlDom);
            };
            if(way=="replace" && domItem.html){
                if(parentDom.find("ortum_children").length && /[\d]+$/.test(domItem.ortumChildren)){
                    parentDom.find("ortum_children[data-order="+ domItem.ortumChildren +"]").eq(0).replaceWith(htmlDom);
                }else if(parentDom.find("ortum_children").length){
                    parentDom.find("ortum_children").eq(0).replaceWith(htmlDom);
                };
            };

            domItem.css && cssDomSet.push(domItem.css);
            domItem.script && scriptDomSet.push(domItem.script);

            //将框架，组件类型， name 和 ortum的属性，合并到一个json中
            componentSet[domItem.name] = {
                name:domItem.name,
                componentProperties:domItem.componentProperties,
                frame:domItem.frame,
                componentKey:domItem.componentKey,
                html:domItem.html,
            };
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
    /* let getFormContentHtml =function(mode="id",datas={"win":window}){
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
                            clickChangeAttrs:false,
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
                            clickChangeAttrs:false,
                        })
                    )
                })
                return  prevHtmlArr;
                break;
            default:
                break;
        }
    } */

    /**
     * 功能: 根据html获取组件的json数组
     * TODO 待完善该方法
     * @param {*} mode 
     * @param {*} datas 
     */
    let getFormHTMLToJson  = function(mode="id",datas={"win":window}){
        let parentsJson = [];
        if(datas && datas.parentsJson){
            parentsJson = datas.parentsJson;
        }
        !datas.win && (datas.win = window.document);
        $(datas.win).find('#'+datas.id).find(".ortum_item").each(function(index,item){
            let parentOne = $(item).parent();
            let parentOrtumItem =$(item).parents(".ortum_item").eq(0);
            if(parentOrtumItem.length){
                parentsJson.push({
                    // "frame":frame,
                    // "children":[],
                    // "ortumItem":$(item),
                    // "componentKey":componentKey,
                    // "customProps":$(item).prop('ortum_component_properties'),
                });

            }else{

            }

        })

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
        let ortumChildren = null;
        if(datas && /[\d]+$/.test(datas.ortumChildren)){
            ortumChildren = datas.ortumChildren;
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
                        ortumItemDom:$(item),
                        createJson:true,//生成对应的json
                        clickChangeAttrs:false,//点击修改属性
                        bindDropEvent:false,//绑定拖拽事件
                        HasProperties:HasProperties,//保存组件属性
                        ortumChildren:ortumChildren,
                    });
                    parentsJson.push(Object.assign({
                        "frame":frame,
                        "children":[],
                        "componentKey":componentKey,
                    },comDom));

                    //如果是Bootstrap_tableDom 不在向下寻找ortum_item;
                    if(frame == "Bootstrap" && componentKey == "tableDom"){
                        return true;
                    };
                    let parentsJsonLength = parentsJson.length;
                    $(item).find(".ortum_item").each(function(index2,item2){
                        if($(item2).parents(".ortum_item")[0] !== $(item)[0]){
                            return true;
                        };

                        let ortumChildrenOrder = $(item2).parent().attr("data-children");
                        !/[\d]+$/.test(ortumChildrenOrder) && (ortumChildrenOrder = index2);
                        getFormContentJson("dom",{
                            "dom":$(item2),
                            "win":datas.win,
                            "parent":parentsJson[parentsJsonLength-1],
                            "HasProperties":HasProperties,
                            "ortumChildren":ortumChildrenOrder,
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
                    ortumItemDom:$(datas.dom),
                    createJson:true,//生成对应的json
                    clickChangeAttrs:false,
                    bindDropEvent:false,
                    HasProperties:HasProperties,
                    ortumChildren:ortumChildren,
                });

                datas.parent.children.push(Object.assign({
                    "frame":frame,
                    "children":[],
                    "componentKey":componentKey,
                },comDom));

                //如果是Bootstrap_tableDom 不在向下寻找ortum_item;
                if(frame == "Bootstrap" && componentKey == "tableDom"){
                    return true;
                };

                let length = datas.parent.children.length;
                $(datas.dom).find(".ortum_item").each(function(index2,item2){
                    if($(item2).parents(".ortum_item")[0] !== $(datas.dom)[0]){
                        return true;
                    };
                    let ortumChildrenOrder = $(item2).parent().attr("data-order");
                    !/[\d]+$/.test(ortumChildrenOrder) && (ortumChildrenOrder = index2);
                    getFormContentJson("dom",{
                        "dom":$(item2),
                        "win":datas.win,
                        "parent":datas.parent.children[length-1],
                        "HasProperties":HasProperties,
                        "ortumChildren":ortumChildrenOrder,
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
        // window.open("styleHtml.html","preview")
        return false;
    }
    /**
     * 功能：预览文件内容,Blob方式
     * @param {*} id 
     */
    /* let previewTableBlobContent = function(id){
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
            <div id="ortum_form_Modal_body"></div>
            
            <script>
                let prev = window.opener.require("feature").getFormContentHtml("id",{id:"ortum_field",win:window.opener.document})
                $("#ortum_form_Modal_body").html(prev)
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
    } */

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
                        });
                    };
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
        });

        $(ele).on("dragenter.firstbind",function(e){//有拖动对象(包括自己作为拖动对象)进入我的领空时
            if(!Global.ortumNowDragObj)return false;
           
            let parentsItemLength = $(this).parents(".ortum_item").length;
            if(parentsItemLength){
                ortumDragShadow(e,"enter",{That:$(this).parents(".ortum_item").eq(parentsItemLength-1),addWay:"before"})
            }else{
                ortumDragShadow(e,"enter",{That:this,addWay:"before"})
            }
            return false;
        });
        
        $(ele).on('drop.firstbind',function(e){
            ortumDragShadow(e,"drop",{That:this});
            if(!Global.ortumNowDragObj){
                return false;
            }

            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');
            //拖拽的是绘制区的组件
            let hasOrtumItem = $(Global.ortumNowDragObj).hasClass("ortum_item");
            //ctrl键是否按下
            let ctrlKey = Global.ortum_keydown_event && Global.ortum_keydown_event.ctrlKey;
            if(hasOrtumItem && ctrlKey){
                Global.ortum_replace_item = $(this);
                Global.ortum_active_item = $(Global.ortumNowDragObj);
                $('#ortum_replaceItem_model').modal({
                    "backdrop":"static",
                    "keyboard":false,
                });
            }else if(hasOrtumItem){
                //执行对应的生成组件的函数(此处要解决 grid.js 与createDom 循环依赖的问题)
                let createDom =$(Global.ortumNowDragObj);
                let parentsItemLength = $(this).parents(".ortum_item").length;
                if(parentsItemLength){
                    $(this).parents(".ortum_item").eq(parentsItemLength-1).before(createDom)
                }else{
                    $(this).before(createDom)
                }
            }else if(componentKey){
                if(!require('createDom')[Settings.menuListDataJSON[componentKey].createFn]){
                    require("assist").dangerTip();
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
            }else{
                return false;
            }
            
            //把拖拽对象制空
            Global.ortumNowDragObj = null;

            return false;
        })
    };
    /**
     * 功能：从数组中获取title和name
     * @param arr
     * @returns {{titleArr: [], nameArr: []}}
     */
    let getTitleAndNameFun = function(arr){
        let nameArr = [];
        let titleArr = [];
        arr.forEach((item,index)=>{
            if(!item.bindComponentName){//该组件没有绑定组件
                if(item.name){
                    //只处理form组件
                    if(item.componentKey && require("settings").menuListDataJSON[item.componentKey].sort === "form"){
                        nameArr.push(item.name)
                        titleArr.push(item.title)
                    }else if(item.childrenType==="choose"){
                        nameArr.push(item.name)
                        titleArr.push(item.title)
                    };
                    if(item.children.length){
                        let backData = getTitleAndNameFun(item.children);
                        nameArr = nameArr.concat(backData.nameArr)
                        titleArr = titleArr.concat(backData.titleArr)
                    }
                }
            }
        })
        return {
            titleArr:titleArr,
            nameArr:nameArr,
        };
    };
    /**
     * 功能 拖拽组件显示虚拟插入位置
     * TODO 完善鼠标拖拽组件移除时的移出 绘制区域的情况
     * @param {*} way 
     * @param {*} e 
     */
    let ortumDragShadow = function(e,way="enter",position={That:this,addWay:"append"}){
        let shadowEnterDom = $(".ortum_dragenter");
        if(shadowEnterDom.length){
            shadowEnterDom = shadowEnterDom.eq(0)
        }else{
            shadowEnterDom = $('<div class="ortum_dragenter"></div>');
        }
       
        if(way == "enter"){
            if(position && position.addWay){
                switch (position.addWay){
                    case "addClass":
                        $(".ortum_dragenter_bgc").removeClass("ortum_dragenter_bgc");
                        $(".ortum_dragenter").remove();
                        $(position.That)[position.addWay]("ortum_dragenter_bgc");
                        break;
                    default:
                        $(".ortum_dragenter_bgc").removeClass("ortum_dragenter_bgc");
                        $(position.That)[position.addWay](shadowEnterDom);
                        break;
                }
            }
        }
        if(way == "leave"){
            
        }
        if(way == 'drop'){
            $(".ortum_dragenter").remove();
            $(".ortum_dragenter_bgc").removeClass("ortum_dragenter_bgc")
        }
    }

    return {
        createContextMenuObj:createContextMenuObj,
        init:init,
        bindFeatureToOrtumField:bindFeatureToOrtumField,
        bindFeatureToComponents:bindFeatureToComponents,
        
        importFileListen,
        propertiesSetListen,
        exportFileListen,
        exportJsonFileListen,
        setEditPropertiesPurview,

        getFormComponentsProps,

        // getFormContentHtml,//预览
        // previewTableBlobContent,
        previewTableHtmlContent,

        JsonPropsRenderDom,//props生成dom
        JsonHtmlRenderDom,//dom数组生成dom
        getFormContentJson,//生成dom数组
        getFormHTMLToJson,//生成dom数组 方法二

        bindDropEventToOrtumItem,//ortum_item的拖拽事件

        getTitleAndNameFun,

        ortumDragShadow,
    }
})