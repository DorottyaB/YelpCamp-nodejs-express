const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect(
  'mongodb+srv://thea_b:R3f7S3ee4qif5Bd@cluster0.3q1hq.mongodb.net/cluster0?retryWrites=true&w=majority'
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '62597cea090b36f9b940c476',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptate aliquam, quae impedit earum quis esse autem aspernatur placeat ut fuga maxime dolorum ullam assumenda? Eos quod aut beatae consequatur.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dcigubvxn/image/upload/v1649255723/YelpCamp/esck4xzyin57y5rxflld.jpg',
          filename: 'YelpCamp/esck4xzyin57y5rxflld',
        },
        {
          url: 'https://res.cloudinary.com/dcigubvxn/image/upload/v1650031945/YelpCamp/xdge2tnb8r1ufyr2hu9f.jpg',
          filename: 'YelpCamp/xdge2tnb8r1ufyr2hu9f',
        },
        {
          url: 'https://res.cloudinary.com/dcigubvxn/image/upload/v1650033310/YelpCamp/fpodqabyalrhqamecez5.jpg',
          filename: 'YelpCamp/fpodqabyalrhqamecez5',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
