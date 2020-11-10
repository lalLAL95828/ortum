/* bootstrap的辅助函数 */
define(['require','assist','global',"settings"],function(require,Assist,Global,Settings){
    /**
     * table的td添加拖拽提示语
     */
    let tableTdAddTip = function(){
        let tdWaitInsert = $(`
            <span style="color:#c3bebe">插入</span>
        `);
        return tdWaitInsert;
    }

    /**
     * 功能：table的thead新增行
     */
    let tableTheadAddLine = function(thInfo,moreProps=null){
        let trCssClass='';
        let thCssClass='';
        if(Assist.getDetailType(moreProps) == "Object"){
            (moreProps.trCssClass !== undefined && moreProps.trCssClass !== null) && (trCssClass = moreProps.trCssClass);
            (moreProps.thCssClass !== undefined && moreProps.thCssClass !== null) && (thCssClass = moreProps.thCssClass);
        };

        let trInfo = $(`
            <tr
            ${trCssClass ? "class="+trCssClass : '' } 
            ></tr>
        `);

        if(Assist.getDetailType(thInfo) == "Array"){
            thInfo.forEach(function(item,index){
                let headHtml= "";
                let type = '';
                let headColspan = 1;
                let headRowspan = 1;
                (item.headHtml !== undefined && item.headHtml !== null) && (headHtml = item.headHtml);
                (item.type !== undefined && item.type !== null) && (type = item.type);
                (item.headColspan && /(^[1-9]\d*$)/.test(item.headColspan)) && (headColspan = item.headColspan);
                (item.headRowspan && /(^[1-9]\d*$)/.test(item.headRowspan)) && (headRowspan = item.headRowspan);

                //序号
                if(type == "order"){
                    headHtml= "<span>序号</span>";
                }
                //操作
                if(type == "act"){
                    headHtml= "<span>操作</span>";
                };

                $(trInfo).append(`
                <th
                colspan="${headColspan}" 
                rowspan="${headRowspan}" 
                ${thCssClass ? "class="+thCssClass : '' } 
                > ${headHtml} </th>
                `);
            })
        }
        return trInfo;
    };
    /**
     * 创建tfoot
     * @param tbodyDom
     * @param tdInfo
     * @param moreProps
     * @returns {jQuery|HTMLElement}
     */
    let tableTfootAddLine = function(tdInfo,moreProps = null){
        let trCssClass = '';
        let tdCssClass = '';

        let bindDropEvent = true;//绑定拖拽事件
        let createWaitSpan = true;//提示插入
        let createJson = false;

        if(Assist.getDetailType(moreProps) == "Object"){
            moreProps.trCssClass !== undefined && moreProps.trCssClass !== null && (trCssClass = moreProps.trCssClass);
            moreProps.tdCssClass !== undefined && moreProps.tdCssClass !== null && (tdCssClass = moreProps.tdCssClass);
            moreProps.bindDropEvent !== undefined && moreProps.bindDropEvent !== null && (bindDropEvent = moreProps.bindDropEvent);
            moreProps.createWaitSpan !== undefined && moreProps.createWaitSpan !== null && (createWaitSpan = moreProps.createWaitSpan);
            moreProps.createJson !== undefined && moreProps.createJson !== null && (createJson = moreProps.createJson);
        };
        let trInfo = $(`<tr ${trCssClass ? "class="+trCssClass : '' } ></tr>`);

        if(Assist.getDetailType(tdInfo) == "Array"){
            tdInfo.forEach(function(item,index){
                let headColspan = 1;
                (item.headColspan && /(^[1-9]\d*$)/.test(item.headColspan)) && (headColspan = item.headColspan);

                let tdDom = $(`
                    <td 
                    colspan="${item.tfootColspan}" 
                    class="${tdCssClass}">
                    </td>
                `);
                //绑定拖拽事件
                bindDropEvent && bindDropEventToBootstrapTable(tdDom,item);
                bindDropEvent && tdDom.prop("ortum_tableTd_item",item);

                //编辑table状态，并且有对应的组件
                if(createWaitSpan && item.frame && item.componentKey && require('createDom')[Settings.menuListDataJSON[item.componentKey].createFn]){
                    //创建组件的属性
                    let createComponentProp = Object.assign({
                        customName:moreProps.tableName+ "_" + "tfoot" + "_" + index ,//order代表行号
                    },item);
                    let createDom = require('createDom')[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,createComponentProp);
                    //绑定组件属性
                    item.customProps = $(createDom).prop("ortum_component_properties");
                    //当是按钮组的时候
                    tdDom && (tdDom.append(createDom));
                }else if(createWaitSpan){
                    tdDom && (
                        tdDom.append(tableTdAddTip()).addClass("ortum_boot_td_waitInsert")
                    )
                }else if(!createWaitSpan && createJson){//创建js
                    tdDom && (
                        tdDom.append(`
                            <ortum_children data-order="tfoot${index}"></ortum_children>
                        `)
                    );
                }
                trInfo.append(tdDom);
            });
        }
        return trInfo;
    };
    /**
     * table的新增tr
     * @param tbodyDom
     * @param tdInfo
     * @param moreProps
     * @returns {jQuery|HTMLElement}
     */
    let tableTbodyAddLine = function(tbodyDom=null,tdInfo,moreProps = null){
        let trCssClass='';
        let tdCssClass='';

        let bindDropEvent = true;//绑定拖拽事件
        let createWaitSpan = true;//提示插入
        let createJson = false;

        let tbodyTrNum = 0;//tbody的tr数量
        tbodyDom && (tbodyTrNum = $(tbodyDom).find("tr").length)
        let order = tbodyTrNum +1;//

        if(Assist.getDetailType(moreProps) == "Object"){
            moreProps.trCssClass !== undefined && moreProps.trCssClass !== null && (trCssClass = moreProps.trCssClass);
            moreProps.tdCssClass !== undefined && moreProps.tdCssClass !== null && (tdCssClass = moreProps.tdCssClass);
            moreProps.bindDropEvent !== undefined && moreProps.bindDropEvent !== null && (bindDropEvent = moreProps.bindDropEvent);
            moreProps.createWaitSpan !== undefined && moreProps.createWaitSpan !== null && (createWaitSpan = moreProps.createWaitSpan);
            moreProps.createJson !== undefined && moreProps.createJson !== null && (createJson = moreProps.createJson);
        };
        let trInfo = $(`<tr ${trCssClass ? "class="+trCssClass : '' } ></tr>`);

        if(Assist.getDetailType(tdInfo) == "Array"){
            tdInfo.forEach(function(item,index){
                let headColspan = 1;
                (item.headColspan && /(^[1-9]\d*$)/.test(item.headColspan)) && (headColspan = item.headColspan);

                let tdDom = $(`
                    <td 
                    colspan="${headColspan}" 
                    class="${tdCssClass}">
                    </td>
                `);
                //绑定拖拽事件
                bindDropEvent && bindDropEventToBootstrapTable(tdDom,item);
                bindDropEvent && tdDom.prop("ortum_tableTd_item",item);

                //编辑table状态，并且有对应的组件
                if(createWaitSpan && item.type){
                    switch (item.type) {
                        case "order":
                            tdDom && (
                                $(tdDom).html(`<span>${order}</span>`).attr("data-type","order")
                            );
                            break;
                        case "act":
                            let createDom = '';
                            if(tbodyTrNum==0){
                                createDom = require('createDom')[Settings.menuListDataJSON["iconButtonDom"].createFn](null,Global.ortum_createDom_frame,{
                                    "customName":moreProps.tableName+"_" + index  +"_"+ order,//1代表行号
                                    "iconName":"icon-jiahao",
                                });
                                tableActAddLine(createDom,tbodyDom,moreProps);
                                tdDom && (
                                    tdDom.html(createDom).attr("data-type","act")
                                );
                            }else{
                                createDom = require('createDom')[Settings.menuListDataJSON["iconButtonDom"].createFn](null,Global.ortum_createDom_frame,{
                                    "customName":moreProps.tableName+"_" + index  +"_"+ order,//order代表行号
                                    "iconName":"icon-shanchu",
                                });
                                tableActDelLine(createDom,moreProps);
                                tdDom && (
                                    tdDom.html(createDom).attr("data-type","act")
                                );
                            }
                            break;
                        default:
                            console.error("type类型不正确")
                            break;
                    }
                }else if(createWaitSpan && item.frame && item.componentKey && require('createDom')[Settings.menuListDataJSON[item.componentKey].createFn]){
                    //创建组件的属性
                    let createComponentProp = Object.assign({
                        customName:moreProps.tableName+"_" + index + "_" + order,//order代表行号
                    },item);
                    let createDom = require('createDom')[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,createComponentProp);
                    //绑定组件属性
                    item.customProps = $(createDom).prop("ortum_component_properties");
                    //当是按钮组的时候
                    tdDom && (tdDom.append(createDom));
                }else if(createWaitSpan){
                    tdDom && (
                        tdDom.append(tableTdAddTip()).addClass("ortum_boot_td_waitInsert")
                    )
                }else if(!createWaitSpan && createJson){//创建js
                    switch (item.type) {
                        case "order":
                            tdDom && (
                                tdDom.append(`
                                    <ortum_children data-order="${index}"></ortum_children>
                                `).attr("data-type","order")
                            );
                            break;
                        case "act":
                            if(tbodyTrNum==0){
                                tdDom && (
                                    tdDom.append(`
                                        <ortum_children data-order="${index}"></ortum_children>
                                    `).attr("data-type","act")
                                );

                            }else{
                                tdDom && (
                                    tdDom.append(`
                                        <ortum_children data-order="${index}"></ortum_children>
                                    `).attr("data-type","act")
                                );
                            }
                            break;
                        default:
                            tdDom && (
                                tdDom.append(`
                                    <ortum_children data-order="${index}"></ortum_children>
                                `)
                            );
                            break;
                    }
                }
                trInfo.append(tdDom);
            });
        }
        return trInfo;
    };

    /**
     * table的新增行操作
     * @param ele
     */
    let tableActAddLine = function(ele,fatherTbody,moreProps){
        let tbodyDom = null;
        fatherTbody && (tbodyDom = fatherTbody);
        !fatherTbody && (tbodyDom = $(ele).parents("tbody").eq(0));
        $(ele).off("click.addline").on("click.addline",".icon-jiahao",function(){
            let tdInfoArr = $(this).parents("table").eq(0).parents(".ortum_item").eq(0).prop("ortum_tbodyTds_info");
            let order = $(this).parents("table").eq(0).find("tbody > tr").length;
            moreProps.order = order+1;
            let newtr = tableTbodyAddLine(tbodyDom,tdInfoArr,moreProps);
            $(this).parents("table").eq(0).find("tbody").eq(0).append(newtr);
        });
    }
    /**
     * table的删除行操作
     * @param tableEle
     */
    let tableActDelLine = function(ele,moreProps){
        $(ele).off("click.delete").on("click.delete",function(){
            let tbodyDom = $(this).parents("tbody").eq(0);
            let trFather = $(this).parents("tr").eq(0);
            let rowIndex = $(this).parents("tr")[0].rowIndex;
            $(trFather).nextAll("tr").each(function(index,item){
                $(this).find("*[name]").each(function(index2,item2){
                    let name = $(item2).attr("name");
                    let nameArr = name.split("_");
                    if(nameArr[0] === "table"){
                        nameArr.pop();
                        nameArr.push(rowIndex + index);
                    };
                    $(item2).attr("name",nameArr.join("_"));
                });
            });
            $(this).parents("tr").eq(0).remove();
            $(tbodyDom).find("td[data-type=order]").each(function(index,item){
                $(item).find("span").eq(0).text(index+1);
            });
        })
    };

    /**
     * 给ele添加拖拽事件
     * @param ele
     */
    let bindDropEventToBootstrapTable = function(ele,item){
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
            if(componentKey == "gridDom" || componentKey == "tableDom" || componentKey == "buttonGroupDom"){
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
            }else{
                if($(this).hasClass('ortum_boot_td_waitInsert')){
                    $(this).removeClass('ortum_boot_td_waitInsert')
                    this.innerHTML = "";
                }else{
                    //TODO 确定是否替换
                    return false;
                }
                if($(this).parents("tbody").length){
                    //cellIndex  第几列，从0开始
                    //rowIndex 第几行，从1开始
                    let cellIndex = this.cellIndex;
                    let rowIndex = $(this).parents("tr")[0].rowIndex;
                    let customName = $(this).parents("table").eq(0).attr("name")+"_" + cellIndex + "_" + rowIndex;//rowIndex
                    let createDom = require('createDom')[Settings.menuListDataJSON[componentKey].createFn](null,Global.ortum_createDom_frame,{
                        customName:customName,
                    });
                    $(this).append(createDom);
                    //将绑定的组件属性，绑定到td上
                    item.customProps = $(createDom).prop("ortum_component_properties");
                    item.frame =Global.ortum_createDom_frame;
                    item.componentKey =componentKey;
                    //把拖拽对象制空
                    Global.ortumNowDragObj = null;
                }else if($(this).parents("tfoot").length){
                    let cellIndex = this.cellIndex;
                    // let rowIndex = $(this).parents("tr")[0].rowIndex;
                    let customName = $(this).parents("table").eq(0).attr("name")+"_" + "tfoot" + "_" + cellIndex;//rowIndex
                    let createDom = require('createDom')[Settings.menuListDataJSON[componentKey].createFn](null,Global.ortum_createDom_frame,{
                        customName:customName,
                    });
                    $(this).append(createDom);
                    //将绑定的组件属性，绑定到td上
                    item.customProps = $(createDom).prop("ortum_component_properties");
                    item.frame =Global.ortum_createDom_frame;
                    item.componentKey =componentKey;
                    //把拖拽对象制空
                    Global.ortumNowDragObj = null;
                }



                return false;
            }
        })
    }



    /**
     * grid 的col在未插入组件之前，默认的提示语
     */
    let tipAddComponentFn = function(createOrtumItem=true,moreProps=null){
        let bindDropEvent = true;//绑定拖拽事件
        let createWaitSpan = true;//创建待拖入提示
        let classValue = "col";
        let createJson = false;
        let ortumChildren = null;
        if(Assist.getDetailType(moreProps) == "Object"){
            (moreProps.bindDropEvent !== undefined && moreProps.bindDropEvent !== null) && (bindDropEvent = moreProps.bindDropEvent);
            (moreProps.createWaitSpan !== undefined && moreProps.createWaitSpan !== null) && (createWaitSpan = moreProps.createWaitSpan);
            moreProps.createJson !== null && moreProps.createJson !== undefined && (createJson =moreProps.createJson);
            (moreProps.classValue !== undefined && moreProps.classValue !== null) && (classValue = moreProps.classValue);
            (moreProps.ortumChildren !== undefined && moreProps.ortumChildren !== null) && (ortumChildren = moreProps.ortumChildren);
        }
        let col;//要返回的值
        if(createOrtumItem){
            col = $(`
                <div ${(ortumChildren || ortumChildren === 0) ? "data-children="+ortumChildren : ''}  class="${classValue} ortum_boot_col_default">
                    
                </div>
            `);
            bindDropEvent && bindDropEventToBootstrapGrid(col);//绑定拖拽事件
        }
        if(createWaitSpan){
            col && (
                $(col).append(`
                    <div class="ortum_boot_col_waitInsert">
                        <span>选择其他组件插入</span>
                    </div>
                `)
            );
            !col && (
                col = $(`
                    <div class="ortum_boot_col_waitInsert">
                        <span>选择其他组件插入</span>
                    </div>
                `)
            )
        }

        if(!createWaitSpan && createJson){
            col && (
                $(col).append(`
                    <ortum_children ${(ortumChildren || ortumChildren === 0) ? "data-order="+ortumChildren : ''}></ortum_children>
                `)
            );
            !col && (
                col = $(`
                    <ortum_children ${(ortumChildren || ortumChildren === 0) ? "data-order="+ortumChildren : ''}></ortum_children>
                `)
            )
        }
        return col;
    }
    /**
     * grid的拖拽事件
     * @param {*} ele 
     */
    let bindDropEventToBootstrapGrid = function(ele){
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

            if(componentKey == "gridDom" || componentKey == "tableDom"){//如果拖拽上來的是grid,则不进行创建
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
            }else{
                if($(this).find(".ortum_boot_col_waitInsert")){
                    this.innerHTML = "";
                }else{
                    //TODO 确定是否替换
                    return false;
                }

                //执行对应的生成组件的函数(此处要解决 grid.js 与createDom 循环依赖的问题)
                require('createDom')[Settings.menuListDataJSON[componentKey].createFn](this,Global.ortum_createDom_frame)
                            
                //把拖拽对象制空
                Global.ortumNowDragObj = null;

                return false;
            }
            
        })

        //右键事件
        // ele.oncontextmenu = function(e){
        //     e.preventDefault();
        //     createContextMenuObj(e)
        //     if(!e){
        //         window.event.returnValue =false;//IE
        //     }
        //     return false
        // }
    }
    /**
     * 设置组件属性
     * @param {*} properies 
     */
    let setProperties = function(properies,type,that){
        //获取监听属性改变事件
        let inputEvent =null;
        let blurEvent =null;
        let changeEvent =null;
        let clickEvent =null;
        let keyDownEvent =null;
        let keyUpEvent =null;
        //设置参数配置的函数
        let beforeSetPrperies = null;

        let componentToUpper = type.charAt(0).toUpperCase()+type.slice(1);
        inputEvent = require('BootStrap'+componentToUpper).inputSetProperties;
        blurEvent = require('BootStrap'+componentToUpper).blurSetProperties;
        changeEvent = require('BootStrap'+componentToUpper).changeSetProperties;
        clickEvent = require('BootStrap'+componentToUpper).clickSetProperties;
        keyDownEvent = require('BootStrap'+componentToUpper).keyDownSetProperties;
        keyUpEvent = require('BootStrap'+componentToUpper).keyUpSetProperties;
        beforeSetPrperies =require('BootStrap'+componentToUpper).beforeSetPrperies;
       
    
        //获取组件的属性
        let data = properies.data;
        let purview = properies.purview;
        let dataShowType = properies.dataShowType;

        //参数配置 显示之前的处理
        beforeSetPrperies && beforeSetPrperies();

        $('#ortum_collapseOne .form-group').hide();//隐藏所有属性
        for(let key in data){
            //设置编辑属性权限
            require('feature').setEditPropertiesPurview(key,purview[key]);

            //有定义数据编辑类型
            if(dataShowType && dataShowType[key]){
                switch(dataShowType[key]){
                    case "switch":
                        $('input[name=ortum_property_'+ key +']').prop("checked",data[key]); 
                        break;
                    case "checkbox":
                        $('input[name=ortum_property_'+ key +'][value='+data[key]+']').prop("checked",true); 
                        break;
                    default:
                        break;
                }
            }else{
                $('#ortum_property_'+key).val(data[key])
            }
        }
        //绑定正在编辑的对象到global对象下
        Global.ortum_edit_component={
            frame:"Bootstrap",
            type:type,

            inputEvent:inputEvent,
            blurEvent:blurEvent,
            changeEvent:changeEvent,
            clickEvent:clickEvent,
            keyDownEvent:keyDownEvent,
            keyUpEvent:keyUpEvent,
            comObj:that,
        }

    }
    /**
     * 获取id下所有的表单元素的值
     * @param {*} properies 
     */
    let getDomContextFormData = function(domId){
        let formData = {}
        let form = document.getElementById(domId);  
        let elements = new Array();  
        let inputElements = form.getElementsByTagName('input');  
        let selectElements = form.getElementsByTagName('select');  
        let textareaElements = form.getElementsByTagName('textarea');

        Array.prototype.forEach.call(inputElements,(item)=>{
            if(!item.name)return;//不存在name，不进行赋值
            for(let dataKey in item.dataset){
                if(item.dataset.hasOwnProperty(dataKey)){
                    formData[item.name+"_"+dataKey] = item.dataset[dataKey];
                }
            }
            let type = item.type.toLowerCase();
            switch (type){
                case "radio":
                    item.checked && (formData[item.name] = item.value);
                    break;
                case "checkbox":
                    if(item.name && item.name.indexOf("switch") != -1){
                        item.checked && (formData[item.name] = true);
                        !item.checked && (formData[item.name] = false);
                    }else{
                        item.checked && (formData[item.name] ? formData[item.name].push(item.value) : formData[item.name]=[item.value]);
                    }
                    break;
                default:
                    formData[item.name] = item.value;
                    break;
            }
        })

        Array.prototype.forEach.call(selectElements,(item)=>{
            if(!item.name)return;//不存在name，不进行赋值
            for(let dataKey in item.dataset){
                if(item.dataset.hasOwnProperty(dataKey)){
                    formData[item.name+"_"+dataKey] = item.dataset[dataKey];
                }
            }
            formData[item.name] = item.value;
        })
        Array.prototype.forEach.call(textareaElements,(item)=>{
            if(!item.name)return;//不存在name，不进行赋值
            for(let dataKey in item.dataset){
                if(item.dataset.hasOwnProperty(dataKey)){
                    formData[item.name+"_"+dataKey] = item.dataset[dataKey];
                }
            }
            formData[item.name] = item.value;
        })

        return formData;
    }

    return {
        tableTdAddTip,
        tableActAddLine,
        tableActDelLine,
        tableTheadAddLine,
        tableTbodyAddLine,
        tableTfootAddLine,


        tipAddComponentFn,
        bindDropEventToBootstrapGrid,
        setProperties,
        getDomContextFormData,

    };
})