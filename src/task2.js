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
