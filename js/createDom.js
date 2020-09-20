define(["BootStrapGrid","BootStrapInput"],function(BootStrapGrid,BootStrapInput){
    /**
     * 创建栅格系统
     * @param {*} type 
     */
    let createGridDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapGrid.GridDom(parentDom)
                break;
            default:

        }
    }
    /**
     * 创建单选框
     * @param {*} type 
     */
    let createInputDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapInput.InputDom(parentDom)
                break;
            default:

        }
    }
    
    return {
        createGridDom,
        createInputDom,
    }
})