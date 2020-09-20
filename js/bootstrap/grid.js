define(["require","Assist","Config","Global",'BootStrapAsider'],function(require,Assist,Config,Global,BootStrapAsider){
    /**
     * 功能：创建bootstrap的栅格系统
     */
    let GridDom = function(parentDom){
        let createContainer = true
        $(parentDom).hasClass('container') && (createContainer=false);
        // $(parentDom).parents().each(function(index,item){
        //     if($(item).hasClass('container')){
        //         createContainer=false;
        //         return false;
        //     }
        // })
        let container;
        createContainer && (container = $('<div class="container ortum_item"></div>'));

        let row = $(`
            <div class="row ortum_item" data-col-num=2 style="background-color:#e6e6e6"></div>
        `)
        for(let i=0;i<$(row).attr('data-col-num');i++){
            // let col =$(`
            //     <div class="col ortum_boot_col_default ortum_boot_col_waitInsert ortum_item">
            //         <div style="display:flex;justify-content: center;align-items: center;height:100%;color:rgba(166,166,166,0.8)">
            //             <span>选择其他组件插入</span>
            //         </div>
            //     </div>
            // `)

            // $(col).off('click.addClickChoose').on('click.addClickChoose',Assist.addClickChoose)

            // bindFeatureToBootStarapCol(col);//绑定拖拽事件
            // $(row).append(col)
            let col=BootStrapAsider.tipAddComponentFn()
            $(row).append(col)
        }
        
        if(container){
            container.append(row);
        }else{
            container = row;
        }
        $(parentDom).append(container)
        return container;
    }


    return {
        GridDom,
    }
})