const mongoose = require('mongoose');
const axios = require('axios');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

/* async function seedImg() {
  try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: 'ku2DZrl4Yr81cLO2bPlaWJiMCn0Uc_E8bvjl1gKtz8s',
        collections: 483251, // 1114848 originally
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
} */

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '624af15f349ab2df4e139c76',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: await seedImg(),
      /* image:
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', */
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptate aliquam, quae impedit earum quis esse autem aspernatur placeat ut fuga maxime dolorum ullam assumenda? Eos quod aut beatae consequatur.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dcigubvxn/image/upload/v1649255802/YelpCamp/pgmbpwss8v7swa4mwdw0.jpg',
          filename: 'YelpCamp/pgmbpwss8v7swa4mwdw0',
        },
        {
          url: 'https://res.cloudinary.com/dcigubvxn/image/upload/v1649253762/YelpCamp/yo39m4orh8r6cv13vf67.jpg',
          filename: 'YelpCamp/yo39m4orh8r6cv13vf67',
        },
        {
          url: 'https://res.cloudinary.com/dcigubvxn/image/upload/v1649757595/YelpCamp/xlwy0d5ynhkiu27vw4kp.jpg',
          filename: 'YelpCamp/xlwy0d5ynhkiu27vw4kp',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
