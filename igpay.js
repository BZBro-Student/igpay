import readline from 'node:readline';
// create sets of consonants,vowels,the entire alphabet (capitalized), punctuation,
// and the letter y
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

// Sets up the reader to take input
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

    // for each word in a line
    for (let i = 0; i < word.length; i += 1) {
      // check for grouping openers like (
      if (firstChar === 1 && openingSet.has(word[i])) {
        newWord += word[i];
      // check for y as the first character of word (consanant y)
      } else if (firstChar === 1 && y.has(word[i].toLowerCase())) {
        if (capitalSet.has(word[i])) {
          capitalize = 1;
        }
        // creates conCluster that contains each cluster of consanants
        conCluster += word[i];
        // change the state to know we are no longer on the first character
        firstChar = 0;
      // check if word begins with vowel
      } else if (firstChar === 1 && vowel.has(word[i].toLowerCase())) {
        // capitalization set
        if (capitalSet.has(word[i])) {
          capitalize = 1;
        }
        // This was autocorrect to be this way
        newWord = `${word}yay`;
        break;
      // continue consonantSet
      } else if (consonantSet.has(word[i].toLowerCase())) {
        if (firstChar === 1 && capitalSet.has(word[i])) {
          capitalize = 1;
        }
        firstChar = 0;
        conCluster += word[i].toLowerCase();
      // end logic upon finding the first vowel
      } else if (vowel.has(word[i].toLowerCase())) {
        if (firstChar === 1 && capitalSet.has(word[i])) {
          capitalize = 1;
        }
        // combine parts of the word to form the tranlation
        newWord += word.substring(i);
        newWord += conCluster;
        newWord += ('ay');
        break;
      }
    }
    // add stored punctuation to the end of the word
    punctuationSet.forEach((punctuations) => {
      if (newWord.includes(punctuations)) {
        const count = newWord.split(punctuations).length - 1;
        newWord = newWord.replaceAll(punctuations, '');
        for (let i = 0; i < count; i += 1) {
          newWord += punctuations;
        }
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
