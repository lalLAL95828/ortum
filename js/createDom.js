/* 创建不同框架下的不同组件 */

define(["BootStrapGrid","BootStrapInput","BootStrapRangeInput","BootStrapRadio","BootStrapTextarea",
"BootStrapCheckbox",
"BootStrapFile",
"BootStrapSwitch",
"BootStrapSelect",
],
function(BootStrapGrid,BootStrapInput,BootStrapRangeInput,BootStrapRadio,BootStrapTextarea,BootStrapCheckbox,
    BootStrapFile,BootStrapSwitch,BootStrapSelect){
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
    /**
     * 创建文件上传
     * @param {*} type 
     */
    let createFileDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapFile.FileDom(parentDom)
                break;
            default:

        }
    }
    /**
     * 创建开关
     * @param {*} type 
     */
    let createSwitchDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapSwitch.SwitchDom(parentDom)
                break;
            default:

        }
    }
    /**
     * 创建select
     * @param {*} type 
     */
    let createSelectDom = function(parentDom,type){
        switch(type){
            case 'Bootstrap':
                BootStrapSelect.SelectDom(parentDom)
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
        createFileDom,
        createSwitchDom,
        createSelectDom,
    }
})