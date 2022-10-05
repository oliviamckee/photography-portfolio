const { User, Image } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // me might work, untested and unused
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('images');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // get all images NEED TO TEST 
        images: async (parent) => {
            return Image.find()
                .sort({ createdAt: -1 });
        },
        // get image by id
        image: async (parent, { _id }) => {
            return Image.findById(_id);
        },
        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('images');
        },
    },
    Mutation: {
        // login obviously
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
        // jk it works 
        addImage: async (parent, args, context) => {
            if (context.user) {
                const image = await Image.create(args);

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { images: image._id } },
                    { new: true }
                );

                return image;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        editImage: async (
            _parent,
            { _id, title, category, url }
        ) => {
            const updatedImage = await Image.findByIdAndUpdate(
                { _id: _id },
                {
                    title: title,
                    category: category,
                    url: url
                },
                { new: true }
            );
            return updatedImage;
        },

        deleteImage: async (_parent, { _id }) => {
            const deletedImage = await Image.findByIdAndDelete({ _id: _id });
            return deletedImage;
        },
    }
};

module.exports = resolvers;