const { UniqueArgumentNamesRule } = require('graphql');
const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('books');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { bookId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
   saveBook: async (parent, { bookData }, context) => {
    console.log(context.user, bookData)
      if (context.user) {
        // const book = await Book.create({
        //   author,
        //   description,
        //   title,
        //   image,
        //   link,
        //   thoughtAuthor: context.user.username,
        // });

        const userData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          {new: true}
        );

        return userData;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
   
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
          bookAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
   
  },
};

module.exports = resolvers;
