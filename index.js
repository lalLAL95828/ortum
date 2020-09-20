function findGloabl(){
    require(['Feature','Global'],function(Feature,Global){
        console.log(Global.ortumComponents);
        console.log(Global.ortumField);
        console.log(Global.ortumItem);
    })
}