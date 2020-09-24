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
        switch(type){
            case "input":
                require('BootStrapInput').setProperties(properies,that);
                break;
            default:
                break;
        }
    }

    return {
        tipAddComponentFn,
        bindFeatureToBootStarapCol,
        setProperties,
    };
})