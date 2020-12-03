jQuery(function() {
    // toggle home name at the start
    var homeNameTimeout = setTimeout(function() {
        toggleHomeName();
    }, 2500);

    // options used in the name/logo animation
    var HOME_NAME_ANIM_OPTIONS = {
        duration: 600,
        easing: 'linear',
        queue: false,
    };
    function toggleHomeName() {
        clearTimeout(homeNameTimeout);

        // get animation container
        var animationContainer = $('#home-name-animation');
        // add class that we are animating
        animationContainer.addClass('animating');

        // get left and right buttons
        var buttons = $('.home-name-btn');
        
        // if we are in the name state
        if (animationContainer.data('state') === 'name') {
            // change state
            animationContainer.data('state', 'logo');
            animationContainer.attr('data-state', 'logo');

            // for each button
            buttons.each(function() {
                var btn = $(this);
                var side = btn.data('side');
                var namesInBtn = btn.find('.home-name');
                var btnWidth = btn.outerWidth();
                var hr = btn.find('.home-name-hr');
    
                // for each name container
                namesInBtn.each(function() {
                    var nameContainer = $(this);
                    
                    var nameMargin = '0px';
                    if (side === 'left') {
                        nameMargin = nameContainer.css('margin-right');
                    }
                    else if (side === 'right') {
                        nameMargin = nameContainer.css('margin-left');
                    }

                    var initial = nameContainer.find('.home-name-initial');
                    var initialWidth = initial.outerWidth();
                    var offset = initialWidth + parseInt(nameMargin, 10);
                    var letters = nameContainer.find('.home-name-letters');

                    letters.animate({
                        marginLeft: -btnWidth + offset + 'px',
                    }, HOME_NAME_ANIM_OPTIONS);

                    hr.animate({
                        width: '0%',
                    }, HOME_NAME_ANIM_OPTIONS);
                });
            });
        }
        // if we are in the logo state
        else if (animationContainer.data('state') === 'logo') {
            // change state
            animationContainer.data('state', 'name');
            animationContainer.attr('data-state', 'name');

            // for each button
            buttons.each(function() {
                var btn = $(this);
                var namesInBtn = btn.find('.home-name');
                var hr = btn.find('.home-name-hr');

                // for each name container
                namesInBtn.each(function() {
                    var nameContainer = $(this);
                    var letters = nameContainer.find('.home-name-letters');

                    letters.animate({
                        marginLeft: '0px',
                    }, HOME_NAME_ANIM_OPTIONS);

                    hr.animate({
                        width: '100%',
                    }, HOME_NAME_ANIM_OPTIONS);
                });
            });
        }

        // remove animating class after the animations finish
        setTimeout(function() {
            animationContainer.removeClass('animating');
        }, HOME_NAME_ANIM_OPTIONS.duration + 100);
    }

    // if we should change the state of the home name
    if ($('#home-name-animation').data('set')) {
        var animationContainer = $('#home-name-animation');
        // hide the animation container
        animationContainer.css('opacity', '0');

        setTimeout(function() {
            // if the home name animation starts as logo
            if (animationContainer.data('set') === 'logo') {
                animationContainer.data('state', 'logo');
                animationContainer.attr('data-state', 'logo');
                // get left and right buttons
                var buttons = $('.home-name-btn');
        
                // for each button
                buttons.each(function() {
                    var btn = $(this);
                    var side = btn.data('side');
                    var namesInBtn = btn.find('.home-name');
                    var btnWidth = btn.outerWidth();
                    var hr = btn.find('.home-name-hr');
        
                    // for each name container
                    namesInBtn.each(function() {
                        var nameContainer = $(this);
                        
                        var nameMargin = '0px';
                        if (side === 'left') {
                            nameMargin = nameContainer.css('margin-right');
                        }
                        else if (side === 'right') {
                            nameMargin = nameContainer.css('margin-left');
                        }
    
                        var initial = nameContainer.find('.home-name-initial');
                        var initialWidth = initial.outerWidth();
                        var offset = initialWidth + parseInt(nameMargin, 10);
                        var letters = nameContainer.find('.home-name-letters');
        
                        letters.css('margin-left', -btnWidth + offset + 'px');
        
                        hr.css('width', '0%');
                    });
                });
            }

            // show home name
            animationContainer.css('opacity', '');

            animationContainer.data('set', null);
            animationContainer.removeAttr('data-set');
        }, 100);
    }

    // when home name button is clicked
    $('.home-name-btn').on('click', function() {
        // get animation container
        var animationContainer = $('#home-name-animation');

        // if we are still in an animation
        if (animationContainer.hasClass('animating')) {
            return;
        }
        
        // toggle home name between name and logo
        toggleHomeName();
    });

    // calculate age
    function calcAge() {
        var curDate = new Date();
        var yearDiff = curDate.getFullYear() - 1999;

        if (curDate.getMonth() === 2) {
            if (curDate.getDate() < 5) {
                yearDiff -= 1;
            }
        }
        else if (curDate.getMonth() < 2) {
            yearDiff -= 1;
        }

        return yearDiff;
    }

    // add age to the description
    $('#home-desc-age').text(calcAge());

    // sets the email in the contact section
    $('#contact-email-btn').on('click', function(e) {
        var address = 'eduardo.paul.c<span class="d-none" aria-hidden="true">ontardi</span>.s<span class="d-none" aria-hidden="true">oria</span>';
        var domain = 'gmail';

        $('#contact-email').html(address + '@' + domain + '.com');
        e.preventDefault();
        e.stopPropagation();
    });
});
