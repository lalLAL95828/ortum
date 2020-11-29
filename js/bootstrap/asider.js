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
    let tableTheadAddTrLine = function(thInfo,moreProps=null){
        let trCssClass='';
        let thCssClass='';
        if(Assist.getDetailType(moreProps) == "Object"){
            (moreProps.trCssClass !== undefined && moreProps.trCssClass !== null) && (trCssClass = moreProps.trCssClass);
            (moreProps.thCssClass !== undefined && moreProps.thCssClass !== null) && (thCssClass = moreProps.thCssClass);
        };

        let trInfoArr = [];
        if(Assist.getDetailType(thInfo) == "Array"){
            thInfo.forEach(function(itemArr,indexArr){
                let trInfo = $(`
                    <tr
                    ${trCssClass ? "class="+trCssClass : '' } 
                    ></tr>
                `);
                trInfoArr.push(trInfo);
                itemArr.forEach(function(item,index){
                    let headHtml= "";
                    let type = '';
                    let colspan = 1;
                    let rowspan = 1;
                    (item.headHtml !== undefined && item.headHtml !== null) && (headHtml = item.headHtml);
                    (item.type !== undefined && item.type !== null) && (type = item.type);
                    (item.colspan && /(^[1-9]\d*$)/.test(item.colspan)) && (colspan = item.colspan);
                    (item.rowspan && /(^[1-9]\d*$)/.test(item.rowspan)) && (rowspan = item.rowspan);

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
                        colspan="${colspan}" 
                        rowspan="${rowspan}" 
                        ${thCssClass ? "class="+thCssClass : '' } 
                        > ${headHtml} </th>
                     `);
                });


            })
        }
        return trInfoArr;
    };
    /**
     * 创建tfoot
     * @param tbodyDom
     * @param tdInfo
     * @param moreProps
     * @returns {jQuery|HTMLElement}
     */
    let tableTfootAddTrLine = function(tdInfo,moreProps = null){
        let trCssClass = '';
        let tdCssClass = '';

        let bindDropEvent = true;//绑定拖拽事件
        let createJson = false;

        if(Assist.getDetailType(moreProps) == "Object"){
            moreProps.trCssClass !== undefined && moreProps.trCssClass !== null && (trCssClass = moreProps.trCssClass);
            moreProps.tdCssClass !== undefined && moreProps.tdCssClass !== null && (tdCssClass = moreProps.tdCssClass);
            moreProps.bindDropEvent !== undefined && moreProps.bindDropEvent !== null && (bindDropEvent = moreProps.bindDropEvent);
            moreProps.createJson !== undefined && moreProps.createJson !== null && (createJson = moreProps.createJson);
        };

        let trInfoArr = [];

        if(Assist.getDetailType(tdInfo) == "Array"){
            tdInfo.forEach(function(itemArr,indexArr){
                let trInfo = $(`<tr ${trCssClass ? "class="+trCssClass : '' } ></tr>`);
                trInfoArr.push(trInfo);

                itemArr.forEach(function (item,index) {
                    let headColspan = 1;
                    (item.headColspan && /(^[1-9]\d*$)/.test(item.headColspan)) && (headColspan = item.headColspan);

                    let tdDom = $(`
                        <td 
                        colspan="${item.colspan}" 
                        rowspan="${item.rowspan}"
                        class="${tdCssClass}">
                        </td>
                    `);
                    //绑定拖拽事件
                    bindDropEvent && bindDropEventToBootstrapTable(tdDom,item);
                    bindDropEvent && tdDom.prop("ortum_tableTd_item",item);

                    //编辑table状态，并且有对应的组件
                    if(bindDropEvent && item.frame && item.componentKey && require('createDom')[Settings.menuListDataJSON[item.componentKey].createFn]){
                        //创建组件的属性
                        let createComponentProp = Object.assign({
                            customName:moreProps.tableName+ "_" + "tfoot" + "_" + index + "-"+ indexArr,
                        },item);
                        if(item.uuid){
                            let customProps = $("*[ortum_uuid="+ item.uuid +"]").eq(0).prop("ortum_component_properties")
                            createComponentProp.customProps = customProps || item.customProps;
                            !customProps && delete item.uuid;
                        }
                        let createDom = require('createDom')[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,createComponentProp);

                        //绑定组件属性
                        item.customProps = $(createDom).prop("ortum_component_properties");
                        item.uuid = $(createDom).prop("ortum_component_properties").data.uuid;

                        //当是按钮组的时候
                        tdDom && (tdDom.append(createDom));
                    }else if(bindDropEvent){
                        tdDom && (
                            tdDom.append(tableTdAddTip()).addClass("ortum_boot_td_waitInsert")
                        )
                    }else if(!bindDropEvent && createJson){//创建js
                        tdDom && (
                            tdDom.append(`
                            <ortum_children data-order="tfoot${index+ "-"+ indexArr}"></ortum_children>
                        `)
                        );
                    }
                    trInfo.append(tdDom);
                })


            });
        }
        return trInfoArr;
    };
    /**
     * table的新增tr
     * @param tbodyDom
     * @param tdInfo
     * @param moreProps
     * @returns {jQuery|HTMLElement}
     */
    let tableTbodyAddTrLine = function(tbodyDom=null,tdInfo,moreProps = null){
        let trCssClass='';
        let tdCssClass='';

        let bindDropEvent = true;//绑定拖拽事件
        let createJson = false;

        let tbodyTrNum = 0;//tbody的tr数量
        tbodyDom && (tbodyTrNum = $(tbodyDom).find("tr").length)
        let order = tbodyTrNum +1;//

        if(Assist.getDetailType(moreProps) == "Object"){
            moreProps.trCssClass !== undefined && moreProps.trCssClass !== null && (trCssClass = moreProps.trCssClass);
            moreProps.tdCssClass !== undefined && moreProps.tdCssClass !== null && (tdCssClass = moreProps.tdCssClass);
            moreProps.bindDropEvent !== undefined && moreProps.bindDropEvent !== null && (bindDropEvent = moreProps.bindDropEvent);
            moreProps.createJson !== undefined && moreProps.createJson !== null && (createJson = moreProps.createJson);
        };
        let trInfoArr= [];

        if(Assist.getDetailType(tdInfo) == "Array"){
            tdInfo.forEach(function(itemArr,indexArr){
                let trInfo = $(`<tr ${trCssClass ? "class="+trCssClass : '' } ></tr>`);
                trInfoArr.push(trInfo);
                order = order + indexArr;//重新计算行号

                itemArr.forEach(function (item,index) {
                    let colspan = 1;
                    let rowspan = 1;
                    (item.colspan && /(^[1-9]\d*$)/.test(item.colspan)) && (colspan = item.colspan);
                    (item.rowspan && /(^[1-9]\d*$)/.test(item.rowspan)) && (rowspan = item.rowspan);
                    let tdDom = $(`
                    <td 
                    colspan="${colspan}" 
                    rowspan="${rowspan}" 
                    class="${tdCssClass}">
                    </td>
                `);
                    //绑定拖拽事件
                    bindDropEvent && bindDropEventToBootstrapTable(tdDom,item);
                    bindDropEvent && tdDom.prop("ortum_tableTd_item",item);

                    //编辑table状态，并且有对应的组件
                    if(bindDropEvent && item.type){
                        switch (item.type) {
                            case "order":
                                tdDom && (
                                    $(tdDom).html(`<span>${order}</span>`).attr("data-type","order")
                                );
                                break;
                            case "act":
                                let createDom = '';
                                if(tbodyTrNum==0){
                                    let customProps = undefined;
                                    if(item.uuid){
                                        customProps = $("*[ortum_uuid="+ item.uuid +"]").eq(0).prop("ortum_component_properties");
                                        !customProps && delete item.uuid;
                                    }
                                    createDom = require('createDom')[Settings.menuListDataJSON["iconButtonDom"].createFn](null,Global.ortum_createDom_frame,{
                                        "customName":moreProps.tableName+"_" + index + "-"+ indexArr  +"_"+ order,//1代表行号
                                        "iconName":"icon-jiahao",
                                        "customProps":customProps || item.customProps,
                                    });
                                    // tableTbodyAddTrLine(createDom,tbodyDom,moreProps);
                                    //绑定新增事件
                                    tableActAddTrLine(createDom,tbodyDom,moreProps);
                                    //绑定组件属性
                                    item.customProps = $(createDom).prop("ortum_component_properties");
                                    item.uuid = $(createDom).prop("ortum_component_properties").data.uuid;

                                    tdDom && (
                                        tdDom.html(createDom).attr("data-type","act")
                                    );
                                }else{
                                    let customProps = undefined;
                                    if(item.uuid){
                                        customProps = $("*[ortum_uuid="+ item.uuid +"]").eq(0).prop("ortum_component_properties");
                                        !customProps && delete item.uuid;
                                    }
                                    createDom = require('createDom')[Settings.menuListDataJSON["iconButtonDom"].createFn](null,Global.ortum_createDom_frame,{
                                        "customName":moreProps.tableName+"_" + index + "-"+ indexArr  +"_"+ order,//order代表行号
                                        "iconName":"icon-shanchu",
                                        "customProps":customProps || item.customProps,
                                    });
                                    //绑定删除事件
                                    tableActDelTrLine(createDom,moreProps);
                                    //绑定组件属性
                                    item.customProps = $(createDom).prop("ortum_component_properties");
                                    item.uuid = $(createDom).prop("ortum_component_properties").data.uuid;
                                    tdDom && (
                                        tdDom.html(createDom).attr("data-type","act")
                                    );
                                }
                                break;
                            default:
                                console.error("type类型不正确")
                                break;
                        }
                    }else if(bindDropEvent && item.frame && item.componentKey && require('createDom')[Settings.menuListDataJSON[item.componentKey].createFn]){
                        //创建组件的属性
                        let createComponentProp = Object.assign({
                            customName:moreProps.tableName+"_" + index + "-"+ indexArr + "_" + order,//order代表行号
                        },item);

                        if(item.uuid){
                            let customProps = $("*[ortum_uuid="+ item.uuid +"]").eq(0).prop("ortum_component_properties")
                            createComponentProp.customProps = customProps || item.customProps,
                            !customProps && delete item.uuid;
                        }

                        let createDom = require('createDom')[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,createComponentProp);
                        //绑定组件属性
                        item.customProps = $(createDom).prop("ortum_component_properties");
                        item.uuid = $(createDom).prop("ortum_component_properties").data.uuid;

                        //当是按钮组的时候
                        tdDom && (tdDom.append(createDom));
                    }else if(bindDropEvent){
                        tdDom && (
                            tdDom.append(tableTdAddTip()).addClass("ortum_boot_td_waitInsert")
                        )
                    }else if(!bindDropEvent && createJson){//创建js
                        switch (item.type) {
                            case "order":
                                tdDom && (
                                    tdDom.append(`
                                    <ortum_children data-order="${index + "-"+ indexArr}"></ortum_children>
                                `).attr("data-type","order")
                                );
                                break;
                            case "act":
                                if(tbodyTrNum==0){
                                    tdDom && (
                                        tdDom.append(`
                                        <ortum_children data-order="${index + "-"+ indexArr}"></ortum_children>
                                    `).attr("data-type","act")
                                    );
                                }else{
                                    tdDom && (
                                        tdDom.append(`
                                        <ortum_children data-order="${index + "-"+ indexArr}"></ortum_children>
                                    `).attr("data-type","act")
                                    );
                                }
                                break;
                            default:
                                tdDom && (
                                    tdDom.append(`
                                    <ortum_children data-order="${index + "-"+ indexArr}"></ortum_children>
                                `)
                                );
                                break;
                        }
                    }
                    trInfo.append(tdDom);
                })
            });
        };
        return trInfoArr;
    };
    /**
     * table的新增行操作
     * @param ele
     */
    let tableActAddTrLine = function(ele,fatherTbody,moreProps){
        let tbodyDom = null;
        fatherTbody && (tbodyDom = fatherTbody);
        !fatherTbody && (tbodyDom = $(ele).parents("tbody").eq(0));
        $(ele).off("click.addline").on("click.addline",".icon-jiahao",function(){
            let That = this;
            let tdInfoArr = $(this).parents("table").eq(0).parents(".ortum_item").eq(0).prop("ortum_tbodyTds_info");
            let order = $(this).parents("table").eq(0).find("tbody > tr").length;
            moreProps.order = order+1;
            let newtr = tableTbodyAddTrLine(tbodyDom,tdInfoArr,moreProps);
            newtr.forEach(function(item){
                $(That).parents("table").eq(0).find("tbody").eq(0).append(item);
            })
        });
    }
    /**
     * table的删除行操作
     * @param tableEle
     */
    let tableActDelTrLine = function(ele,moreProps){
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
        });

        $(ele).on("dragenter.firstbind",function(e){//有拖动对象(包括自己作为拖动对象)进入我的领空时
            if(!Global.ortumNowDragObj)return false;
            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');
            //不存在对应key
            if(!componentKey){return false;}
            if(componentKey == "gridDom" || componentKey == "tableDom" || componentKey == "buttonGroupDom"){//如果拖拽上來的是grid,则不进行创建
               
            }else{
                if($(this).hasClass('ortum_boot_td_waitInsert')){
                    require("feature").ortumDragShadow(e,"enter",{That:this,addWay:"addClass"})
                    return false;
                }else{
                    //TODO 确定是否替换
                    // return false;
                }
            }
        });

        $(ele).on('drop.firstbind',function(e){
            require("feature").ortumDragShadow(e,"drop",{That:this})

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
                    let customName = $(this).parents("table").eq(0).attr("name")+"_" + cellIndex + "-"+ rowIndex +"_" + rowIndex;//rowIndex
                    let createDom = require('createDom')[Settings.menuListDataJSON[componentKey].createFn](null,Global.ortum_createDom_frame,{
                        customName:customName,
                    });
                    $(this).append(createDom);
                    //将绑定的组件属性，绑定到td上
                    item.customProps = $(createDom).prop("ortum_component_properties");
                    item.uuid = $(createDom).prop("ortum_component_properties").data.uuid;
                    item.frame =Global.ortum_createDom_frame;
                    item.componentKey =componentKey;
                    //把拖拽对象制空
                    Global.ortumNowDragObj = null;
                }else if($(this).parents("tfoot").length){
                    let cellIndex = this.cellIndex;
                    // let rowIndex = $(this).parents("tr")[0].rowIndex;
                    let customName = $(this).parents("table").eq(0).attr("name")+"_" + "tfoot" + "_" + cellIndex+"-"+rowIndex;//rowIndex
                    let createDom = require('createDom')[Settings.menuListDataJSON[componentKey].createFn](null,Global.ortum_createDom_frame,{
                        customName:customName,
                    });
                    $(this).append(createDom);
                    //将绑定的组件属性，绑定到td上
                    item.customProps = $(createDom).prop("ortum_component_properties");
                    item.uuid = $(createDom).prop("ortum_component_properties").data.uuid;
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
        let classValue = "col";
        let createJson = false;
        let ortumChildren = null;
        if(Assist.getDetailType(moreProps) == "Object"){
            (moreProps.bindDropEvent !== undefined && moreProps.bindDropEvent !== null) && (bindDropEvent = moreProps.bindDropEvent);
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
        if(bindDropEvent){
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

        if(!bindDropEvent && createJson){
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
        });

        $(ele).on("dragenter.firstbind",function(e){//有拖动对象(包括自己作为拖动对象)进入我的领空时
            if(!Global.ortumNowDragObj)return false;
            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');
            //不存在对应key
            if(!componentKey){return false;}
            if(componentKey == "gridDom"){//如果拖拽上來的是grid,则不进行创建
               
            }else{
                if($(this).find(".ortum_boot_col_waitInsert")){
                    require("feature").ortumDragShadow(e,"enter",{That:$(this).find(".ortum_boot_col_waitInsert").eq(0),addWay:"addClass"})
                    return false;
                }else{
                    //TODO 确定是否替换
                    // return false;
                }
            }
        });

        $(ele).on('drop.firstbind',function(e){
            require("feature").ortumDragShadow(e,"drop",{That:this})

            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');
            if(!componentKey){//不存在对应key
                return false;
            }
            
            if(!require('createDom')[Settings.menuListDataJSON[componentKey].createFn]){
                Assist.dangerTip();
                return false;
            }

            if(componentKey == "gridDom"){//如果拖拽上來的是grid,则不进行创建
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
        inputEvent = require('Bootstrap'+componentToUpper).inputSetProperties;
        blurEvent = require('Bootstrap'+componentToUpper).blurSetProperties;
        changeEvent = require('Bootstrap'+componentToUpper).changeSetProperties;
        clickEvent = require('Bootstrap'+componentToUpper).clickSetProperties;
        keyDownEvent = require('Bootstrap'+componentToUpper).keyDownSetProperties;
        keyUpEvent = require('Bootstrap'+componentToUpper).keyUpSetProperties;
        beforeSetPrperies =require('Bootstrap'+componentToUpper).beforeSetPrperies;
       
    
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
    let getDomContextFormData = function(domId,settings={id:true,dataset:true,}){
        let formData = {};
        let form = document.getElementById(domId);  
        let elements = new Array();  
        let inputElements = form.getElementsByTagName('input');  
        let selectElements = form.getElementsByTagName('select');  
        let textareaElements = form.getElementsByTagName('textarea');
        let includeId = false;//表单有id，包含id的key
        let includeDataSet = false;//包含data属性
        if(Object.prototype.toString.call(settings).slice(8,-1) === "Object"){
            settings.id && (includeId = true);
            settings.dataset && (includeDataSet = true);
        }
        Array.prototype.forEach.call(inputElements,(item)=>{
            if(!item.name)return;//不存在name，不进行赋值
            if(includeDataSet){
                for(let dataKey in item.dataset){
                    if(item.dataset.hasOwnProperty(dataKey)){
                        formData[item.name+"_"+dataKey] = item.dataset[dataKey];
                    };
                }
            };
            let type = item.type.toLowerCase();
            switch (type){
                case "radio":
                    includeId && item.checked && item.id && (formData[item.id] = item.value);
                    item.checked && item.name && (formData[item.name] = item.value);
                    break;
                case "checkbox":
                    if(item.name && item.name.indexOf("switch") != -1){
                        includeId && item.checked && item.id && (formData[item.id] = item.value);
                        item.checked && (formData[item.name] = true);
                        !item.checked && (formData[item.name] = false);
                    }else{
                        item.name && item.checked && (formData[item.name] ? formData[item.name].push(item.value) : formData[item.name]=[item.value]);
                        includeId && item.id && item.checked && (formData[item.id] ? formData[item.id].push(item.value) : formData[item.id]=[item.value]);
                    };
                    
                    break;
                default:
                    includeId && item.id && (formData[item.id] = item.value);
                    item.name && (formData[item.name] = item.value);
                    break;
            }
        })
        Array.prototype.forEach.call(selectElements,(item)=>{
            includeId && item.id && (formData[item.id] = item.value);
            if(!item.name)return;//不存在name，不进行赋值
            if(includeDataSet){
                for(let dataKey in item.dataset){
                    if(item.dataset.hasOwnProperty(dataKey)){
                        formData[item.name+"_"+dataKey] = item.dataset[dataKey];
                    }
                }
            };
            formData[item.name] = item.value;
        })
        Array.prototype.forEach.call(textareaElements,(item)=>{
            includeId && item.id && (formData[item.id] = item.value);
            if(!item.name)return;//不存在name，不进行赋值
            if(includeDataSet){
                for(let dataKey in item.dataset){
                    if(item.dataset.hasOwnProperty(dataKey)){
                        formData[item.name+"_"+dataKey] = item.dataset[dataKey];
                    }
                }
            };
            formData[item.name] = item.value;
        })
        return formData;
    }

    return {
        tableTdAddTip,
        tableActAddTrLine,
        tableActDelTrLine,
        tableTbodyAddTrLine,
        tableTheadAddTrLine,
        tableTfootAddTrLine,


        tipAddComponentFn,
        bindDropEventToBootstrapGrid,
        setProperties,
        getDomContextFormData,

    };
})