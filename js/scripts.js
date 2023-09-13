var scale = {
    globalScale: null
    , init: function() {
        var me = this;

        setTimeout(function() {
            $('#pf1').addClass('active');
            $('.pf:not(#pf1)').addClass('next');
            me.GetScale();
            me.AddControls();
            me.UpdateURLs();
            me.FadeLoader();
        }, 1500)
        
        me.Resize();
    }

    , FadeLoader: function() {
        var me = this;

        $('#loader').addClass('fadeout');

        setTimeout(function() {
            $('#loader').remove();
        }, 1000);
    }

    , GetScale: function() {
        var me = this;

        var elm = $('#pf1');
        $('body, html').css('overflow', 'hidden');
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        $('body, html').css('overflow', 'visible');

        var scaleX = windowWidth / elm.outerWidth(true);
        var scaleY = windowHeight / elm.outerHeight(true);

        me.globalScale = scaleY < scaleX ? scaleY : scaleX;
        
        $('.pf').css('transform', 'translate(-50%, -50%) scale(' + me.globalScale + ')');
    }

    , Resize: function() {
        var me = this;

        $('.pf').removeAttr('style');

        $(window).resize(function() {
            me.GetScale();
        });
    }

    , AddControls: function() {
        var me = this;

        var container = $('body');

        var prev = $('<div class="control-prev disabled"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:white;}</style><path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"/></svg></div>').on('click', function() {
            var elm = $('.active');
            if(elm.prev().length > 0) {
                elm.removeClass('active').addClass('next');
                elm.prev().removeClass('prev').addClass('active').css('transform', 'translate(-50%, -50%) scale(' + me.globalScale + ')');
            }

            me.UpdateControls();
        });

        var next = $('<div class="control-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:white;}</style><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/></svg></div>').on('click', function() {
            var elm = $('.active');
            if(elm.next().length > 0) {
                elm.removeClass('active').addClass('prev');
                elm.next().removeClass('next').addClass('active').css('transform', 'translate(-50%, -50%) scale(' + me.globalScale + ')');
            }

            me.UpdateControls();
        });

        container.append(prev).append(next);
    }

    , UpdateControls: function() {
        var me = this;

        var elm = $('.active');

        if(elm.next().length === 0) {
            $('.control-next').addClass('disabled');
        } else {
            $('.control-next').removeClass('disabled');
        }

        if(elm.prev().length === 0) {
            $('.control-prev').addClass('disabled');
        } else {
            $('.control-prev').removeClass('disabled');
        }
    }

    , UpdateURLs: function() {
        var me = this;

        $('#page-container a').each(function() {
            $(this).attr('target','_blank');
        });
    }
}

scale.init();