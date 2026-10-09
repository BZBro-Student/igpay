# Project #: Project Name

* Author: Broden Benson
* Class: CS354 Section #
* Semester:

## Overview

This program takes text input and programatically translates each word into 
piglatin.

## Reflection

This program was quick and fun, a bulk of the work was done in one go, in one
file. I have alway felt like JavaScript is useful but it always has a perpensity 
in my hands to look more akin to a dish of spaghetti. Turns out this is just really
common for some people. The main logic of the program isn't hard to figure out
really the main issue was figuring out how to account for the letter y, theres 
3 cases in which y is a vowel and 1 where it is a consonant. My initial approach
was to account for each possible case until I figured out that that is stupid since 
if y is the first character in a word, that is the only time it is a consonant.

Once that was figured out the rest of the program came together. I used Sets to
store all vowels, consonants, all capital letters, and the letter y for char comparisons. 
The program takes input line by line and then processes each word in a line and breaks appart 
each character of each word to process it. Once processed the program adds the word back into
an array representation of the line which is recombined and returned. Once completed I the logic
I ran the linter most issues were simply spacing issues which the fix command did wonders for 
but 3 issues remained. I used three for each loops which according to the linter are to heavy
so I had to adjust my loop logic to use built in for each functions and a basic iterative array.
This assignment was overall pretty easy and enjoyable. It was a puzzle and that is always awesome.


## Compiling and Using

Two main ways to execute this program, one with inline text input and another with file 
text input.

Text Input
```node
  echo <Text> | node igpay.js
```

File Input
```node
  cat <file / file path> | node igpay.js
```

As expected, to do this Node must be installed on your PATH.

## Results
My device did not have a words file already installed so I installed it using
sudo pacman -S words which installs the file /usr/share/dict/american-english
which is what I am running for this assignment.

```
________________________________________________________
Executed in  309.24 millis    fish           external
   usr time  213.12 millis  709.00 micros  212.41 millis
   sys time  130.99 millis    0.00 micros  130.99 millis
```
The performance is quick spending 213 ms in the program and 130 ms in system calls,
IO  could possibly be optimized by buffering my log to print once the whole batch is
processed as a IO call takes a non-zero amount of time and since we print after each 
line in significantly big files that could take a lot of time, we could make batches 
smaller but the memory overhead shouldn't be too bad given what we are processing so
a buffer of the whole file should fine and save time. 
String concatanation is typically expensive as well, I didn't bother to setup a buffered writer
like I would in programs focusing on text processing. Implementation of a append function
using a buffer like you would see in the StringBuilder class in java should be possible 
and easy to figure out assuming it isn't already included in the language. This would decrease 
run time. 

P.S.
A quick search shows that the += operator may automatically buffer in javascript by making ropes? 
I'll have to look into that more for the extra credit.

## Extra Credit

Based on my log file the biggest improvement to be comes from how im logging the output, 30% of my runtime
is the program printing the output to stdout. It logs after each line is processed. That is super inneficient
so a buffered log would be better. Upon implementing these were the results:

## Sources used
Dev Research:

https://www.speechactive.com/english-consonants-ipa-international-phonetic-alphabet/?v=0b3b97fa6688

https://www.merriam-webster.com/grammar/why-y-is-sometimes-a-vowel-usage

https://stackoverflow.com/questions/20086849/how-to-read-from-stdin-line-by-line-in-node

https://www.reddit.com/r/learnprogramming/comments/f3pvmp/is_it_possible_to_use_includes_to_find_certain/

https://flaviocopes.com/how-to-uppercase-first-letter-javascript/

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

Optimization Research:

https://josephmate.github.io/java/javascript/stringbuilder/2020/07/27/javascript-does-not-need-stringbuilder.html

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat

https://docs.google.com/document/d/1o-MJPAddpfBfDZCkIHNKbMiM86iDFld7idGbNQLuKIQ/preview?tab=t.0
----------

## Notes

* This README.md template is using Markdown. Here is some help on using Markdown:
  [markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)


* Markdown can be edited and viewed natively in most IDEs such as Eclipse and VS Code. Just toggle
  between the Markdown source and preview tabs.

* To preview your README.md output online, you can copy your file contents to a Markdown editor/previewer
  such as [https://stackedit.io/editor](https://stackedit.io/editor).