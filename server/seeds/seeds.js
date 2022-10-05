const db = require("../config/connection");
const { User, Image } = require("../models");
require("dotenv").config();

db.once("open", async () => {
  await Image.deleteMany({});
  await User.deleteMany({});

  const user = await User.create({
    username: "oliviamckee",
    email: "olivia.mckee97@gmail.com",
    password: process.env.PASSWORD,
  });
  console.log("users seeded");

  const userId = user._id;
  const createdImage = await Image.create({
    title: "Winter in the Poudre Canyon",
    url: "https://res.cloudinary.com/oliviacm/image/upload/v1664836029/6_nys9lx.jpg",
    category: "Places",
  });
  await User.updateOne(
    { _id: userId },
    { $push: { images: createdImage._id } }
  );
  console.log("images seeded");

  process.exit();
});
