YUI().use('node', 'event', function(Y) {
    Y.on('domready', function() {
        var numwords = 3;
        var digits = true;
        var caps = false;
        var spaces = true;

        function onoff(b)
        {
            return b ? 'on' : 'off';
        }
        
        function update_password() {
            Y.one('#numwords').setContent(numwords);
            Y.one('#digits').setContent('digits: ' + onoff(digits));
            Y.one('#caps').setContent('caps: ' + onoff(caps));
            Y.one('#spaces').setContent('spaces: ' + onoff(spaces));

            
            var password_div = Y.one('#password');
            
            if (window.getSelection && window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }

            if (spaces) {
                password_div.setContent(pw_gen(numwords, digits, caps).join(' '));
            } else {
                password_div.setContent(pw_gen(numwords, digits, caps).join(''));
            }

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

        Y.one('#generate_button').on('click', function(e) {
            update_password();
        });

        Y.one('#more_words').on('click', function(e) {
            if (numwords < 10) numwords++;
            update_password();
        });
        Y.one('#less_words').on('click', function(e) {
            if (numwords > 3 || (numwords > 2 && digits)) numwords--;
            update_password();
        });
        Y.one('#digits').on('click', function(e) {
            digits = !digits;
            if (numwords < 3 && !digits) {
                numwords = 3;
            }
            update_password();
        });
        Y.one('#caps').on('click', function(e) {
            caps = !caps;
            update_password();
        });
        Y.one('#spaces').on('click', function(e) {
            spaces = !spaces;
            update_password();
        });
        Y.one('#select').on('click', function(e) {
            selectText(Y.one('#password').getDOMNode());
        });





        update_password();
    });

});