"use strict";

let allMenuItems = document.querySelectorAll('.all');

document.querySelector('.btn-container').addEventListener('click', event => {
    let filterItems = event.target.dataset.menu;
    
    if (event.target.tagName !== 'BUTTON') return false;

    allMenuItems.forEach(elem => {
        elem.classList.remove('hide');
        if (!elem.classList.contains(filterItems)) {
            elem.classList.add('hide');
        }
    });
});