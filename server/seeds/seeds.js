const db = require("../config/connection");
const { User, Image, Category } = require("../models");
require("dotenv").config();

db.once("open", async () => {
  await Image.deleteMany({});
  await User.deleteMany({});
  await Category.deleteMany({});

  const categories = await Category.insertMany([
    { name: 'People' },
    { name: 'Places' },
    { name: 'Animals' },
    { name: 'Things' }
  ]);
  console.log('categories seeded');


  const user = await User.create({
    username: "oliviamckee",
    email: "olivia.mckee97@gmail.com",
    password: process.env.PASSWORD,
  });
  console.log("users seeded");


  const userId = user._id;
  const createdImage = await Image.create({
    alt: "Winter in the Poudre Canyon",
    username: "oliviamckee",
    url: "https://res.cloudinary.com/oliviacm/image/upload/v1664836029/6_nys9lx.jpg",
    description: "Winter in the Poudre Canyon",
    category: categories[1]._id,
  });

  await User.updateOne(
    { _id: userId },
    { $push: { images: createdImage._id } }
  );

  console.log("images seeded");

  process.exit();
});
