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
            theadColumnsArr:[
                {
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
            title:"",//设置dom的title属性，一般与labelName一致
            canSelfAdd:true,//能够自增

            onBefore:"",
            onAfter:"",
        },
        inputChange:["id","name","columns","verification","cssClass","theadCssClass","tbodyCssClass","theadTrCssClass","tbodyTrCssClass","thCssClass","thCssClass","tdCssClass"],//input事件修改值
        clickChange:["authority","showThead","showTbody","canSelfAdd"],
        purview:{//属性编辑权限
            id:3,//id
            name:2,//name
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
            columns:3,
            rows:3,
            title:3,//设置dom的title属性，一般与labelName一致
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
        !createJson && $(tbodyDom).prop("ortum_tbodyTds_info",ortum_component_properties.data.tbodyColumnsArr)
        //创建tbody的tr
        for(let j=0;j<ortum_component_properties.data.rows;j++){
            tdMoreProps.order=j+1;
            let tbodyTrObj =BootStrapAsider.tableTbodyAddLine(ortum_component_properties.data.tbodyColumnsArr,tdMoreProps);
            $(tbodyDom).append(tbodyTrObj);
        };

        //【thead】
        let theadDom = $(`
            <thead 
            ${ortum_component_properties.data.theadCssClass ? "class="+ortum_component_properties.data.theadCssClass : '' } 
            ></thead>
        `);

        if(!ortum_component_properties.data.showThead){
            theadDom.addClass("ortum_display_NONE")
        }

        let theadTrObj =BootStrapAsider.tableTheadAddLine(ortum_component_properties.data.theadColumnsArr,
            {
                trCssClass:ortum_component_properties.data.theadTrCssClass,
                thCssClass:ortum_component_properties.data.thCssClass,
                canSelfAdd:ortum_component_properties.data.canSelfAdd,
                // tbody:tdMoreProps,
                order:1,//序号
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
            addlineTrInfo = BootStrapAsider.tableTbodyAddLine(ortum_component_properties.data.tbodyColumnsArr,tdMoreProps);

            scriptStr = `
                let tableName = "${ortum_component_properties.data.name}";
            `;
            ortum_component_properties.data.canSelfAdd && (scriptStr+=`
                $("table[name="+ tableName +"]").on("click.addline",".icon-jiahao",function(){
                    let tdInfoArr = $(this).parents("table").eq(0).find("tbody").prop("ortum_tbodyTds_info");
                    let addlineTr = $(this).parents("table").eq(0).find("tbody").prop("ortum_tbodyTr_info");
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
                $("table[name="+ tableName +"]").on("click.delete",".icon-shanchu",function(){
                    $(this).parents("tr").eq(0).remove();
                });
            `);

            //创建td中组件的json信息
            ortum_component_properties.data.tbodyColumnsArr.forEach(function(item,index){
                
                //创建组件的属性
                let createDomProp = Object.assign({
                    HasProperties:HasProperties,
                    customName:ortum_component_properties.data.name+"_"+index + "_" + 1,//1代表第一行
                },moreProps);
                
                Object.assign(createDomProp,item);
                createDomProp.customProps = item.customProps;
                let comDom = require("createDom")[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,createDomProp);

                children.push(Object.assign({
                    "frame":item.frame,
                    "componentKey":item.componentKey,
                    "children":[],
                },comDom));
                let childrenLength = children.length;
                //TODO 如果是按钮组
                if(item.children && item.children.length && item.frame=="Bootstrap" && item.componentKey =="buttonGroupDom"){
                    let buttonGroupHtml = $(children[childrenLength-1].html);
                    item.children.forEach(function (itemSon,indexSon) {
                        // $(buttonGroupHtml).find(".ortum_append").eq(0).append(`<ortum_children></ortum_children>`)
                        //创建组件的属性
                        let createSonDomProp = Object.assign({
                            HasProperties:HasProperties,
                            customName:ortum_component_properties.data.name+"_"+ index + "_" + indexSon +"_"+ 1,
                        },moreProps);
                        Object.assign(createSonDomProp,itemSon);
                        createSonDomProp.customProps = itemSon.customProps;
                        let comSonDom = require("createDom")[Settings.menuListDataJSON[itemSon.componentKey].createFn](null,itemSon.frame,createSonDomProp);

                        /* let comSonDom = require("createDom")[Settings.menuListDataJSON[itemSon.componentKey].createFn](null,itemSon.frame,{
                            customProps:itemSon.customProps,
                            createJson:true,//生成对应的json
                            generateDom:true,
                            clickChangeAttrs:false,
                            bindDropEvent:false,
                            createWaitSpan:false,
                            HasProperties:HasProperties,
                            iconName:itemSon.moreProps.iconName,
                            customName:ortum_component_properties.data.name+"_"+ index + "_" + indexSon +"_"+ 1,
                        }); */
                        children[childrenLength-1].children.push(Object.assign({
                            "frame":itemSon.frame,
                            "componentKey":itemSon.componentKey,
                            "children":[],
                        },comSonDom))
                    });
                    children[childrenLength-1].html = buttonGroupHtml[0].outerHTML;
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
            }
        }else{
            return outerDom
        }
    }


    /**
     * 功能：设置js
     */
    let ortumComponentSetJs = function(){

    }

    return {
        TableDom,

        // inputSetProperties,
        // blurSetProperties,
        // clickSetProperties,
        // changeSetProperties,
        // keyDownSetProperties,
        // keyUpSetProperties,

        ortumComponentSetJs,

    }
})