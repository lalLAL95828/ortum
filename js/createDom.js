/* 创建不同框架下的不同组件 */

define(["BootStrapGrid","BootStrapInput","BootStrapRangeInput","BootStrapRadio"],
function(BootStrapGrid,BootStrapInput,BootStrapRangeInput,BootStrapRadio){
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

    /**
     * 创建进度选择器
     * @param {*} type 
     */
    let createRangeInputDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapRangeInput.RangeInputDom(parentDom)
                break;
            default:

        }
    }
     /**
     * 创建单选框
     * @param {*} type 
     */
    let createRadioDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapRadio.RadioDom(parentDom)
                break;
            default:

        }
    }
    
    return {
        createGridDom,
        createInputDom,
        createRangeInputDom,
        createRadioDom
    }
})