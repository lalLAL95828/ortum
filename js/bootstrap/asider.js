/* bootstrap的辅助函数 */
define(['require','assist','global',"settings"],function(require,Assist,Global,Settings){

    /**
     * grid 的col在未插入组件之前，默认的提示语
     */
    let tipAddComponentFn = function(createOrtumItem=true){
        let col;
        if(createOrtumItem){
            col = $(`
                <div class="col ortum_boot_col_default ortum_boot_col_waitInsert ortum_item">
                    <div style="display:flex;justify-content: center;align-items: center;height:100%;color:rgba(166,166,166,0.8)">
                        <span>选择其他组件插入</span>
                    </div>
                </div>
            `);
            bindFeatureToBootStarapCol(col);//绑定拖拽事件
        }else{
            col = $(`
                <div style="display:flex;justify-content: center;align-items: center;height:100%;color:rgba(166,166,166,0.8)">
                    <span>选择其他组件插入</span>
                </div>
            `)
        }
        return col;
    }
    /**
     * grid的拖拽事件
     * @param {*} ele 
     */
    let bindFeatureToBootStarapCol = function(ele){
        $(ele).on('dragover.firstbind',function(e){
            return false;
        })
        $(ele).on('drop.firstbind',function(e){
            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');
            if(!componentKey){//不存在对应key
                return false;
            }
            if(componentKey == "gridDom"){//如果拖拽上來的是grid,则不进行创建
                return false;
            }

            if(!require('createDom')[Settings.menuListDataJSON[componentKey].createFn]){
                Assist.dangerTip();
                return false;
            }

            if($(this).hasClass('ortum_boot_col_waitInsert')){
                $(this).removeClass('ortum_boot_col_waitInsert')
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
        switch(type){
            case "grid":
                inputEvent = require('BootStrapGrid').inputSetProperties;
                blurEvent = require('BootStrapGrid').blurSetProperties;
                changeEvent = require('BootStrapGrid').changeSetProperties;
                clickEvent = require('BootStrapGrid').clickSetProperties;
                keyDownEvent = require('BootStrapGrid').keyDownSetProperties;
                keyUpEvent = require('BootStrapGrid').keyUpSetProperties;
                break;
            case "input":
                inputEvent = require('BootStrapInput').inputSetProperties;
                blurEvent = require('BootStrapInput').blurSetProperties;
                changeEvent = require('BootStrapInput').changeSetProperties;
                clickEvent = require('BootStrapInput').clickSetProperties;
                keyDownEvent = require('BootStrapInput').keyDownSetProperties;
                keyUpEvent = require('BootStrapInput').keyUpSetProperties;
                break;
            case "textarea":
                inputEvent = require('BootStrapTextarea').inputSetProperties;
                blurEvent = require('BootStrapTextarea').blurSetProperties;
                changeEvent = require('BootStrapTextarea').changeSetProperties;
                clickEvent = require('BootStrapTextarea').clickSetProperties;
                keyDownEvent = require('BootStrapTextarea').keyDownSetProperties;
                keyUpEvent = require('BootStrapTextarea').keyUpSetProperties;
                break;
            case "rangeInput":
                inputEvent = require('BootStrapRangeInput').inputSetProperties;
                blurEvent = require('BootStrapRangeInput').blurSetProperties;
                changeEvent = require('BootStrapRangeInput').changeSetProperties;
                clickEvent = require('BootStrapRangeInput').clickSetProperties;
                keyDownEvent = require('BootStrapRangeInput').keyDownSetProperties;
                keyUpEvent = require('BootStrapRangeInput').keyUpSetProperties;
                break;
            case "radio":
                inputEvent = require('BootStrapRadio').inputSetProperties;
                blurEvent = require('BootStrapRadio').blurSetProperties;
                changeEvent = require('BootStrapRadio').changeSetProperties;
                clickEvent = require('BootStrapRadio').clickSetProperties;
                keyDownEvent = require('BootStrapRadio').keyDownSetProperties;
                keyUpEvent = require('BootStrapRadio').keyUpSetProperties;
                break;
            case "checkbox":
                inputEvent = require('BootStrapCheckbox').inputSetProperties;
                blurEvent = require('BootStrapCheckbox').blurSetProperties;
                changeEvent = require('BootStrapCheckbox').changeSetProperties;
                clickEvent = require('BootStrapCheckbox').clickSetProperties;
                keyDownEvent = require('BootStrapCheckbox').keyDownSetProperties;
                keyUpEvent = require('BootStrapCheckbox').keyUpSetProperties;
                break;
                
            case "file":
                inputEvent = require('BootStrapFile').inputSetProperties;
                blurEvent = require('BootStrapFile').blurSetProperties;
                changeEvent = require('BootStrapFile').changeSetProperties;
                clickEvent = require('BootStrapFile').clickSetProperties;
                keyDownEvent = require('BootStrapFile').keyDownSetProperties;
                keyUpEvent = require('BootStrapFile').keyUpSetProperties;
                break;
            case "switch":
                inputEvent = require('BootStrapSwitch').inputSetProperties;
                blurEvent = require('BootStrapSwitch').blurSetProperties;
                changeEvent = require('BootStrapSwitch').changeSetProperties;
                clickEvent = require('BootStrapSwitch').clickSetProperties;
                keyDownEvent = require('BootStrapSwitch').keyDownSetProperties;
                keyUpEvent = require('BootStrapSwitch').keyUpSetProperties;
                break;
            case "select":
                inputEvent = require('BootStrapSelect').inputSetProperties;
                blurEvent = require('BootStrapSelect').blurSetProperties;
                changeEvent = require('BootStrapSelect').changeSetProperties;
                clickEvent = require('BootStrapSelect').clickSetProperties;
                keyDownEvent = require('BootStrapSelect').keyDownSetProperties;
                keyUpEvent = require('BootStrapSelect').keyUpSetProperties;
                break;
            default:
                break;
        }
        
        //获取组件的属性
        let data = properies.data;
        let purview = properies.purview;
        
        $('#ortum_collapseOne .form-group').hide();//隐藏所有属性
        for(let key in data){
            //设置编辑属性权限
            require('feature').setEditPropertiesPurview(key,purview[key]);
            switch(key){
                case "authority":case "labelPosition"://checkbox
                    $('input[name=ortum_property_'+ key +'][value='+data[key]+']').prop("checked",true); 
                    break;
                case "hideLabel":case "inline":case "multiple":case "automatic":case "checked":case "useRemote"://开关
                    $('input[name=ortum_property_'+ key +']').prop("checked",data[key]); 
                    break;
                default:
                    $('#ortum_property_'+key).val(data[key])
                    break
            }
            // console.log(key)
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

    return {
        tipAddComponentFn,
        bindFeatureToBootStarapCol,
        setProperties,
    };
})