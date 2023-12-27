const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

const users = [
    {
        username: 'Tony',
        email: 'tony@gmail.com',
    },
    {
        username: 'Anthony',
        email: 'anthony@gmail.com'
    },
    {
        username: 'Katy',
        email: 'katy@gmail.com'
    },
    {
        username: 'Kat',
        email: 'kat@gmail.com'
    },
    {
        username: 'Eric',
        email: 'eric@gmail.com'
    },
    {
        username: 'Mike',
        email: 'mike@gmail.com'
    },
    {
        username: 'Gabe',
        email: 'gabe@gmail.com'
    },
    {
        username: 'Tom',
        email: 'tom@gmail.com'
    },
    {
        username: 'Sean',
        email: 'sean@gmail.com'
    },
    {
        username: 'Aaron',
        email: 'aaron@gmail.com'
    },
    {
        username: 'Kevin',
        email: 'kevin@gmail.com'
    },
  ]

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});
  
    await User.collection.insertMany(users);

    console.info('Seeding complete!');
    process.exit(0);
  });
  