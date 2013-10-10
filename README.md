An [xkcd][] inspired password generator
=======================

A javascript/php password generator.
* Password is generated using client-side javascript, including using a cryptographically secure random number generator on browsers supporting [window.crypto.getRandomValues](https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues).
* PHP is used server-side to shuffle the wordlist so word order can not be predicted.

[xkcd]: https://xkcd.com/936/
