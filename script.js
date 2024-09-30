const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

import { curruncyCode } from './curruncyCode.js';

const selector = document.querySelectorAll('select');
const btn = document.querySelector('.button button')

for (const select of selector) {
    for (const currCode of curruncyCode) {
        const options = document.createElement('option');
        options.innerText = currCode[1];
        select.append(options)
    }

    select.addEventListener('change', (e) => {
        flagUpdate(e.target)
    })
}

function flagUpdate(e) {
    curruncyCode.forEach((ele) => {
        if (e.value === ele[1]) {
            let flagCode = ele[0]
            let flagUrl = `https://flagsapi.com/${flagCode}/flat/64.png`;
            let img = e.parentElement.querySelector('img')
            img.src = flagUrl;
        }
    })
}

const selectFrom = document.querySelector('.select-from select')
const selectTo = document.querySelector('.select-to select')
const result = document.querySelector('.result h1');
const input = document.querySelector('input')
selectFrom.value = 'USD'
selectTo.value = 'INR'
try {
    btn.addEventListener('click', async () => {

        let url = await fetch(`${BASE_URL}/${selectTo.value}_${selectFrom.value}.json`);
        let data = await url.json();
        let rate = data.rate;
        let inp = rate * input.value;
        let roundOF = Math.floor(inp);
        result.innerText = roundOF;

    })
} catch (err) {
    console.log(err.message)
}

