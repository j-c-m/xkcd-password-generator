var byeJQ = (function () {
    $ = function (selector) {
        if (typeof selector === "function") {
            if (document.readyState != "loading") selector();
            else document.addEventListener("DOMContentLoaded", selector);
        }
        if (typeof selector === "string") {
            if (selector.substring(0, 1) == "#") {
                var el = document.getElementById(selector.substring(1));
                return {
                    [0]: el,
                    length: 1,

                    text: function (text) {
                        if (el) el.innerText = text;
                    },
                    click: function (callback) {
                        if (el && typeof callback === "function") {
                            el.addEventListener("click", callback);
                        }
                    },
                    get: function (num) {
                        return this[num]
                    }
                }
            }
        }
    }

    $.get = function (url, callback) {
        var xhr = getxhr(callback);
        xhr.open('GET', url);
        xhr.send();
    }

    function getxhr(callback) {
        var xhr;

        xhr = new XMLHttpRequest();

        if (typeof callback === "function") {
            xhr.onload = function () {
                if (this.status == 200) callback(xhr.responseText);
            }
        }

        return xhr;
    }

    return $;
})();

window.$ = byeJQ;

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
        var entropy_span = $('#entropy');
        var brute_entropy_span = $('#brute_entropy');

        if (window.getSelection && window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
        }

        var spacer = '';

        if (spaces) {
            spacer = ' ';
        }

        pw_gen(function(words, entropy) {
            password_div.text(words.join(spacer));
            entropy_span.text(entropy);

            var brute_possible = 26 + 26 * caps + 10 * digits + spaces;
            var brute_entropy = (words.join(spacer)).length * (Math.log(brute_possible) / Math.log(2))
            brute_entropy_span.text(Math.floor(brute_entropy));
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
        if (numwords > 1) numwords--;
        update_password();
    });

    $('#digits').click(function(e) {
        digits = !digits;
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
