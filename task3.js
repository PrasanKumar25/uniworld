<<<<<<< HEAD
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sumOfSquaredEvenNumbers = numbers
  .filter((num) => num % 2 === 0) 
  .map((num) => num * num) 
  .reduce((acc, num) => acc + num, 0); 

console.log("Sum of squared even numbers:", sumOfSquaredEvenNumbers);
=======
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sumOfSquaredEvenNumbers = numbers
  .filter((num) => num % 2 === 0) // Filter even numbers
  .map((num) => num * num) // Square each even number
  .reduce((acc, num) => acc + num, 0); // Sum the squared numbers

console.log("Sum of squared even numbers:", sumOfSquaredEvenNumbers);
>>>>>>> 753b0ae237c94e21e35649ce7e75954db52fa4d3
