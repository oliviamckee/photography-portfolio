const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Category {
  _id: ID
  name: String
}

  type Image {
    _id: ID
    alt: String
    createdAt: String
    username: String
    url: String
    description: String
    category: Category
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
    imagesCategory(category: ID): [Image]
    image(_id: ID!): Image
    categories: [Category]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addImage(alt: String!, url: String!, description: String, category: String!): Image
  }
`;

module.exports = typeDefs;