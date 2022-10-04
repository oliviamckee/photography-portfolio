const { User, Image } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // me doesn't work
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('images');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // get all images or by username
        images: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Image.find(params)
                .sort({ createdAt: -1 });
        },
        // get images by category
        imagesCategory: async (parent, { category }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            return await Image.find(params);
        },
        // get image by id
        image: async (parent, { _id }) => {
            return Image.findById(_id);
        },
        //get all categories
        // categories: async () => {
        //     return await Category.find();
        // },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('images');
        },
    },
    Mutation: {
        // addUser: async (parent, args) => {
        //     const user = await User.create(args);
        //     const token = signToken(user);

        //     return { token, user };
        // },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        // context broken here too
        addImage: async (parent, args, context) => {
            console.log(context);
            console.log(context.user);
            if (context.user) {
                const image = await Image.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { images: image._id } },
                    { new: true }
                );

                return image;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;