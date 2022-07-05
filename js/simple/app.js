'use strict';

const app = document.querySelector('#app');

const createSection = (title) => {
    const res = document.createElement('section');
    const header = document.createElement('h2');
    header.innerText = title;

    res.append(header);

    return res;
};

const iterateFor = () => {
    const res = createSection('for loop');

    for (let i = 1; i < 11; i++) {
        const num = document.createElement('span');
        num.classList.add('num');
        num.innerText = i;
        res.append(num);
    }

    app.append(res);
};

const iterateWhile = () => {
    const res = createSection('while loop');

    let i = 1;
    while (i < 11) {
        const num = document.createElement('span');
        num.classList.add('num');
        num.innerText = i;
        res.append(num);
        i++;
    }

    app.append(res);
};


const iterateDoWhile = () => {
    const res = createSection('do-while loop');

    let i = 1;
    do {
        const num = document.createElement('span');
        num.classList.add('num');
        num.innerText = `${i} (${i % 2 === 0 ? 'e' : 'o'}) - `;
        res.append(num);
        i++;
    } while (i < 11);

    app.append(res);
};

const getDay = () => {
    const res = createSection('getDay');

    let day;
    switch ((new Date).getDay() - 1) {
        case 0:
            day = 'Montag';
            break;
        case 1:
            day = 'Dienstag';
            break;
        case 2:
            day = 'Mittwoch';
            break;
        case 3:
            day = 'Donnerstag';
            break;
        case 4:
            day = 'Freitag';
            break;
        case 5:
            day = 'Samstag';
            break;
        case 6:
            day = 'Sonntag';
            break;
        default:
            day = `unknown ${(new Date).getDay()}`;
    }

    const out = document.createElement('span');
    out.classList.add('num');
    out.innerText = day;

    res.append(out);
    app.append(res);
};

// Aufgabe 3

const intAdd = (a, b) => a + b;

const strConcat = (a, b) => `${a}${b}`;

const createTree = (height) => {
    const res = createSection('Tree');
    const out = document.createElement('pre');

    const lines = [];
    const maxWidth = height * 2;

    for (let i = 0; i < height; i++) {
        lines.push(
            ' '.repeat(maxWidth / 2 - i) + '+'.repeat(i * 2 + 1)
        );
    }

    out.innerHTML = lines.join('\n');

    res.append(out);
    app.append(res);
};

// Aufgabe 4

const getDayIndex = () => {
    return {
        0: 'Montag',
        1: 'Dienstag',
        2: 'Mittwoch',
        3: 'Donnerstag',
        4: 'Freitag',
        5: 'Samstag',
        6: 'Sonntag'
    }[(new Date).getDay()];
};

const createArrRand = (n, min, max) => {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min));
    }

    return arr;
};

const arrGetSum = (arr) => {
    let sum = 0;
    arr.forEach(n => sum += n);

    return sum;
};

const arrGetMax = (arr) => {
    let max = Number.MAX_VALUE * -1;
    arr.forEach(n => max = Math.max(max, n));

    return max;
};

// ---------------

iterateFor();
iterateWhile();
iterateDoWhile();
getDay();
createTree(8);

console.log('createArrRand', createArrRand(4, 20, 100));
console.log('arrGetSum', arrGetSum([6, 2, 7, 3, 6, 8, 2]));
console.log('arrGetMax', arrGetMax([1, 3, 5, 6, 89, 9, 6, 5, 43]));
