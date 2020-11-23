define(["require","assist","createDom","global","settings",'BootstrapAsider'], function(require, Assist, CreateDom, Global, Settings, BootstrapAsider){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            title:"",//设置dom的title属性，一般与labelName一致
            verification:"",//校验
            authority:"edit",//权限
            cssClass:"ortum_bootstrap_tableDom",//table 的 css类
            theadCssClass:'ortum_bootstrap_thead',

            tfootCssClass:"ortum_bootstrap_tfoot",
            tfootTrCssClass:"",
            tfootTdCssClass:"ortum_bootstrap_td",

            tbodyCssClass:'ortum_bootstrap_tbody',
            theadTrCssClass:'',

            tbodyTrCssClass:"",
            thCssClass:"ortum_bootstrap_th",
            tdCssClass:"ortum_bootstrap_td",
            showThead:true,
            showTbody:true,
            showTfoot:true,

            tableColumnsArr:[
                /*{
                    "type":"order",
                    "headHtml":"<span>序号</span>",
                    "headColspan":1,
                    "headRowspan":1,
                },*/
                {
                    "headHtml":"<span>建筑名称</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>新增建筑面积（m²）</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "headHtml":"<span>建筑工程费（万元）</span>",
                    "headColspan":1,
                    "headRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                /*{
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
                },*/
                {
                    "type":"act",//手动新增和删除
                    "headHtml":"<span>操作</span>",
                    "headColspan":1,
                    "headRowspan":1,
                },
            ],

            tfootColumnsArr:[
                /*{
                    "tfootColspan":4,
                    "tfootRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"hDom",
                },
                {
                    "tfootColspan":1,
                    "tfootRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "tfootColspan":1,
                    "tfootRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "tfootColspan":3,
                    "tfootRowspan":1,
                },
                {
                    "tfootColspan":1,
                    "tfootRowspan":1,
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "tfootColspan":2,
                    "tfootRowspan":1,
                },*/
            ],

            onBefore:"",
            onAfter:"",
        },
        inputChange:["id","name","title","tfootCssClass","tfootTrCssClass","tfootTdCssClass","verification","cssClass","theadCssClass","tbodyCssClass","theadTrCssClass","tbodyTrCssClass","thCssClass","tdCssClass"],//input事件修改值
        clickChange:["authority","showThead","showTbody","showTfoot"],
        purview:{//属性编辑权限
            id:3,//id
            name:3,//name
            title:3,//设置dom的title属性，一般与labelName一致

            verification:3,//校验
            authority:3,//权限
            cssClass:3,//table 的 css类

            tfootCssClass:3,
            tfootTrCssClass:3,
            tfootTdCssClass:3,

            theadCssClass:3,
            tbodyCssClass:3,
            tbodyTrCssClass:3,
            theadTrCssClass:3,
            thCssClass:3,
            tdCssClass:3,
            showThead:3,
            showTbody:3,
            showTfoot:3
        },
        dataShowType:{
            showThead:'switch',
            showTbody:'switch',
            showTfoot:'switch',
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
        // ortum_component_properties.data.name || (ortum_component_properties.data.name ="table_1605100578804af1b");

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
        let tbodyTrObj =BootstrapAsider.tableTbodyAddLine(tbodyDom,ortum_component_properties.data.tableColumnsArr,tdMoreProps);
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
        let theadTrObj =BootstrapAsider.tableTheadAddLine(ortum_component_properties.data.tableColumnsArr,
            {
                trCssClass:ortum_component_properties.data.theadTrCssClass,
                thCssClass:ortum_component_properties.data.thCssClass,
            });
        $(theadDom).append(theadTrObj);

        //【tfoot】
        let tfootDom = $(`
            <tfoot
                ${ortum_component_properties.data.tfootCssClass ? "class="+ortum_component_properties.data.tfootCssClass : '' } 
            ></tfoot>
        `);
        if(!ortum_component_properties.data.showTfoot){
            tfootDom.addClass("ortum_display_NONE");
        }
        let tfootTdMoreProps = {
            trCssClass:ortum_component_properties.data.tfootTrCssClass,
            tdCssClass:ortum_component_properties.data.tfootTdCssClass,
            tableName:ortum_component_properties.data.name,
        };
        Assist.getDetailType(moreProps) == "Object" &&  Object.assign(tfootTdMoreProps,moreProps);
        let tfootTrObj =BootstrapAsider.tableTfootAddLine(ortum_component_properties.data.tfootColumnsArr,tfootTdMoreProps);
        $(tfootDom).append(tfootTrObj);

        $(tableDom).append(theadDom);
        $(tableDom).append(tbodyDom);
        $(tableDom).append(tfootDom);

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
            addlineTrInfo = BootstrapAsider.tableTbodyAddLine(null,ortum_component_properties.data.tableColumnsArr,tdMoreProps);
            //新增行的函数
            //可以根据table的name属性新增；也可以根据this新增，this必须是tbody下的tr的子元素，
            scriptStr+=`
                function ortumTableDom_addLine_${ortum_component_properties.data.name}(tableName="${ortum_component_properties.data.name}",tableVal=null,setValueFun=null){
                    let tableDom;
                    let rendPowerArr=[];
                    tableName && (tableDom = $("table[name="+ tableName +"]"));
                    !tableName && (tableDom = $(this).parents("table").eq(0));
                    if(!tableDom.length){
                        console.error("缺少table信息");
                        return false;
                    };
                    let tdInfoArr =tableDom.parents(".ortum_item").eq(0).prop("ortum_tbodyTds_info");
                    let addlineTr =tableDom.parents(".ortum_item").eq(0).prop("ortum_tbodyTr_info");
                    let tbodyFirstTr = tableDom.find("tbody tr:nth-of-type(1)");
                    let bodyTrLength = tableDom.find("tbody > tr").length;
                    let nextTr = $(addlineTr);
                    let trOrder = tableDom.find('tbody tr').length;
                    function ortum_BootstraptableDom_addLine(arr,trDom){
                        arr.forEach(function(item){
                            let itemDom = item;
                            if(item.childrenType == "choose"){
                                itemDom = item.chooseFun(null,trOrder+1);
                            };
                            let nextHtml = $(itemDom.html);
                            let hide = false;
                            let read = false;
                            let required = false;
                            let verifyInfo = "";
                            nextHtml.find("*[name]").each(function(index2,item2){
                                let nameValArr = $(item2).attr("name") && $(item2).attr("name").split("_");
                                if(nameValArr && nameValArr.length && nameValArr[0] == "table"){
                                    /*********获取权限**********/
                                    if(tbodyFirstTr.length){
                                        let brotherDom = tbodyFirstTr.find("*[name="+ $(item2).attr("name") +"]").eq(0);
                                        brotherDom.parents(".ortum_item").eq(0).css("display") == "none" && (hide=true);
                                        brotherDom.attr("disabled") && (read=true);
                                        brotherDom.attr("ortum-verify") && (verifyInfo=brotherDom.attr("ortum-verify"));
                                    };
                                    nameValArr[nameValArr.length -1] = bodyTrLength+1;
                                };
                                $(item2).attr("name",nameValArr.join("_"));
                            });
                            if(itemDom.children && itemDom.children.length){
                                ortum_BootstraptableDom_addLine(itemDom.children,nextHtml);
                            };
                            $(trDom).find("ortum_children[data-order="+ itemDom.ortumChildren +"]").eq(0).replaceWith(nextHtml);
                            rendPowerArr.push({
                                dom:nextHtml,
                                name:nextHtml.find("*[name]").attr("name")
                            });
                            /*********设置权限**********/
                            if(hide){
                                nextHtml.hide();
                                nextHtml.parents("td").eq(0).hide();
                            };
                            if(read){
                                nextHtml.find("*[name]").attr("disabled","disabled");
                            };
                            if(required){
                                nextHtml.find("*[name]").attr("ortum-verify","required");
                            };
                            if(verifyInfo){
                                nextHtml.attr("ortum_authority","verifyInfo");
                            };
                            /*********设置值**********/
                            tableVal && (typeof setValueFun == "function") && rendPowerArr.forEach(function(item){
                                setValueFun(item.dom,item.name,tableVal);
                            });
                        });
                    };
                    ortum_BootstraptableDom_addLine(tdInfoArr,nextTr);
                    nextTr.find("td[data-type=order] span").text(trOrder+1);
                    tableDom.find("tbody").eq(0).append(nextTr);
                    return false;
                };
            `;
            //删除行的函数
            //可以根据table的name属性删除；也可以根据this删除，this必须是tbody下的tr的子元素，
            //根据table的name属性删除，必须提供order，表示删除第几行
            scriptStr+=`
                function ortumTableDom_delLine_${ortum_component_properties.data.name}(tableName="${ortum_component_properties.data.name}",order=false,act=false){
                    let tableDom;
                    tableName && (tableDom = $("table[name="+ tableName +"]"));
                    !tableName && (tableDom = $(this).parents("table").eq(0));
                    if(!tableDom.length){
                        console.error("缺少table信息");
                        return false;
                    };
                    let tbodyDom = tableDom.find("tbody").eq(0);
                    if(act){
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
                        tbodyDom.find("td[data-type=order]").each(function(index,item){
                            $(item).find("span").eq(0).text(index+1);
                        });
                    }else if(/^[1-9]\d*$/.test(order)){
                        let delTr = tbodyDom.find("tr:nth-of-type("+ order +")");
                        let rowIndex = delTr[0].rowIndex;
                        $(delTr).nextAll("tr").each(function(index,item){
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
                        delTr.remove();
                        tbodyDom.find("td[data-type=order]").each(function(index,item){
                            $(item).find("span").eq(0).text(index+1);
                        });
                    };
                };
            `;
            //点击和删除的按钮
            scriptStr+=`
                $("table[name=${ortum_component_properties.data.name}]").on("click.addline","td[data-type=act] .icon-jiahao",function(){
                    ortumTableDom_addLine_${ortum_component_properties.data.name}();
                });
                $("table[name=${ortum_component_properties.data.name}]").on("click.delete","td[data-type=act] .icon-shanchu",function(){
                    ortumTableDom_delLine_${ortum_component_properties.data.name}.call(this,false,false,true);
                });
            `;

            //创建tfoot的td的json信息
            ortum_component_properties.data.tfootColumnsArr.forEach(function(item,index){
                //创建组件的属性
                let createDomProp = Object.assign({
                    HasProperties:HasProperties,
                    customName:ortum_component_properties.data.name+"_"+"tfoot" + "_" + index,//1代表第一行
                },moreProps);

                Object.assign(createDomProp,item);
                createDomProp.customProps = item.customProps;

                let comDom;
                if(item.componentKey && item.frame){
                    createDomProp.ortumChildren="tfoot"+index;//插入第几个ortum_children
                    comDom =require("createDom")[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,createDomProp);
                    children.push(Object.assign({
                        "frame":item.frame,
                        "componentKey":item.componentKey,
                        "children":[],
                    },comDom));
                };
            });

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
                                "name":createDomProp.customName,
                                "title": "操作",
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

            // if(ortum_component_properties.data.onBefore && typeof ortum_component_properties.data.onBefore === "function"){
            //
            // }
            if(ortum_component_properties.data.onAfter && typeof ortum_component_properties.data.onAfter === "function"){
                scriptStr += '!'+ortum_component_properties.data.onAfter+'($("input[name='+ ortum_component_properties.data.name +']").eq(0));'
            }


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
            case "tfootCssClass":
                $(globalComponent).find("tfoot").attr('class',val);
                break;
            case "tfootTrCssClass":
                $(globalComponent).find("tfoot").eq(0).find("tr").attr('class',val);
                break;
            case "tfootTdCssClass":
                $(globalComponent).find("tfoot").eq(0).find("td").attr('class',val);
                break;
            case "thCssClass":
                $(globalComponent).find("th").attr('class',val);
                break;
            case "tdCssClass":
                $(globalComponent).find("tbody").eq(0).find("td").attr('class',val);
                break;
            case "theadTrCssClass":
                $(globalComponent).find('thead').eq(0).find("tr").attr('class',val);
                break;
            case "tbodyTrCssClass":
                $(globalComponent).find('tbody').eq(0).find("tr").attr('class',val);
                break;
            case "tbodyCssClass":
                $(globalComponent).find('tbody').eq(0).attr('class',val);
                break;
            case "theadCssClass":
                $(globalComponent).find('tbody').eq(0).attr('class',val);
                break;
            case "cssClass":
                $(globalComponent).find('table').eq(0).attr('class',val);
                break;
            default:
                if(evenProperties.inputChange.indexOf(property) != -1){
                    $(globalComponent).find('table').eq(0).attr(property,val);
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
            case "showTbody":case "showThead":case "showTfoot":
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
                }
                if(val=="edit"){//可编辑
                }
                if(val=="readonly"){//只读可点击
                }
                if(val=="disabled"){//只读且无法点击
                }
                break;

            case "showTbody":
                checked && $(globalComponent).find("tbody").removeClass("ortum_display_NONE");
                !checked && $(globalComponent).find("tbody").addClass("ortum_display_NONE");
                break;
            case "showTfoot":
                checked && $(globalComponent).find("tfoot").removeClass("ortum_display_NONE");
                !checked && $(globalComponent).find("tfoot").addClass("ortum_display_NONE");
                break;
            case "showThead":
                checked && $(globalComponent).find("thead").removeClass("ortum_display_NONE");
                !checked && $(globalComponent).find("thead").addClass("ortum_display_NONE");
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
    let ortumComponentSetJs = function(codeObj){
        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');

        let setStr = "var ortum_BootstrapInput_setJs = {";
        if(evenProperties.data.onBefore){
            setStr += "\n//DOM渲染前的函数执行函数\nonBefore:"+ evenProperties.data.onBefore.toString() + ",";
        }else{
            setStr += "\n//DOM渲染前的函数执行函数\nonBefore:function(){},"
        }
        if(evenProperties.data.onAfter){
            setStr += "\n//DOM渲染后的函数执行函数\nonAfter:"+ evenProperties.data.onAfter.toString() + ",";
        }else{
            setStr += "\n//DOM渲染后的函数执行函数\nonAfter:function(that){},"
        }
        setStr +="\n};";

        //格式化
        setStr = js_beautify(setStr,2);
        codeObj.setValue(setStr)
    };
    /**
     * 功能：保存js
     */
    let ortumComponentSaveJs = function(val){
        if(!Global.ortum_edit_component || !Global.ortum_edit_component.comObj){
            return false;
        }
        let globalComponent =Global.ortum_edit_component.comObj;
        let evenProperties = $(globalComponent).prop('ortum_component_properties');

        let packer = new Packer;
        let valFormat = packer.pack(val, 0, 0); 
        try{
            eval(valFormat);
            evenProperties.data.onBefore = ortum_BootstrapInput_setJs.onBefore;
            evenProperties.data.onAfter = ortum_BootstrapInput_setJs.onAfter;
        }catch (e) {
            console.error("设置input的js有误，请重新设置");
        }
    };



    /**
     * 保存对table的列设置
     */
    let saveTableColumns = function (val) {
        let globalComponent =Global.ortum_edit_component.comObj;
        let tbodyDom = globalComponent.find("tbody").eq(0);
        let theadDom = globalComponent.find("thead").eq(0);
        let tfootDom = globalComponent.find("tfoot").eq(0);
        let evenProperties = $(globalComponent).prop('ortum_component_properties');
        let tdMoreProps = {
            trCssClass:evenProperties.data.tbodyTrCssClass,
            tdCssClass:evenProperties.data.tdCssClass,
            tableName:evenProperties.data.name,
        };

        let packer = new Packer;
        let valFormat = packer.pack(val, 0, 0); 
        try{
            eval(valFormat);
            let editTableColumnArr = eval("tableColumns");
            evenProperties.data.tableColumnsArr = editTableColumnArr;
            $(globalComponent).prop("ortum_tbodyTds_info",editTableColumnArr);
            $(tbodyDom).empty();//tbody先清空
            $(theadDom).empty();//thead先清空
            let tbodyTrObj =BootstrapAsider.tableTbodyAddLine(tbodyDom,editTableColumnArr,tdMoreProps);
            $(tbodyDom).append(tbodyTrObj);
            let theadTrObj =BootstrapAsider.tableTheadAddLine(editTableColumnArr,
                {
                    trCssClass:evenProperties.data.theadTrCssClass,
                    thCssClass:evenProperties.data.thCssClass,
                });
            $(theadDom).append(theadTrObj);
            //tfoot
            let editTfootColumnArr = eval("tfootColumns");
            evenProperties.data.tfootColumnsArr = editTfootColumnArr;
            $(tfootDom).empty();//thead先清空
            let tfootTrObj =BootstrapAsider.tableTfootAddLine(editTfootColumnArr,
                {
                    trCssClass:evenProperties.data.tfootTrCssClass,
                    tdCssClass:evenProperties.data.tfootTdCssClass,
                    tableName:evenProperties.data.name,
                });
            $(tfootDom).append(tfootTrObj);

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
            let tableArr = [];
            for(let item of evenProperties.data.tableColumnsArr){
                let pushItem = {};
                for(let key in item){
                    if(item.hasOwnProperty(key)){
                        key !== "customProps" && (pushItem[key] = item[key]);
                    }
                };
                tableArr.push(pushItem)
            }
            let tfootArr = [];
            for(let item of evenProperties.data.tfootColumnsArr){
                let pushItem = {};
                for(let key in item){
                    if(item.hasOwnProperty(key)){
                        key !== "customProps" && (pushItem[key] = item[key]);
                    }
                };
                tfootArr.push(pushItem)
            }


            //函数字符串
            // var funStr=Assist.jsonStringify(evenProperties.data.tableColumnsArr)
            // if(evenProperties.data.customGetOptions){
            //     funStr=evenProperties.data.customGetOptions.toString();
            // }else{
            //     funStr = "function getOptions_"+ evenProperties.data.name +"(ortumDom,ortumAjax){\n\n\n\n\n}"
            // }
            
            //格式化
            let tableArrStr = js_beautify(JSON.stringify(tableArr),2);
            let tfootArrStr = js_beautify(JSON.stringify(tfootArr),2);

            codeObj.setValue(`//编辑table的列信息\nvar tableColumns = ${tableArrStr};\n//编辑tfoot的列信息\nvar tfootColumns = ${tfootArrStr};
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
        ortumComponentSaveJs,

    }
})