define("src/carousel",function (require, exports, module) {
    var Carousel = function(el,option) {
        this.$el = el;
        this.options = option;
        this._init();
    }
    Carousel.defaults = {
        type:"slide",  //slide 为滑动 fade渐隐藏
        time:"1500"  //false  不开启定时转换  数字时为时间
    }
    Carousel.prototype = {
        _init:function() {
            var carousel = this.$el,
                items = $(carousel).find('.item');
            $(carousel).width(items.find('img').width()).height(items.find('img').height());

            $(items).first().addClass('carousel-one').addClass('active');
            $(items).last().addClass("carousel-last");

            this.items = items;
            this.initLeftRight();
            this.initIndex();
            this.timing();
        },
        initLeftRight:function(){
            var carousel = this.$el,
                items = this.items,
                that = this;
            $(carousel).append("<div class='control left'></div><div class='control right'></div>");
            $(carousel).find(".left").on("click",function () {
                that.nextExec(that.getNextItem('left'), 'left');
                that.options.time = false;
            });
            $(carousel).find(".right").on('click', function() {
                that.nextExec(that.getNextItem('right'), 'right');
                that.options.time = false;
            });
        },
        initIndex:function(){
            var carousel = this.$el,
                items = this.items,
                that = this;
            $(carousel).append('<div class="index"><ul></ul></div>');
            var indexli = $(carousel).find('.index ul');
            this.indexli = indexli;
            for (var i = 0; i < items.length; i++) {
                indexli.append("<li></li>")
            };//添加圆圈index
            $(indexli).children().first().addClass("now");
            $(indexli).children().on("click",function(){
                var number = $(this).index();
                if (!$(items[number]).hasClass("active")) {
                    that.nextExec($(items[number]));
                    that.options.time = false;
                };
            });
        },
        timing:function(time){
            var that = this,
                time = this.options.time;
            var timing = window.setInterval(function(){
                if (that.options.time) {
                    that.nextExec(that.getNextItem('right'),'right');
                } else {
                    window.clearInterval(timing);
                };
            }, time);
        },
        getNextItem:function(dir){
            var active = this.$el.find('.active'),
                items = this.items;
            if (dir == 'right')
            return active.hasClass('carousel-last') ? items.first() : active.next();
            if (dir == 'left')
            return active.hasClass('carousel-one') ? items.last() : active.prev();

        },
        nextExec:function(item, dir){
            /*判断现在选择的type*/
            if (this.options.type == 'fade') {
                this.fade(item)
            };
            if (this.options.type == 'slide') {
                this.slide(item, dir);
            };
        },
        fade:function(item){
            var indexli = this.indexli;
            var active = this.$el.find(".active");
            active.fadeOut(400);
            $(item).fadeIn(400,function(){
                active.removeClass('active');
                $(item).addClass("active");
            });
            this.execIndex(item.index());
        },
        slide:function(item, dir){
            var active = this.$el.find(".active");
            var activeleft = (dir == "left")? "100%" : "-100%";
            var itemleft = (dir == "left")?"-100%" : "100%";
            if (!active.is(":animated")) {
                active.animate({
                    "left":activeleft
                },400);
                item.css({
                        "left":itemleft,
                        "display":"block"
                    }).animate({
                    "left":"0%"
                },400,function(){
                    active.removeClass("active");
                    item.addClass("active");
                })
                this.execIndex(item.index());
            }
        },
        execIndex:function(num){
            $(this.indexli).find(".now").removeClass("now");
            $(this.indexli.children().get(num)).addClass("now");
        }
    }
    $.fn.carousel = function(options) {
        var data = this.data('carousel');
        var option = $.extend({}, Carousel.defaults, typeof options == 'object' && options);
        if (!data) {
            this.data('carousel', data = new Carousel(this, option))
        };
    }
    $("[data-module='carousel']").each(function(index, val) {
        $(this).carousel();
    });
});