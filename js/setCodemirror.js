define([
    "codemirror",

    
    
    "CSS!codemirror/lib/codemirror.css",
    "codemirror/mode/javascript/javascript",
    "CSS!codemirror/theme/monokai.css",
    "CSS!codemirror/addon/fold/foldgutter.css",
    "codemirror/addon/fold/brace-fold",
    "codemirror/addon/fold/foldcode",
    "codemirror/addon/fold/foldgutter",

    "codemirror/keymap/sublime",//快捷键


    "CSS!codemirror/addon/hint/show-hint.css",
    "codemirror/addon/hint/show-hint",
    "codemirror/addon/hint/javascript-hint",
    "CSS!codemirror/addon/display/fullscreen.css",//全屏
    "codemirror/addon/display/fullscreen",

    
],

function(CodeMirror){
    //初始化
    let init = function(){
        const option = {
            // value: "function myScript(){return 100;}",
            mode:  "javascript",
            theme:"monokai",
            lineNumbers:true,//行号
            lineWrapping: true,
            autofocus:true,
            keyMap:"sublime",
            foldGutter: true,//开启折叠
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

            //提示
            hintOptions:{
                // hint:CodeMirror.hint.javascript,
                completeSingle:false,
            },
        }
    
        let myCodeMirror = CodeMirror.fromTextArea(document.getElementById('ortum_codeMirror'), option);
        // myCodeMirror.setSize("100%","300px");
        // myCodeMirror.setValue("function myScript(){return 100;}");

        myCodeMirror.refresh()

        //显示提示  
        myCodeMirror.on("inputRead", () => {
            myCodeMirror.showHint();
        }); 
    
        //设置全屏快捷键
        myCodeMirror.setOption("extraKeys", {
            F11:function(cm) {
                cm.setOption("fullScreen", true)
                return;
            },
            Esc:function(cm) {
                cm.setOption("fullScreen", false)
                return;
            },
        });

        
        return myCodeMirror
    }
    

    return {
        init:init,
    }
})