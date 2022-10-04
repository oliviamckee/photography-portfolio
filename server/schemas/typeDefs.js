const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Image {
    _id: ID
    title: String
    createdAt: String
    username: String
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
    images(username: String): [Image]
    imagesCategory(category: String): [Image]
    image(_id: ID!): Image
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addImage(title: String!, url: String!, category: String!): Image
  }
`;

module.exports = typeDefs;