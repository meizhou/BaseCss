+function($){
    $(document).on('mouseenter','[data-call="tips"]', function(event) {
            var content=$(this).data('content'),
                dir=$(this).data('dir'),
                top=$(this).offset().top,
                left=$(this).offset().left;
                if (!dir) {dir="top";};
            $("body").append("<div class='hovertips "+dir+"' style='position:absolute;'><div class='tri'></div>"+content+"</div>");
            hovertips=$(".hovertips");
            var width=hovertips.outerWidth(),
                height=hovertips.outerHeight(),
                tipswidth=$(this).outerWidth(),
                tipsheight=$(this).outerHeight(),
                offset={};
            offset.top=(dir=="top")?(top-height-10):(dir=="bottom")?(top+tipsheight+10):(top-Math.abs(tipsheight-height)/2);
            offset.left=(dir=="left")?(left-width-10):(dir=="right")?(left+tipswidth+10):(left-Math.abs(width-tipswidth)/2);
            hovertips.offset(offset).fadeIn('100', function() {});
    }).on('mouseleave','[data-call="tips"]', function(event) {
                hovertips.remove();
    });
}(window.jQuery)