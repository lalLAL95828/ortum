define(["config","assist","Global",'CreateDom'],function(Config,Assist,Global,CreateDom){
    /**
     * 功能：初始化函数
     * @param {*} mainId 
     */
    let init = function(mainId){
        //可以创建的组件数组转Json
        // Config.menuListDataJSON = Assist.toggleMapArr(Config.menuListsData)

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
        Config.menuListsData.forEach(element => {
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
        //绑定事件
        return item;
    };

    /**
     * 功能：给可拖拽组件添加事件
     *  */
    let bindFeatureToComponents = function(ele){
        // ele.onclick = function(){
        //     console.log("你好")
        //     debugger
        // }

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
            e.preventDefault();//阻值浏览器对拖拽对象进行处理
            // var dropData = e.dataTransfer.getData("dragTarget");

            if($(this).hasClass('ortum_field_originState')){
                $(this).removeClass('ortum_field_originState')
                this.innerHTML = "";
            }
            // console.log(nowDragObj.toString())
            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');

            //执行对应的生成组件的函数
            CreateDom[Config.menuListDataJSON[componentKey].createFn](this,Config.menuListDataJSON[componentKey].useType)
            //eval( CreateDom[Config.menuListDataJSON[componentKey].createFn]+ "("+ this +","+ Config.menuListDataJSON[componentKey].useType +")");
            
            // this.appendChild(Global.ortumNowDragObj.cloneNode(true))//深copy
            Global.ortumNowDragObj = null;
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
     * 功能：创建右键菜单
     *  */ 
    let createContextMenuObj = function (e){
        let xClientAxis = e.clientX
        //获取当前浏览器可视大小
        let widInnerWidth = window.innerWidth;
        let xDis = widInnerWidth - xClientAxis;

        let leftChange =0;
        //120为最大宽度
        if(xDis <=  (Config.contextMenuWidth +14)){
            leftChange = xClientAxis-Config.contextMenuWidth-14;
        }else{
            leftChange =xClientAxis
        }
        let topChange =e.pageY;
        let targetHeight = parseFloat($(e.target).css('height'))//Feild的高度
        if(e.clientY + Config.contextMenuMaxHeight-22 >=  targetHeight){
            topChange = topChange - (e.clientY+Config.contextMenuMaxHeight-22-targetHeight);
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
            ulObj.style.maxHeight = Config.contextMenuMaxHeight + "px";
            ulObj.style.width = Config.contextMenuWidth + "px";
            for(let i=0 ;i<Config.menuListsData.length;i++){
                let liObj = document.createElement('li');
                liObj.dataset.key = Config.menuListsData[i].key;
                liObj.innerText = Config.menuListsData[i].name;
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

    return {
        createContextMenuObj:createContextMenuObj,
        init:init,
        bindFeatureToOrtumField:bindFeatureToOrtumField,
        bindFeatureToComponents:bindFeatureToComponents,
    }
})