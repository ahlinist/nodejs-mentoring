import { createReadStream, createWriteStream, unlinkSync, existsSync } from "fs";
import csv from "csvtojson";
import { Transform } from "stream";

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

const transformer = new Transform({objectMode:true});

transformer._transform = function(data, encoding, done){
    const entry = JSON.parse(data.toString());
    const obj = {
      book: entry.Book,
      author: entry.Author,
      price: entry.Price
    };
    this.push(`${JSON.stringify(obj)}\n`);
    done();
}

const errorHandler = e => {
  console.error(e);
};

const execute = () => {
  createReadStream(csvSource)
    .on('error', errorHandler)
    .pipe(csv())
    .on('error', errorHandler)
    .pipe(transformer)
    .on('error', errorHandler)
    .pipe(createWriteStream(csvTarget))
    .on('error', errorHandler);
};

init();
execute();
