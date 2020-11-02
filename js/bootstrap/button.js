define(["require","assist","createDom","global"],function(require,Assist,CreateDom,Global){
    let component_properties = {
        data:{
            id:"",//id
            name:'',//name
            verification:"",//校验
            authority:"3",//权限
            cssClass:"btn btn-primary",
            title:"",
            iconBtn:true,
            iconNameArrs:["icon-jiahao","icon-shanchu"],
            //后期删除
            iconBtnClass:["ortum_table_addline","ortum_table_delline"],

        },
        inputChange:["id","name","verification","cssClass","title","iconNameArrs"],//input事件修改值
        clickChange:["authority","iconBtn"],
        changeChange:[],
        purview:{//属性编辑权限
            id:3,//id
            name:3,
            cssClass:3,
            verification:3,
            authority:3,//权限
            // labelCSS:3,//css类
            // labelName:3,//标签名称
            title:3,
            iconBtn:3,
            iconNameArrs:3,
        },
    }

    /**
     * 功能：创建bootstrap的label
     * @param {*} parentDom
     * @param {*} moreProps 一个json对象，
     * @param {*} moreProps.customProps 自定义属性
     * @param {*} moreProps.generateDom 函数也存在dom中
     * @param {*} moreProps.createJson 生成对应的json
     * @param {*} moreProps.HasProperties 保存组件的component_properties
     * @param {*} moreProps.clickChangeAttrs 是否允许修改点击属性（=== false的时候，去除点击修改属性）
     * @param {*} moreProps.dropAddComponent 拖拽添加组件
     */
    let ButtonDom = function(parentDom,moreProps=null){
        let customProps = null;
        let generateDom =  null;
        let clickChangeAttrs = true;
        let dropAddComponent = true;

        let createJson = false;
        let HasProperties = false;

        if(Assist.getDetailType(moreProps) == "Object"){
            customProps = (Assist.getDetailType(moreProps.customProps) == "Object" ? moreProps.customProps : null);
            moreProps.generateDom !== null && moreProps.generateDom !== undefined && (generateDom =moreProps.generateDom);
            moreProps.clickChangeAttrs === false && (clickChangeAttrs = moreProps.clickChangeAttrs);
            moreProps.HasProperties !== null && moreProps.HasProperties !== undefined && (HasProperties =moreProps.HasProperties);
            moreProps.createJson !== null && moreProps.createJson !== undefined && (createJson =moreProps.createJson);
            moreProps.dropAddComponent === false && (dropAddComponent = moreProps.dropAddComponent);
        }

        let outerDom=$(
            `
            <div class="ortum_item ortum_bootstrap_button" data-frame="Bootstrap" 
            data-componentKey="buttonDom">
               
            </div>
            `
        );
        //点击事件，修改属性
        clickChangeAttrs !== false && $(outerDom).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose);
        //拖拽事件
        dropAddComponent !== false && require("feature").bindDropEventToOrtumItem(outerDom);

        let ortum_component_properties = customProps ? customProps : Assist.deepClone(component_properties);
        //设定name
        ortum_component_properties.data.name || (ortum_component_properties.data.name = Assist.timestampName('button'));

        if(ortum_component_properties.data.iconBtn){
            ortum_component_properties.data.iconNameArrs.forEach(function(item,index){
                let spanBtn = $(`
                    <span class="iconfont  ${item} ${ortum_component_properties.data.iconBtnClass[index]}"></span>
                `);
                $(outerDom).append(spanBtn)
            })
        }else{
            let btn = $(`
                <button type="button" class="${ortum_component_properties.data.cssClass}" 
                ${ortum_component_properties.data.id ? "id="+ortum_component_properties.data.id : '' }>
                     ${ortum_component_properties.data.text}
                </button>
            `);
            $(outerDom).append(btn)
        }



        //dom绑定property
        clickChangeAttrs !== false && $(outerDom).prop('ortum_component_properties',ortum_component_properties).prop('ortum_component_type',['Bootstrap','button']);

        if(parentDom){
            $(parentDom).append(outerDom);
        }else if(createJson){//生成json
            return {
                "name":ortum_component_properties.data.name,
                "html":outerDom[0].outerHTML.replace(/\n/g,'').replace(/(\s)+/g," "),
                "bindComponentName":ortum_component_properties.data.bindComponentName,
                "title":(ortum_component_properties.data.title ? ortum_component_properties.data.title : ortum_component_properties.data.labelName),
                "componentProperties":(HasProperties ? Assist.jsonStringify(ortum_component_properties) : undefined),
            }
        }else{
            return outerDom
        }

    };

    return {
        ButtonDom,
    }
})