define("src/dialog",function (require, exports, module) {
    require('jquery');
    var Dialog = function(el,option) {
        this.el = el;
        this.options = option;
        this._init();
    }
    Dialog.defaults = {
        width:'500px',
        height:'300px',
        clickClose:'.dialog-close', //点击神魔的时候,关闭
        close:function(){   //关闭时调用
            console.log("CLOSE");
        },
        bindEvent:function(){  //初始化是可以绑定事件
        },
        show:function(){
            console.log("show");
        }
    }
    Dialog.prototype = {
        _init:function() {
            var that = this;
            this.el.click(function(event) {
                var target = $(this).data('target').split("|");
                that.dialogShow($(target[0]), target[1]);
            });
            that.options.bindEvent();
        },
        dialogShow:function(dialog, dir){
            var that = this;
            if (!dir) {
                dir = "top";
            };
            dialog.width(this.options.width).height(this.options.height);
            var width = dialog.width(),
                height = dialog.height(),
                oldtop = (dir == "left" || dir == "right")? "50%" : (dir == "bottom" ? "100%" : "-"+height+'px'),
                oldleft = (dir == "top" || dir == "bottom")? "50%" : (dir == "left" ? ("-"+width+"px") : "100%"),
                margin_left = (dir == "left" || dir == "right")? - width / 2 : - width / 2,
                margin_top = (dir == "left" || dir == "right")? - height / 2 : "0px",
                top = (dir == "left" || dir == "right") ? "50%" : "100px";
            if (!dialog.is(":animated")) {
                $("body").append("<div class='dialogShade'></div>");
                $(".dialogShade").show(0);
                dialog.css({
                    'top':oldtop,'left':oldleft,'margin-left':margin_left,'margin-top':margin_top
                }).show(0).animate({
                    'top': top,
                    "left":"50%"
                },200, function() {
                });
            }
            this.options.show();
            $(document).one('click',that.options.clickClose,function(){
                that.dialogClose(dialog,oldtop,oldleft);
            })
        },
        dialogClose:function(dialog, oldtop, oldleft){
            var that = this;
            oldtop = oldtop ? oldtop : "-"+dialog.height()+'px';
            oldleft = oldleft ? oldleft : '50%';
            if (!dialog.is(":animated")) {
                dialog.animate({
                    "top":oldtop,
                    "left": oldleft
                },
                200, function() {
                    $(".dialogShade").remove();
                }).hide(0);
                that.options.close()
            }
        }
    }
    $.fn.dialog = function(options,_relatedTarget) {
        var data = this.data('dialog');
        var option = $.extend({}, Dialog.defaults, typeof options == 'object' && options);
        if (!data) {
            this.data('dialog', data = new Dialog(this, option))
        };
        return data;
    }
});