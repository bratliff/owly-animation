
var owlAnim = {
    owly : $('.owly'),
    bgarray : ['owly','assessment-window','clouds','mountains','trees','tree','grass1','grass2'],
    owlyFly : function(el, owlWidget, array) {
        owlWidget.state.setAnimation(0, "flapwings", true);
        $.each(array, function(i, val){
            $('.' + val).addClass('transition');
        });
        {
            var tl = new TimelineLite();
            tl.to(el, 0.2, {rotation:50, x:5, y:-5})
            tl.to(el, 0.6, {x:1300, y:-250})
            tl.to(el, 0.2, {rotation:20});
            tl.to(el, 0.6, {x:1700, y:-400})
            tl.to(el, 0.2, {rotation:90})
            tl.to(el, 0.3, {x:2000, y:-300})
            tl.to(el, 0.3, {rotation:0, x:2100, y:-400})
            tl.to(el, 0.8, {x:2100, y:0})
            .add(function() {
                owlWidget.state.setAnimation(0, "look left", false);
            });
        };
    },
    transition : function(array, owlWidget){
        this.owlyFly(this.owly, owlWidget);
        owlWidget.state.setAnimation(0, "flapwings", true);
        $.each(array, function(i, val){
            $('.' + val).addClass('transition');
        })
    },
    init : function(owlWidget) {
        var that = this;
        $('.ok-button').click(function(){
            owlWidget.state.setAnimation(0, "flapwings", false);
            $('.speech-bubble').show(500, function(){
                owlWidget.state.setAnimation(0, "wink", false);
                $('.speech-bubble').delay(1000).hide(500, function(){
                    that.owlyFly(that.owly, owlWidget, that.bgarray);
                });
            });


        });
        $('.sound-button-select').click(function(){
            owlWidget.state.setAnimation(0, "flapwings", false);
        });
    }
}

$(document).ready(function(){
    new spine.SpineWidget("spine-widget", {
    	json: "assets/owly.json",
    	atlas: "assets/owly.atlas",
    	animation: "flapwings",
        alpha:true,
    	backgroundColor: "#00000000",
    	success: function (widget) {
            owlWidget = widget;
            owlWidget.state.setAnimation(0, "look left", false);
    		owlAnim.init(owlWidget);
    	}
    });

});
