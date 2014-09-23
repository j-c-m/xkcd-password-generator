var wordlist_url = 'en-wordlist.txt';

function pw_gen(callback, numwords, digits, caps) {
    if (typeof(numwords) === 'undefined') {
        numwords = 3;
    }
    if (typeof(digits) === 'undefined') {
        digits = true;
    }
    if (typeof(caps) === 'undefined') {
        caps = false;
    }

    if (typeof(wordlist) === 'undefined') {
        $.get(wordlist_url, function(txt) {
            wordlist = txt.split('\n');
            pw_gen(callback, numwords,digits,caps);
        });
        return;
    }

    var words = [];

    var hash = new Uint32Array(numwords);

    if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(hash);
    }

    for (var i = 0; i < numwords; i++) {
        var index = 0;
        
        if (hash[i] > 0) {
            index = hash[i];
        } else {
            index = Math.floor(Math.random() * 0x100000000);
        }
        words.push(wordlist[index % wordlist.length]);
    }

    var entropy = (Math.log(wordlist.length) / Math.log(2)) * numwords;
    
    if (caps) {
        var index = Math.floor(Math.random() * 0x100000000) % words.length;
        words[index] = words[index].charAt(0).toUpperCase() + words[index].slice(1);
    }

    if (digits) {
        words.splice(Math.floor(Math.random() * 0x100000000) % (numwords + 1), 0, Math.floor(Math.random() * 0x100000000 % 10000));
        entropy += Math.log(10000) / Math.log(2);
    }
     
    if (typeof(callback) === 'function') {
        callback.call(this, words, Math.floor(entropy));
    }
}