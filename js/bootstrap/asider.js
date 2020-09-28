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
            $(col).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose)
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
        
            if($(this).hasClass('ortum_boot_col_waitInsert')){
                $(this).removeClass('ortum_boot_col_waitInsert')
                this.innerHTML = "";
            }else{
                //TODO 确定是否替换
                return false;
            }

            //获取要创建的组件key
            let componentKey = $(Global.ortumNowDragObj).attr('data-key');

            if(!componentKey){//不存在对应key
                return false;
            }
            
            //执行对应的生成组件的函数(此处要解决 grid.js 与createDom 循环依赖的问题)
            require('CreateDom')[Settings.menuListDataJSON[componentKey].createFn](this,Settings.menuListDataJSON[componentKey].useType)
            
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
            case "input":
                inputEvent = require('BootStrapInput').inputSetProperties;
                blurEvent = require('BootStrapInput').blurSetProperties;
                changeEvent = require('BootStrapInput').changeSetProperties;
                clickEvent = require('BootStrapInput').clickSetProperties;
                keyDownEvent = require('BootStrapInput').keyDownSetProperties;
                keyUpEvent = require('BootStrapInput').keyUpSetProperties;
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
                inputEvent = require('BootStraRadio').inputSetProperties;
                blurEvent = require('BootStraRadio').blurSetProperties;
                changeEvent = require('BootStraRadio').changeSetProperties;
                clickEvent = require('BootStraRadio').clickSetProperties;
                keyDownEvent = require('BootStraRadio').keyDownSetProperties;
                keyUpEvent = require('BootStraRadio').keyUpSetProperties;
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
                case "hideLabel"://开关
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
            frame:"bootstrap",
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