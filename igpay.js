// create sets of consonants,vowels,the entire alphabet (capitalized), punctuation, and y
const consonantSet = new Set(
    ["p", "b", "t", "d", "k",
        "c", "g", "f", "v", "s",
        "z", "h", "w", "n", "m",
        "r", "j", "l",]);
const capitalSet = new Set(
    ["A", "B", "C", "D", "E",
        "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y",
        "Z",])
const punctuationSet = new Set(
    [".", ",", "!", "?", ":",
        ";", "]", "}", ">", ")"])
const openingSet = new Set(
    ["[", "{",
        "<", "(",])
const vowel = new Set(
    ["a", "e", "i", "o", "u",
        "y",]);
const y = new Set(["y",]);

import readline from 'node:readline';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function igpay(line) {
    let newLine = breakIntoClusters(line.split(' '));
    return newLine

}

function breakIntoClusters(words) {
    let newWords = []
    for (let word of words) {
        let newWord = '';
        let punctuation = '';
        let conCluster = '';
        let firstChar = 1;
        let capitalize = 0;

        for (let char of word) {
            if (firstChar === 1 && openingSet.has(char)) {
                newWord = char;
            } else if (firstChar === 1 && y.has(char.toLowerCase())) {
                if (capitalSet.has(char)) {
                    capitalize = 1;
                }
                conCluster += char;
                firstChar = 0;
            } else if (firstChar === 1 && vowel.has(char.toLowerCase())) {
                if (capitalSet.has(char)) {
                    capitalize = 1;
                }
                newWord = word + 'yay';
                break;
            } else if (consonantSet.has(char.toLowerCase())) {
                if (firstChar === 1 && capitalSet.has(char)) {
                    capitalize = 1;
                }
                firstChar = 0;
                conCluster += char.toLowerCase();
            } else if (vowel.has(char.toLowerCase())) {
                if (firstChar === 1 && capitalSet.has(char)) {
                    capitalize = 1;
                }
                newWord += word.substring(word.indexOf(char));
                newWord += conCluster;
                newWord += ('ay');
                break;
            } else {
                newWord = word + '*';
                break;
            }
        }

        for (const punctuation of punctuationSet) {
            if (newWord.includes(punctuation)) {
                newWord = newWord.replaceAll(punctuation, "");
                newWord += punctuation;
            }
        }
        if (capitalize === 1) {
            newWords.push(newWord.charAt(0).toUpperCase() + newWord.slice(1));
        } else {
            newWords.push(newWord + punctuation);
        }
    }
    return newWords.join(' ');
}

rl.on('line', function (line) {
    console.log(igpay(line));
});