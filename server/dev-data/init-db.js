const readline = require('readline');
const fs = require('fs');
const conn = require('../utils/connectMoonDB');
const Advert = require('../models/advertModel');

// Read JSON file with init adverts
const adverts = JSON.parse(fs.readFileSync('./data/adverts.json', 'utf-8'));

// Delete all data and reload the initial adverts
const initAdvertsDB = async () => {
  try {
    console.log('Emptying adverts collection...');
    await Advert.deleteMany();
    console.log('Data successfully deleted!');

    console.log('Loading adverts...');
    await Advert.create(adverts);
    console.log(
      `Data successfully loaded!. ${adverts.length} adverts have been created.`
    );
  } catch (err) {
    console.log(`There was an error!: ${err}`);
    process.exit(1);
  }
};

function askUser(askText) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(askText, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

conn.once('open', async () => {
  try {
    // Ask to initialize DB
    const response = await askUser('Are you sure to initialize DB? (no/yes) ');

    if (response.toLowerCase() !== 'yes' && response.toLowerCase() !== 'y') {
      console.log('Process aborted!');
      return process.exit();
    }

    await initAdvertsDB();

    // close connection
    conn.close();
  } catch (err) {
    console.log(`There was an error!: ${err}`);
    process.exit(1);
  }
});
