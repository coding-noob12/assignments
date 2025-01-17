/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const str1 = str.toLowerCase().split(" ").join("").replace(/[^\w\s]/g, "");
  const str2 = str
    .toLowerCase()
    .split(" ")
    .join("")
    .split("")
    .reverse()
    .join("")
    .replace(/[^\w\s]/g, "");
  if (str1 === str2) {
    return true;
  } else {
    return false;
  }
}

module.exports = isPalindrome;
