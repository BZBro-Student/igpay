// create sets of consonants,vowels,the entire alphabet (capitalized), punctuation
import readline from 'node:readline';

const consonantSet = new Set(
  ['p', 'b', 't', 'd', 'k',
    'c', 'g', 'f', 'v', 's',
    'z', 'h', 'w', 'n', 'm',
    'r', 'j', 'l'],
);
const capitalSet = new Set(
  ['A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y',
    'Z'],
);
const punctuationSet = new Set(
  ['.', ',', '!', '?', ':',
    ';', ']', '}', '>', ')'],
);
const openingSet = new Set(
  ['[', '{',
    '<', '('],
);
const vowel = new Set(
  ['a', 'e', 'i', 'o', 'u',
    'y'],
);
const y = new Set(['y']);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function breakIntoClusters(words) {
  const newWords = [];
  words.forEach((word) => {
    let newWord = '';
    const punctuation = '';
    let conCluster = '';
    let firstChar = 1;
    let capitalize = 0;

    for (let i = 0; i < word.length; i += 1) {
      if (firstChar === 1 && openingSet.has(word[i])) {
        newWord = word[i];
      } else if (firstChar === 1 && y.has(word[i].toLowerCase())) {
        if (capitalSet.has(word[i])) {
          capitalize = 1;
        }
        conCluster += word[i];
        firstChar = 0;
      } else if (firstChar === 1 && vowel.has(word[i].toLowerCase())) {
        if (capitalSet.has(word[i])) {
          capitalize = 1;
        }
        newWord = `${word}yay`;
        break;
      } else if (consonantSet.has(word[i].toLowerCase())) {
        if (firstChar === 1 && capitalSet.has(word[i])) {
          capitalize = 1;
        }
        firstChar = 0;
        conCluster += word[i].toLowerCase();
      } else if (vowel.has(word[i].toLowerCase())) {
        if (firstChar === 1 && capitalSet.has(word[i])) {
          capitalize = 1;
        }
        newWord += word.substring(word.indexOf(word[i]));
        newWord += conCluster;
        newWord += ('ay');
        break;
      } else {
        newWord = `${word}*`;
        break;
      }
    }

    punctuationSet.forEach((punctuations) => {
      if (newWord.includes(punctuations)) {
        newWord = newWord.replaceAll(punctuations, '');
        newWord += punctuations;
      }
    });

    if (capitalize === 1) {
      newWords.push(newWord.charAt(0).toUpperCase() + newWord.slice(1));
    } else {
      newWords.push(newWord + punctuation);
    }
  });
  return newWords.join(' ');
}

function igpay(line) {
  const newLine = breakIntoClusters(line.split(' '));
  return newLine;
}

rl.on('line', (line) => {
  console.log(igpay(line));
});
