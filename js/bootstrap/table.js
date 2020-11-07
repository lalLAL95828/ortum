define(["require","assist","createDom","global","settings",'BootStrapAsider'], function(require, Assist, CreateDom, Global, Settings, BootStrapAsider){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            title:"",//设置dom的title属性，一般与labelName一致
            verification:"",//校验
            authority:"edit",//权限
            cssClass:"ortum_bootstrap_tableDom",//table 的 css类
            theadCssClass:'ortum_bootstrap_thead',
            tbodyCssClass:'ortum_bootstrap_tbody',
            theadTrCssClass:'',
            tbodyTrCssClass:"",
            thCssClass:"ortum_bootstrap_th",
            tdCssClass:"ortum_bootstrap_td",
            showThead:true,
            showTbody:true,

            onBefore:"",
            onAfter:"",
            tableColumnsArr:[
                {
                    "type":"order",
                    "headHtml":"<span>序号</span>",
                    "headColspan":1,
                    "headRowspan":1,
                },
                {
                    "headHtml":"<span>设备编码</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>设备名称</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>规格型号</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>不含税价格（元）</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>数量</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>单位</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>开始使用日期</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>使用状况</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>预计处置价格（元）</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>备注</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "type":"act",//手动新增和删除
                    "headHtml":"<span>操作</span>",
                    "headColspan":1,
                    "headRowspan":1,
                },
            ],
        },
        inputChange:["id","name","title","verification","cssClass","theadCssClass","tbodyCssClass","theadTrCssClass","tbodyTrCssClass","thCssClass","tdCssClass"],//input事件修改值
        clickChange:["authority","showThead","showTbody"],
        purview:{//属性编辑权限
            id:3,//id
            name:2,//name
            title:3,//设置dom的title属性，一般与labelName一致

            verification:3,//校验
            authority:3,//权限
            cssClass:3,//table 的 css类

            theadCssClass:3,
            tbodyCssClass:3,
            tbodyTrCssClass:3,
            theadTrCssClass:3,
            thCssClass:3,
            tdCssClass:3,
            showThead:3,
            showTbody:3,
        },
        dataShowType:{
            showThead:'switch',
            showTbody:'switch',
            authority:"checkbox",
        },
    }

    /**
     * 功能：创建bootstrap的input
     * @param {*} parentDom
     * @param {*} moreProps 一个json对象，
     * @param {*} moreProps.customProps 自定义属性
     * @param {*} moreProps.generateDom 函数也存在dom中
     * @param {*} moreProps.createJson 生成对应的json
     * @param {*} moreProps.HasProperties 保存组件的component_properties
     * @param {*} moreProps.clickChangeAttrs 是否允许修改点击属性（=== false的时候，去除点击修改属性）
     * @param {*} moreProps.dropAddComponent 拖拽添加组件
     * @param {*} moreProps.ortumChildren 插入<ortum_children>的data-order
     * @param {*} moreProps.customName 自定义name
     */
    let TableDom = function(parentDom,moreProps=null){
        let customProps = null;
        let generateDom =  null;
        let clickChangeAttrs = true;
        let dropAddComponent = true;
        let customName = '';//自定义name

        let createJson = false;
        let HasProperties = false;
        let ortumChildren = null;

        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            moreProps.generateDom !== null && moreProps.generateDom !== undefined && (generateDom =moreProps.generateDom);
            moreProps.createJson !== null && moreProps.createJson !== undefined && (createJson =moreProps.createJson);
            moreProps.HasProperties !== null && moreProps.HasProperties !== undefined && (HasProperties =moreProps.HasProperties);
            moreProps.clickChangeAttrs === false && (clickChangeAttrs = moreProps.clickChangeAttrs);
            moreProps.dropAddComponent === false && (dropAddComponent = moreProps.dropAddComponent);
            moreProps.ortumChildren !== null && moreProps.ortumChildren !== undefined && (ortumChildren = moreProps.ortumChildren);
            moreProps.customName !== null && moreProps.customName !== undefined && (customName =moreProps.customName);
        };

        let outerDom=$(
            `
            <div class="form-group ortum_item ortum_bootstrap_table" 
                data-frame="Bootstrap" 
                data-componentKey="tableDom"
            > 
            </div>
            `
        );
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);
        //拖拽事件
        dropAddComponent !== false && require("feature").bindDropEventToOrtumItem(outerDom);

        let ortum_component_properties = (customProps ? customProps : Assist.deepClone(component_properties));

        //设定name
        customName && (ortum_component_properties.data.name = customName);
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('table'));

        let tableDom = $(`
            <table
            ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : '' } 
            name="${ortum_component_properties.data.name}" 
            class="${ortum_component_properties.data.cssClass}" 
            ></table>
        `)

        //【tbody】
        let tbodyDom = $(`
            <tbody
            ${ortum_component_properties.data.tbodyCssClass ? "class="+ortum_component_properties.data.tbodyCssClass : '' } 
            ></tbody>
        `)
        if(!ortum_component_properties.data.showTbody){
            tbodyDom.addClass("ortum_display_NONE")
        }
        //新建tbody的tr属性
        let tdMoreProps = {
            trCssClass:ortum_component_properties.data.tbodyTrCssClass,
            tdCssClass:ortum_component_properties.data.tdCssClass,
            tableName:ortum_component_properties.data.name,
        };
        Assist.getDetailType(moreProps) == "Object" &&  Object.assign(tdMoreProps,moreProps);
        //将tr的所有td信息存放在tbody上
        !createJson && $(outerDom).prop("ortum_tbodyTds_info",ortum_component_properties.data.tableColumnsArr)
        //创建tbody的tr
        let tbodyTrObj =BootStrapAsider.tableTbodyAddLine(tbodyDom,ortum_component_properties.data.tableColumnsArr,tdMoreProps);
        $(tbodyDom).append(tbodyTrObj);

        //【thead】
        let theadDom = $(`
            <thead 
            ${ortum_component_properties.data.theadCssClass ? "class="+ortum_component_properties.data.theadCssClass : '' } 
            ></thead>
        `);

        if(!ortum_component_properties.data.showThead){
            theadDom.addClass("ortum_display_NONE")
        }
        let theadTrObj =BootStrapAsider.tableTheadAddLine(ortum_component_properties.data.tableColumnsArr,
            {
                trCssClass:ortum_component_properties.data.theadTrCssClass,
                thCssClass:ortum_component_properties.data.thCssClass,
            });
        $(theadDom).append(theadTrObj);

        $(tableDom).append(theadDom);
        $(tableDom).append(tbodyDom);

        outerDom.append(tableDom);

        //dom绑定property
        clickChangeAttrs !== false && $(outerDom).prop('ortum_component_properties',ortum_component_properties).prop('ortum_component_type',['Bootstrap','table']);

        //script字符串
        let scriptStr = '';
        let scriptDom = ""
        let addlineTrInfo = '';
        //创建children
        let children = [];
        if(createJson){
            //创建tbody的tr模板
            addlineTrInfo = BootStrapAsider.tableTbodyAddLine(null,ortum_component_properties.data.tableColumnsArr,tdMoreProps);
            scriptStr = `
                let tableName = "${ortum_component_properties.data.name}";
            `;
            //点击和删除的按钮
            scriptStr+=`
                $("table[name="+ tableName +"]").on("click.addline","td[data-type=act] .icon-jiahao",function(){
                    let tdInfoArr = $(this).parents("table").eq(0).parents(".ortum_item").eq(0).prop("ortum_tbodyTds_info");
                    let addlineTr = $(this).parents("table").eq(0).parents(".ortum_item").eq(0).prop("ortum_tbodyTr_info");
                    let bodyTrLength = $(this).parents("table").eq(0).find("tbody > tr").length;
                    let nextTr = $(addlineTr);
                    let trOrder = $(this).parents("tbody").eq(0).find('tr').length;
                    function ortum_BootstraptableDom_addLine(arr,trDom){
                        arr.forEach(function(item){
                            let itemDom = item;
                            if(item.childrenType == "choose"){
                               
                                itemDom = item.chooseFun(null,trOrder+1);
                            };
                            let nextHtml = $(itemDom.html);
                            nextHtml.find("*[name]").each(function(index2,item2){
                                let nameValArr = $(item2).attr("name") && $(item2).attr("name").split("_");
                                if(nameValArr && nameValArr.length && nameValArr[0] == "table"){
                                    nameValArr[nameValArr.length -1] = bodyTrLength+1;
                                };
                                $(item2).attr("name",nameValArr.join("_"));
                            });
                            if(itemDom.children && itemDom.children.length){
                                ortum_BootstraptableDom_addLine(itemDom.children,nextHtml);
                            };
                            $(trDom).find("ortum_children").eq(0).replaceWith(nextHtml); 
                        });
                    };
                    ortum_BootstraptableDom_addLine(tdInfoArr,nextTr);
                    nextTr.find("td[data-type=order] span").text(trOrder+1);
                    $(this).parents("table").eq(0).find("tbody").eq(0).append(nextTr);
                });
                $("table[name="+ tableName +"]").on("click.delete","td[data-type=act] .icon-shanchu",function(){
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
                    
                });
            `;

            //创建td中组件的json信息
            ortum_component_properties.data.tableColumnsArr.forEach(function(item,index){
                //创建组件的属性
                let createDomProp = Object.assign({
                    HasProperties:HasProperties,
                    customName:ortum_component_properties.data.name+"_"+index + "_" + 1,//1代表第一行
                },moreProps);
                
                Object.assign(createDomProp,item);
                createDomProp.customProps = item.customProps;

                let comDom;
                if(item.type){
                    switch (item.type) {
                        case "order":
                            comDom ={
                                "html":`<span>1</span>`,
                                "ortumChildren":index,//插入第几个ortum_children
                            };
                            break;
                        case "act":
                            createDomProp.ortumChildren=index;//插入第几个ortum_children
                            //新增
                            let addComDom = require('createDom')[Settings.menuListDataJSON["iconButtonDom"].createFn](null,Global.ortum_createDom_frame,Object.assign({
                                "iconName":"icon-jiahao",
                            },createDomProp));
                            //删除
                            let delComDom = require('createDom')[Settings.menuListDataJSON["iconButtonDom"].createFn](null,Global.ortum_createDom_frame,Object.assign({
                                "iconName":"icon-shanchu",
                            },createDomProp));
                            comDom = {
                                "childrenType":"choose",
                                "chooseFun":function (parents,sureOrder=false) {
                                    let order = 0;
                                    if(sureOrder !== false){
                                        order = sureOrder;
                                    }else{
                                        let tbodyDom = parents.find('tbody').eq(0);
                                        order = $(tbodyDom).find("tr").length;
                                    }
                                    if(order == 1){
                                        return this.addComDom;
                                    }else{
                                        return this.delComDom;
                                    };
                                }.toString(),
                                "delComDom":delComDom,
                                "addComDom":addComDom,
                            };
                            break;
                        default:
                            console.error("type类型不正确")
                            break;
                    }
                    children.push(Object.assign({
                        "frame":null,
                        "componentKey":null,
                        "children":[],
                    },comDom));
                }else{
    
                    if(item.componentKey && item.frame){
                        createDomProp.ortumChildren=index;//插入第几个ortum_children
                        comDom =require("createDom")[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,createDomProp);
                        children.push(Object.assign({
                            "frame":item.frame,
                            "componentKey":item.componentKey,
                            "children":[],
                        },comDom));
                    }
                }
            });

            scriptStr && (scriptDom = $(`<script>${scriptStr}</script>`));
        }

        //创建的对象返回
        if(parentDom){
            $(parentDom).append(outerDom);
        }else if(createJson){//生成json
            return {
                "name":ortum_component_properties.data.name,
                "title":(ortum_component_properties.data.title ? ortum_component_properties.data.title : ortum_component_properties.data.labelName),
                "html":outerDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "ortum_tbodyTr_info":addlineTrInfo[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "script":scriptDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "children":children,
                "componentProperties":(HasProperties ? Assist.jsonStringify(ortum_component_properties) : undefined),
                "ortumChildren":ortumChildren,
            }
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
            case "verification":
                //TODO 验证
                console.log(val)
                break;
            case "thCssClass":
                $(globalComponent).find("th").attr('class',val)
                break;
            case "tdCssClass":
                $(globalComponent).find("td").attr('class',val)
                break;
            case "theadTrCssClass":
                $(globalComponent).find('thead').eq(0).find("tr").attr('class',val)
                break;
            case "tbodyTrCssClass":
                $(globalComponent).find('tbody').eq(0).find("tr").attr('class',val)
                break;
            case "tbodyCssClass":
                $(globalComponent).find('tbody').eq(0).attr('class',val)
                break;
            case "theadCssClass":
                $(globalComponent).find('tbody').eq(0).attr('class',val)
                break;
            case "cssClass":
                $(globalComponent).find('table').eq(0).attr('class',val)
                break;
            case "labelName":
                $(globalComponent).find('label').eq(0).text(val)
                break;
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find('table').eq(0).attr(property,val)
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
            case "showTbody":case "showThead":
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
        // evenProperties.data[property] = val;
        switch(property){
            //TODO

            case "authority":
                if(val=="hide"){//不可见
                    // $(globalComponent).hide();
                    // $("*[ortum_bindcomponentname]").parents(".ortum_item").eq(0).hide();
                }
                if(val=="edit"){//可编辑
                    // $(globalComponent).show();
                    // $(globalComponent).find("input").removeAttr("readonly");
                    // $(globalComponent).find("input").removeAttr("disabled");
                    // $("*[ortum_bindcomponentname]").parents(".ortum_item").eq(0).show();
                }
                if(val=="readonly"){//只读可点击
                    // $(globalComponent).show();
                    // $(globalComponent).find("input").attr("readonly","readonly");
                    // $(globalComponent).find("input").removeAttr("disabled");
                    // $("*[ortum_bindcomponentname]").parents(".ortum_item").eq(0).show();
                }
                if(val=="disabled"){//只读且无法点击
                    // $(globalComponent).show();
                    // $(globalComponent).find("input").attr("readonly","readonly");
                    // $(globalComponent).find("input").attr("disabled","disabled");
                    // $("*[ortum_bindcomponentname]").parents(".ortum_item").eq(0).show();
                }
                break;

            case "showTbody":
                checked && $(globalComponent).find("tbody").show();
                !checked && $(globalComponent).find("tbody").hide();
                break;
            case "showThead":
                checked && $(globalComponent).find("thead").show();
                !checked && $(globalComponent).find("thead").hide();
                break;
            default:
                if(evenProperties.clickChange.indexOf(property) != -1){
                    $(globalComponent).find('table').eq(0).attr(property,val)
                }
                break;
        }
    }

    /**
     * 功能：设置js
     */
    let ortumComponentSetJs = function(val){
        //将字符串装成函数
        console.log(val)
        debugger
    }


    /**
     * 保存对table的列设置
     */
    let saveTableColumns = function (val) {
        let globalComponent =Global.ortum_edit_component.comObj;
        let tbodyDom = globalComponent.find("tbody").eq(0);
        let theadDom = globalComponent.find("thead").eq(0);
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        let tdMoreProps = {
            trCssClass:evenProperties.data.tbodyTrCssClass,
            tdCssClass:evenProperties.data.tdCssClass,
            tableName:evenProperties.data.name,
        };
        try{
            eval(val);
            let editTableColumnArr = eval("tableColumns");
            evenProperties.data.tableColumnsArr = editTableColumnArr;
            $(globalComponent).prop("ortum_tbodyTds_info",editTableColumnArr);
            $(tbodyDom).empty();//tbody先清空
            $(theadDom).empty();//thead先清空
            let tbodyTrObj =BootStrapAsider.tableTbodyAddLine(tbodyDom,editTableColumnArr,tdMoreProps);
            $(tbodyDom).append(tbodyTrObj);
            let theadTrObj =BootStrapAsider.tableTheadAddLine(editTableColumnArr,
                {
                    trCssClass:evenProperties.data.theadTrCssClass,
                    thCssClass:evenProperties.data.thCssClass,
                });
            $(theadDom).append(theadTrObj);


        }catch (e) {
            console.error("编辑table的column信息错误");
        }
        //TODO 修改之后可以优化替换的规则
       /* try{
            eval(val);
            let editTableColumnArr = eval("tableColumns");
            for(let index = 0;index < editTableColumnArr.length;index++){
                let type = item[index].type;
                let headHtml = item[index].headHtml;
                let headColspan = item[index].headHtml;
                let headRowspan = item[index].headHtml;
                let frame = item[index].headHtml;
                let componentKey = item[index].headHtml;
                let width = item[index].width;
                switch (type) {
                    case "order":
                        break;
                    case "act":
                        break;
                    default:
                        break;
                }

            }
        }catch (e) {
            console.error("编辑table的column信息错误")
        }*/

    };
    /**
     * js设置table的列信息
     * @returns {boolean}
     */
    let setTableColumns = function () {
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');

        Global.ortum_codemirrorJS_setVal = function(codeObj){
            let editArr = [];
            for(let item of evenProperties.data.tableColumnsArr){
                let pushItem = {};
                for(let key in item){
                    if(item.hasOwnProperty(key)){
                        key !== "customProps" && (pushItem[key] = item[key]);
                    }
                };
                editArr.push(pushItem)
            }
            //函数字符串
            // var funStr=Assist.jsonStringify(evenProperties.data.tableColumnsArr)
            // if(evenProperties.data.customGetOptions){
            //     funStr=evenProperties.data.customGetOptions.toString();
            // }else{
            //     funStr = "function getOptions_"+ evenProperties.data.name +"(ortumDom,ortumAjax){\n\n\n\n\n}"
            // }
            codeObj.setValue(`//编辑table的列信息\nvar tableColumns = ${JSON.stringify(editArr)};
                `)
        }

        $('#ortum_top_dialog_xl').modal({
            "backdrop":"static",
            "keyboard":false,
        });
        //编辑js保存后执行的函数
        Global.ortum_codemirrorJS_save = saveTableColumns;
        $("#ortum_top_model_xl_content").load("html/common/codemirror.html",function(){
            $('#ortum_top_model_xl_wait').hide();
        });
        return false;
    }



    return {
        TableDom,

        inputSetProperties,
        blurSetProperties,
        clickSetProperties,
        // changeSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

        setTableColumns,
        saveTableColumns,

        ortumComponentSetJs,

    }
})