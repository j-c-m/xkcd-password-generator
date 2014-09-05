$(function() {
    var numwords = 3;
    var digits = true;
    var caps = false;
    var spaces = true;

    function onoff(b) {
        return b ? 'on' : 'off';
    }

    function update_password() {
        $('#numwords').text(numwords);
        $('#digits').text('digits: ' + onoff(digits));
        $('#caps').text('caps: ' + onoff(caps));
        $('#spaces').text('spaces: ' + onoff(spaces));


        var password_div = $('#password');

        if (window.getSelection && window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
        }

        var spacer = '';
        
        if (spaces) {
            spacer = ' ';
        }
        
        pw_gen(function(words) {
            password_div.text(words.join(spacer));
        }, numwords, digits, caps);
    }

    function selectText(node) {
        if (document.selection) {
            var div = document.body.createTextRange();

            div.moveToElementText(node);
            div.select();
        } else {
            var div = document.createRange();
            div.setStartBefore(node);
            div.setEndAfter(node);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(div);
        }
    }

    function copyToClipboard(text) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }

    $('#generate_button').click(function(e) {
        update_password();
    });

    $('#more_words').click(function(e) {
        if (numwords < 10) numwords++;
        update_password();
    });

    $('#less_words').click(function(e) {
        if (numwords > 3 || (numwords > 2 && digits)) numwords--;
        update_password();
    });

    $('#digits').click(function(e) {
        digits = !digits;
        if (numwords < 3 && !digits) {
            numwords = 3;
        }
        update_password();
    });

    $('#caps').click(function(e) {
        caps = !caps;
        update_password();
    });

    $('#spaces').click(function(e) {
        spaces = !spaces;
        update_password();
    });

    $('#select').click(function(e) {
        selectText($('#password').get(0));
    });

    update_password();

});