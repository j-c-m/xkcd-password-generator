<?php

Header('Content-type: application/javascript');
header('Cache-Control: no-cache, must-revalidate');

$wordlist = file('en-wordlist.txt',FILE_IGNORE_NEW_LINES);

shuffle($wordlist);

include('pw.js');

?>