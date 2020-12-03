jQuery(function() {
    // update navbar scroll max-height
    function setNavbarScrollHeight() {
        var scrollTopPos = $('#navbar').outerHeight() - $('#navbar-scroll').outerHeight();
        var windowHeight = $(window).height();

        var scrollMaxHeight = windowHeight - scrollTopPos;
        if(scrollMaxHeight > 0) {
            $('#navbar-scroll').css('max-height', scrollMaxHeight + 'px');
        }
        else {
            $('#navbar-scroll').css('max-height', '');
        }
    }

    // listen for window resize
    $(window).on('resize', function() {
        // if navbar is shown
        if($('#navbar-collapse').hasClass('show')) {
            setNavbarScrollHeight();
        }
    });

    // listen for window resize
    $(window).on('scroll', function() {
        // get navbar link screen reader
        var navbarLinkSr = $('#navbar-link-sr');
        // get screen reader link parent
        var srParent = navbarLinkSr.closest('.nav-link');

        // if the parent is not active
        if (!srParent.hasClass('active')) {
            // clone the screen reader
            var newSr = navbarLinkSr.clone();

            // remove the current screen reader
            navbarLinkSr.remove();

            // add the screen reader to the active navbar link
            $('#navbar-nav .nav-link.active').append(newSr);
        }
    });

    // when a link with fragment is clicked
    $('body').on('click', 'a[href^="#"]', function(e) {
        // if it's an empty fragment and we don't care to stop
        if ($(this).attr('href') === '#' && !$(this).data('dontstop')) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // listen for navbar fully open
    $('#navbar-collapse').on('shown.bs.collapse', function() {
        setNavbarScrollHeight();

        $('body').css('overflow-y', 'hidden');
    });

    // listen for navbar fully close
    $('#navbar-collapse').on('hidden.bs.collapse', function() {
        $('#navbar-scroll').css('max-height', '');

        $('body').css('overflow-y', '');
    });

    // when a navbar link is clicked
    $('#navbar-nav .nav-link').on('click', function(e) {
        // prevent from scrolling
        e.preventDefault();
        e.stopPropagation();

        // if the navbar menu is open hide it
        if ($('#navbar-collapse').hasClass('show')) {
            $('#navbar-collapse').collapse('hide');
        }

        // get this link href
        var href = $(this).attr('href');

        // update fragment
        window.location.hash = href.substring(1, href.length);
        // scroll window
        $(window).scrollTop($(href).offset().top - $('#navbar-buttons').outerHeight() + 1);
    });

    // listen for lang dropdown fully visible
    $('#navbar-lang').on('shown.bs.dropdown', function() {
        var navScrollHeight = $('#navbar-scroll')[0].scrollHeight;
        var menuHeight = $('#navbar-lang-menu').outerHeight();
        
        // update navbar scroll to show it
        $('#navbar-scroll').scrollTop(navScrollHeight - menuHeight);
    });
});
