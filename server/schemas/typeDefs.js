const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Image {
    _id: ID
    title: String
    createdAt: String
    url: String
    category: String
  }

  type User {
    _id: ID
    username: String
    email: String
    images: [Image]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    images: [Image]
    image(_id: ID!): Image
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addImage(title: String!, url: String!, category: String!): Image
    editImage(_id: ID!, title: String!, url: String!, category: String!): Image
    deleteImage(_id: ID!): Image
  }
`;

module.exports = typeDefs;