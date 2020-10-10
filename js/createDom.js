/* 创建不同框架下的不同组件 */

define(["BootStrapGrid","BootStrapInput","BootStrapRangeInput","BootStrapRadio","BootStrapTextarea",
"BootStrapCheckbox"
],
function(BootStrapGrid,BootStrapInput,BootStrapRangeInput,BootStrapRadio,BootStrapTextarea,BootStrapCheckbox){
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
     * 创建单行
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
     * 创建多行
     * @param {*} type 
     */
    let createTextareaDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapTextarea.TextareaDom(parentDom)
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
    /**
     * 创建多选框
     * @param {*} type 
     */
    let createCheckboxDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapCheckbox.CheckboxDom(parentDom)
                break;
            default:

        }
    }
    
    return {
        createGridDom,
        createInputDom,
        createTextareaDom,
        createRangeInputDom,
        createRadioDom,
        createCheckboxDom,
    }
})