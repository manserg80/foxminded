"use strict";
//definig constance
const btn = document.getElementById('btn');
// definig array
let initialArray = ['all', 'breakfast', 'beverages', 'cooking', 'snacks', 'soups', 'dinner', 'chips', 'meat', 'fish', 'cheese'];
//displaying initial info
document.getElementById('demo').innerHTML = initialArray;
document.getElementById('result').style.display = 'none';
// sorting array
let sortedArray = initialArray.sort(
    (a, b) => a.length - b.length || a.localeCompare(b)
);
document.getElementById('result').innerHTML = sortedArray.join(', ');
//diplaying sorted array
btn.addEventListener('click', () =>
document.getElementById('result').style.display = 'block');