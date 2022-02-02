export function parsePrice(str) {
    return parseFloat(str.replace(/[$,]/g, ""));
}