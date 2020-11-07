const stdin = process.openStdin();

const normalizeString = data => data.toString().trim();
const reverse = text => text.split("").reverse().join("");
const printReverse = input => console.log(`${reverse(normalizeString(input))}\n`);

stdin.addListener("data", printReverse);
