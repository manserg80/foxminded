// declaring main constants
const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');
const body = document.querySelector('body');
// function for changing bacground color
btn.addEventListener('click', function(){
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
        hexColor += colors[getRandomNumber()];
    }
    body.style.backgroundColor = hexColor;
    color.textContent = hexColor;
    color.style.color = hexColor;
});
// function for getting a random number
function getRandomNumber(){
    return Math.floor(Math.random() * colors.length);
}