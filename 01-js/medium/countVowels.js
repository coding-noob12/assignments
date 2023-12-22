/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here
  const str2 = str.split(" ").join("").toLowerCase().split("");
  const vowels = ["a", "e", "i", "o", "u"];
  let count =0;
  str2.forEach((string) => {
    if(vowels.includes(string)){
      count++;
    }
  });
  return count;
}

module.exports = countVowels;