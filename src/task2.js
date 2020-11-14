/*
The solution with input fully loaded to memory

const { writeFile } = require('fs');
const csv = require('csvtojson');
const csvSource = ".csv/source.csv";
const csvTarget = ".csv/target.csv";

const uncapitalizeKeys = obj => {
  return Object.fromEntries(Object.entries(obj)
      .map(([k, v]) => [k.toLowerCase(), v]));
};

const formatEntries = entries => entries.map(entry => {
  delete entry["Amount"];
  return uncapitalizeKeys(entry);
});

const stringifyOutput = entries => {
  return entries.map(entry => JSON.stringify(entry))
    .join("\n");
};

const writeToFile = content => {
  writeFile(csvTarget, content, err => {
    if (err) return console.log(err);
  });
};

csv()
  .fromFile(csvSource)
  .then(formatEntries)
  .then(stringifyOutput)
  .then(writeToFile);

*/

const { createReadStream, createWriteStream, unlinkSync, existsSync } = require('fs');
const readline = require('readline');

const csvSource = ".csv/source.csv";
const csvTarget = ".csv/target.csv";

const init = () => {
  if (existsSync(csvTarget)) {
    unlinkSync(csvTarget);
  }
}

const composeJsonString = text => {
  const values = text.split(",");
  const obj = {
    book: values[0],
    author: values[1],
    price: values[3]
  };
  return `${JSON.stringify(obj)}\n`;
};

async function processLineByLine() {
  const fileStream = createReadStream(csvSource);
  const rl = readline.createInterface({input: fileStream});
  let firstRun = true;

  for await (const line of rl) {
    if (firstRun === true) {
      firstRun = false;
      continue;
    } 

    const data = composeJsonString(line);
    const writeStream = createWriteStream(csvTarget, {flags: 'a'});
    writeStream.once('open', () => {
      writeStream.write(data);
      writeStream.end();
    }); 





    //TODO: log errors!
  }
}

init();
processLineByLine();
