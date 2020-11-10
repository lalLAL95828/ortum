/* 创建不同框架下的不同组件 */

define(["BootStrapGrid","BootStrapInput","BootStrapRangeInput","BootStrapRadio","BootStrapTextarea",
"BootStrapCheckbox",
"BootStrapFile",
"BootStrapSwitch",
"BootStrapSelect",
"BootStrapLabel",
"BootStrapDate",
"BootStrapTable", "BootStrapButton","BootStrapButtonGroup",
"BootStrapIconButton","BootStrapH",
],
function(BootStrapGrid,BootStrapInput,BootStrapRangeInput,BootStrapRadio,BootStrapTextarea,BootStrapCheckbox,
    BootStrapFile,BootStrapSwitch,BootStrapSelect,BootStrapLabel,BootStrapDate,BootStrapTable,BootStrapButton,BootStrapButtonGroup,
    BootStrapIconButton,BootStrapH){
    /**
     * 创建栅格系统
     * @param {*} type 
     */
    let createGridDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapGrid.GridDom(parentDom,moreProps)
                break;
            default:

        }
    }
    /**
     * 创建单行
     * @param {*} type 
     */
    let createInputDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapInput.InputDom(parentDom,moreProps)
                break;
            default:

        }
    }
    /**
     * 创建多行
     * @param {*} type 
     */
    let createTextareaDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapTextarea.TextareaDom(parentDom,moreProps)
                break;
            default:

        }
    }

    /**
     * 创建进度选择器
     * @param {*} type 
     */
    let createRangeInputDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapRangeInput.RangeInputDom(parentDom,moreProps)
                break;
            default:

        }
    }
     /**
     * 创建单选框
     * @param {*} type 
     */
    let createRadioDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapRadio.RadioDom(parentDom,moreProps)
                break;
            default:

        }
    }
    /**
     * 创建多选框
     * @param {*} type 
     */
    let createCheckboxDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapCheckbox.CheckboxDom(parentDom,moreProps)
                break;
            default:

        }
    }
    /**
     * 创建文件上传
     * @param {*} type 
     */
    let createFileDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapFile.FileDom(parentDom,moreProps)
                break;
            default:

        }
    }
    /**
     * 创建开关
     * @param {*} type 
     */
    let createSwitchDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapSwitch.SwitchDom(parentDom,moreProps)
                break;
            default:

        }
    }
    /**
     * 创建select
     * @param {*} type 
     */
    let createSelectDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapSelect.SelectDom(parentDom,moreProps)
                break;
            default:

        }
    }
    
    /**
     * 创建label
     * @param {*} type
     */
    let createLabelDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapLabel.LabelDom(parentDom,moreProps)
                break;
            default:

        }
    }
    /**
     * 创建label
     * @param {*} type
     */
    let createDateDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapDate.DateDom(parentDom,moreProps)
                break;
            default:

        }
    }

    /**
     * 创建table
     * @param {*} type
     */
    let createTableDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapTable.TableDom(parentDom,moreProps)
                break;
            default:

        }
    }

    /**
     * 创建按钮
     * @param {*} type
     */
    let createButtonDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapButton.ButtonDom(parentDom,moreProps)
                break;
            default:

        }
    }
    /**
     * 创建图标按钮
     * @param {*} type
     */
    let createIconButtonDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapIconButton.IconButtonDom(parentDom,moreProps)
                break;
            default:
        }
    }

    /**
     * 创建按钮组
     * @param {*} type
     */
    let createButtonGroupDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapButtonGroup.ButtonGroupDom(parentDom,moreProps)
                break;
            default:
        }
    }

    /**
     * 创建标题标签
     * @param {*} type
     */
    let createHDom = function(parentDom,type,moreProps=null){
        switch(type){
            case 'Bootstrap':
                return BootStrapH.HDom(parentDom,moreProps)
                break;
            default:
        }
    }

    //设置对应Bootstrap框架 生成组件的函数是否开启
    createGridDom.ortum_Bootstrap = true;
    createInputDom.ortum_Bootstrap = true;
    createTextareaDom.ortum_Bootstrap = true;
    createRangeInputDom.ortum_Bootstrap = true;
    createRadioDom.ortum_Bootstrap = true;
    createCheckboxDom.ortum_Bootstrap = true;
    createFileDom.ortum_Bootstrap = true;
    createSwitchDom.ortum_Bootstrap = true;
    createSelectDom.ortum_Bootstrap = true;
    createLabelDom.ortum_Bootstrap = true;
    createDateDom.ortum_Bootstrap = true;
    createTableDom.ortum_Bootstrap = true;
    createButtonDom.ortum_Bootstrap = true;
    createButtonGroupDom.ortum_Bootstrap = true;
    createIconButtonDom.ortum_Bootstrap = true;
    createHDom.ortum_Bootstrap = true;
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
        createLabelDom,
        createDateDom,
        createTableDom,
        createButtonDom,
        createButtonGroupDom,
        createIconButtonDom,
        createHDom,
    }
})