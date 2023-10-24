const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sumOfSquaredEvenNumbers = numbers
  .filter((num) => num % 2 === 0) 
  .map((num) => num * num) 
  .reduce((acc, num) => acc + num, 0); 

console.log("Sum of squared even numbers:", sumOfSquaredEvenNumbers);
