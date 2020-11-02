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
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>序号</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>设备编码</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>设备名称</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>规格型号</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>不含税价格（元）</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>数量</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>单位</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>开始使用日期</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>使用状况</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>预计处置价格（元）</span>",
                },
                {

                    frame:"Bootstrap",
                    componentKey:"spanDom",
                    html:"<span>备注</span>",
                },
                {
                    frame:"Bootstrap",
                    componentKey:"spanDom",
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
                        "componentKey":"buttonGroupDom",
                    },{
                        "frame":"Bootstrap",
                        "componentKey":"buttonGroupDom",
                    }]
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
        }

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
        };
        Assist.getDetailType(moreProps) == "Object" &&  Object.assign(tdMoreProps,moreProps);
        for(let j=0;j<ortum_component_properties.data.rows;j++){
            tdMoreProps.order=j+1;
            let tbodyTrObj =BootStrapAsider.tableTbodyAddLine(ortum_component_properties.data.tbodyColumnsArr,tdMoreProps);
            $(tbodyDom).append(tbodyTrObj);
        }

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

        //script标签
        let scriptStr = '';
        let addlineTrInfo = '';
        if(createJson){
            addlineTrInfo = BootStrapAsider.tableTbodyAddLine([{},{},{},{},{},{},{},{},{},{},{},{}],tdMoreProps);

            scriptStr = `
                let tableName = "${ortum_component_properties.data.name}";
            `;
            ortum_component_properties.data.canSelfAdd && (scriptStr+=`
                $("table[name="+ tableName +"]").find(".icon-jiahao").eq(0).off("click.addline").on("click.addline",function(){
                    let tdInfoArr = $(this).parents("table").eq(0).find("tbody > tr:first-of-type").prop("ortum_tbodyTr_info");
                    let addlineTr = $(this).parents("table").eq(0).find("tbody").eq(0).prop("ortum_table_add_context");
                    let nextTr = $(addlineTr);
                    tdInfoArr.forEach(function(item){ 
                        $(nextTr).find("ortum_children").eq(0).replaceWith(item.html)
                    });
                    $(this).parents("table").eq(0).find("tbody").eq(0).append(nextTr);
                });
                $("table[name="+ tableName +"]").on("click.delete",".icon-shanchu",function(){
                    $(this).parents("tr").eq(0).remove();
                    console.log($(this).parents("tr").eq(0));
                    debugger;
                });
            `)
        }

        //创建children
        let children = [];
        if(createJson){
            ortum_component_properties.data.tbodyColumnsArr.forEach(function(item,index){
                let comDom = require("createDom")[Settings.menuListDataJSON[item.componentKey].createFn](null,item.frame,{
                    customProps:item.customProps,
                    createJson:true,//生成对应的json
                    generateDom:true,
                    clickChangeAttrs:false,
                    bindDropEvent:false,
                    createWaitSpan:false,
                    HasProperties:HasProperties,
                });
                children.push({
                    "frame":item.frame,
                    "componentKey":item.componentKey,
                    "title":comDom.title,
                    "name":comDom.name,
                    "html":comDom.html,
                    "attrs":comDom.attrs,
                    "css":comDom.css,
                    "script":comDom.script,
                    "children":[],
                    "bindComponentName":comDom.bindComponentName,
                    "componentProperties":comDom.componentProperties,
                })
            })
        }

        let scriptDom = $(`<script>${scriptStr}</script>`);

        if(parentDom){
            $(parentDom).append(outerDom);
        }else if(createJson){//生成json
            return {
                "name":ortum_component_properties.data.name,
                "title":(ortum_component_properties.data.title ? ortum_component_properties.data.title : ortum_component_properties.data.labelName),
                "html":outerDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "ortum_table_add_context":addlineTrInfo[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "script":scriptDom,
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