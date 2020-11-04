define(["require","assist","createDom","global","settings",'BootStrapAsider'],function(require,
                                                                                       Assist,
                                                                                       CreateDom,
                                                                                       Global,
                                                                                       Settings,
                                                                                       BootStrapAsider){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            title:"",//设置dom的title属性，一般与labelName一致
            verification:"",//校验
            authority:"edit",//权限
            cssClass:"ortum_bootstrap_table",//table 的 css类
            theadCssClass:'ortum_bootstrap_thead',
            tbodyCssClass:'ortum_bootstrap_tbody',
            theadTrCssClass:'',
            tbodyTrCssClass:"",
            thCssClass:"ortum_bootstrap_th",
            tdCssClass:"ortum_bootstrap_td",
            showThead:true,
            showTbody:true,
            columns:11,//多少列
            rows:1,//多少行
            canSelfAdd:true,//能够自增


            onBefore:"",
            onAfter:"",
            theadColumnsArr:[
                {
                    "tableColumnType":"order",
                    html:"<span>序号</span>",
                },
                {
                    html:"<span>设备编码</span>",
                },
                {
                    html:"<span>设备名称</span>",
                },
                {
                    html:"<span>规格型号</span>",
                },
                {
                    html:"<span>不含税价格（元）</span>",
                },
                {
                    html:"<span>数量</span>",
                },
                {
                    html:"<span>单位</span>",
                },
                {
                    html:"<span>开始使用日期</span>",
                },
                {
                    html:"<span>使用状况</span>",
                },
                {
                    html:"<span>预计处置价格（元）</span>",
                },
                {
                    html:"<span>备注</span>",
                },
                {
                    html:"<span>操作</span>",
                },
            ],
            tbodyColumnsArr:[
                {
                    "tableColumnType":"order",//首列为序号
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"inputDom",
                },
                {
                    "frame":"Bootstrap",
                    "componentKey":"buttonGroupDom",
                    "children":[{
                        "frame":"Bootstrap",
                        "componentKey":"iconButtonDom",
                        "iconName":"icon-jiahao",
                    },{
                        "frame":"Bootstrap",
                        "componentKey":"iconButtonDom",
                        "iconName":"icon-shanchu",
                    }],
                    "childrenSlot":2,
                },
            ],
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

                    /*"frame":"Bootstrap",
                    "componentKey":"buttonGroupDom",
                    "children":[{
                        "frame":"Bootstrap",
                        "componentKey":"iconButtonDom",
                        "iconName":"icon-jiahao",
                    },{
                        "frame":"Bootstrap",
                        "componentKey":"iconButtonDom",
                        "iconName":"icon-shanchu",
                    }],
                    "childrenSlot":2,*/
                },
            ],

        },
        inputChange:["id","name","title","columns","rows","verification","cssClass","theadCssClass","tbodyCssClass","theadTrCssClass","tbodyTrCssClass","thCssClass","tdCssClass"],//input事件修改值
        clickChange:["authority","showThead","showTbody","canSelfAdd"],
        purview:{//属性编辑权限
            id:3,//id
            name:2,//name
            title:3,//设置dom的title属性，一般与labelName一致
            columns:3,
            rows:3,


            verification:3,//校验
            authority:3,//权限
            cssClass:3,//table 的 css类
            canSelfAdd:3,
            theadCssClass:3,
            tbodyCssClass:3,
            tbodyTrCssClass:3,
            theadTrCssClass:3,
            thCssClass:3,
            tdCssClass:3,
            showThead:3,
            showTbody:3,
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
     */
    let TableDom = function(parentDom,moreProps=null){
        let customProps = null;
        let generateDom =  null;
        let clickChangeAttrs = true;
        let dropAddComponent = true;

        let createJson = false;
        let HasProperties = false;

        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            moreProps.generateDom !== null && moreProps.generateDom !== undefined && (generateDom =moreProps.generateDom);
            moreProps.createJson !== null && moreProps.createJson !== undefined && (createJson =moreProps.createJson);
            moreProps.HasProperties !== null && moreProps.HasProperties !== undefined && (HasProperties =moreProps.HasProperties);
            moreProps.clickChangeAttrs === false && (clickChangeAttrs = moreProps.clickChangeAttrs);
            moreProps.dropAddComponent === false && (dropAddComponent = moreProps.dropAddComponent);
        };

        let outerDom=$(
            `
            <div class="form-group ortum_item row" 
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
            addlineTrInfo = BootStrapAsider.tableTbodyAddLine(ortum_component_properties.data.tableColumnsArr,tdMoreProps);

            scriptStr = `
                let tableName = "${ortum_component_properties.data.name}";
            `;
            ortum_component_properties.data.canSelfAdd && (scriptStr+=`
                $("table[name="+ tableName +"]").on("click.addline","td[data-type=actAdd] .icon-jiahao",function(){
                    let tdInfoArr = $(this).parents("table").eq(0).parents(".ortum_item").eq(0).prop("ortum_tbodyTds_info");
                    let addlineTr = $(this).parents("table").eq(0).parents(".ortum_item").eq(0).prop("ortum_tbodyTr_info");
                    let bodyTrLength = $(this).parents("table").eq(0).find("tbody > tr").length;
                    let nextTr = $(addlineTr);
                    function ortum_BootstraptableDom_addLine(arr,trDom){
                        arr.forEach(function(item){
                            let nextHtml = $(item.html);
                            nextHtml.find("*[name]").each(function(index2,item2){
                                let nameValArr = $(item2).attr("name") && $(item2).attr("name").split("_");
                                if(nameValArr && nameValArr.length && nameValArr[0] == "table"){
                                    nameValArr[nameValArr.length -1] = bodyTrLength+1;
                                };
                                $(item2).attr("name",nameValArr.join("_"));
                            });
                            if(item.children && item.children.length){
                                ortum_BootstraptableDom_addLine(item.children,nextHtml);
                            };
                            $(trDom).find("ortum_children").eq(0).replaceWith(nextHtml); 
                        });
                    };
                    ortum_BootstraptableDom_addLine(tdInfoArr,nextTr);
                    $(this).parents("table").eq(0).find("tbody").eq(0).append(nextTr);
                });
                $("table[name="+ tableName +"]").on("click.delete","td[data-type=actDel] .icon-shanchu",function(){
                    let tbodyDom = $(this).parents("tbody").eq(0);
                    $(this).parents("tr").eq(0).remove();
                    $(tbodyDom).find("td[data-type=order]").each(function(index,item){
                        $(item).find("span").eq(0).text(index+1);
                    });
                });
            `);

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
                            comDom =$(`<span>1</span>`).attr("data-type","order")
                            break;
                        case "act":
                            //新增
                            comDom = require('createDom')[Settings.menuListDataJSON["iconButtonDom"].createFn](null,Global.ortum_createDom_frame,Object.assign({
                                "iconName":"icon-jiahao",
                            },createDomProp));
                            break;
                        default:
                            console.error("type类型不正确")
                            break;
                    }
                    children.push(Object.assign({
                        "frame":item.frame,
                        "componentKey":item.componentKey,
                        "children":[],
                    },comDom));
                }else{
                    comDom =require("createDom")[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,createDomProp);
                    children.push(Object.assign({
                        "frame":item.frame,
                        "componentKey":item.componentKey,
                        "children":[],
                    },comDom));
                }

                // let childrenLength = children.length;
                // //TODO 以后需要完善，现在只有一级children
                // if(Array.isArray(item.children)){
                //     item.children.forEach(function (itemSon,indexSon) {
                //         //创建组件的属性
                //         let createSonDomProp = Object.assign({
                //             HasProperties:HasProperties,
                //             customName:ortum_component_properties.data.name+"_"+ index + "_" + indexSon +"_"+ 1,
                //         },moreProps);
                //         Object.assign(createSonDomProp,itemSon);
                //         createSonDomProp.customProps = itemSon.customProps;
                //         let comSonDom = require("createDom")[Settings.menuListDataJSON[itemSon.componentKey].createFn](null,itemSon.frame,createSonDomProp);
                //         children[childrenLength-1].children.push(Object.assign({
                //             "frame":itemSon.frame,
                //             "componentKey":itemSon.componentKey,
                //             "children":[],
                //         },comSonDom))
                //     });
                // }
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
            //["columns","rows"]

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
    let ortumComponentSetJs = function(){

    }

    return {
        TableDom,

        inputSetProperties,
        blurSetProperties,
        clickSetProperties,
        // changeSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

        ortumComponentSetJs,

    }
})