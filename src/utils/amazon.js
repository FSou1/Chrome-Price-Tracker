import { parse } from 'node-html-parser';
import { parsePrice } from './utils';

export function checkAmazon(asin) {
    return fetch('https://www.amazon.com/gp/aod/ajax/?asin=' + asin)
        .then(response => response.text())
        .then(html => parse(html))
        .then(dom => throwIfCaptcha(dom))
        .then(dom => ({
            title: getTitle(dom),
            price: getPrice(dom)
        }));
}

function throwIfCaptcha(dom) {
    const querySelector = "form[action='/errors/validateCaptcha']";

    const node = dom.querySelector(querySelector);
    if (node) {
        throw new Error('Captcha!');
    }

    return dom;
}

function getTitle(dom) {
    const querySelector = "#aod-asin-title-text";

    const node = dom.querySelector(querySelector);
    if (!node) {
        return null;
    }

    return node.innerText;
}

function getPrice(dom) {
    let node = dom.querySelector("#aod-total-offer-count[value='0']");
    if (node) {
        return NaN;
    }

    node = dom.querySelector(".a-offscreen");
    if (node) {
        return parsePrice(node.innerText);
    }

    return 'TBD';
}