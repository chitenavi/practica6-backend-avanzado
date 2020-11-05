require('dotenv').config();
const readline = require('readline');
const fs = require('fs');
const conn = require('../../utils/connectMoonDB');
const Advert = require('../../models/advertModel');
const User = require('../../models/userModel');

// Read JSON file with init adverts
const adverts = JSON.parse(
  fs.readFileSync('./server/data/adverts.json', 'utf-8')
);
// Read JSON file with one user for development
// const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

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

// Delete all users and reload the initial users, one user for
// development is mandatory
const initUsersDB = async () => {
  console.log('Emptying users collection...');
  await User.deleteMany();

  /*
  let arrHashPass = [];
  users.forEach(user => {
    arrHashPass.push(User.hashPassword(user.password));
  });
  arrHashPass = await Promise.all(arrHashPass);
  for (let i = 0; i < users.length; i += 1) {
    users[i].password = arrHashPass[i];
  }
  console.log(users);
  */

  console.log('Loading users...');
  const users = await User.insertMany([
    {
      username: 'DevNodePopUser',
      email: 'user@example.com',
      password: await User.hashPassword(process.env.DEV_USER_PASS),
    },
    {
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      avatar: process.env.ADMIN_AVATAR,
      rol: 'ADMIN',
      password: await User.hashPassword(process.env.ADMIN_PASS),
    },
  ]);
  // console.log(users);
  console.log(
    `Users successfully loaded!. ${users.length} users have been created.`
  );
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
    await initUsersDB();

    // close connection
    conn.close();
    process.exit();
  } catch (err) {
    console.log(`There was an error!: ${err}`);
    process.exit(1);
  }
});
