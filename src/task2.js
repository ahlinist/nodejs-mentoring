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

import readline from "readline";
import { createReadStream, createWriteStream, unlinkSync, existsSync } from "fs";

const csvSource = ".csv/source.csv";
const csvTarget = ".csv/target.csv";

const init = () => {
  try {
    if (existsSync(csvTarget)) {
      unlinkSync(csvTarget);
    }
  } catch (error) {
    console.error(error);
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

const writeLine = (line) => {
  const data = composeJsonString(line);
  const writeStream = createWriteStream(csvTarget, {flags: 'a'});
  writeStream.once('open', () => {
    writeStream.write(data);
    writeStream.end();
  });
  writeStream.on('error', function(error) {
    console.error(error);
    writeStream.end();
});
};

const openReadStream = (path) => {
  const stream = createReadStream(path);
  stream.on('error', function(error) {
    console.error(error);
  });
  return stream;
};

async function processLineByLine() {
  const fileStream = openReadStream(csvSource);
  const lines = readline.createInterface({input: fileStream});
  let firstRun = true;

  for await (const line of lines) {
    if (firstRun === true) {
      firstRun = false;
      continue;
    } 
    writeLine(line);
  }
}

init();
processLineByLine();
