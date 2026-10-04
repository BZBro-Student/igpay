const consonantSet = new Set(
    "p", "b", "t", "d", "k", "c", "g",
    "f", "v", "s", "z", "h", "w", "n",
    "m", "r", "j", "l",);
const vowel = new Set("a", "e", "i", "o", "u", "y",);
const y = new Set("y",);

import readline from 'readline';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function igpay(line) {
    let newLine = breakIntoClusters(line.split(' '));
    
}

function breakIntoClusters(words) {
    let newWords = []
    for (let word of words) {
        let newWord = '';
        let conCluster = '';
        let firstChar = 1;

        for (let char of word) {
            if (firstChar === 1 && y.has(char)) {
                conCluster = conCluster.concat(char);
                firstChar = 0;
            } else if (firstChar === 1 && vowel.has(char)) {
                newWord = word.concat('yay');
                break;
            } else if (consonantSet.has(char)) {
                firstChar = 0;
                conCluster = conCluster.concat(char);
            } else if (vowel.has(char)) {
                newWord = word.substring(word.indexOf(char));
                newWord = newWord.concat(conCluster);
                newWord = newWord.concat('ay')
                break;
            } else {
                newWord = word;
            } 
        }
        newWords.push(newWord);
    }
    return newWords.join(' ');
}

rl.on('line', function (line) {
    console.log(igpay(line));
});