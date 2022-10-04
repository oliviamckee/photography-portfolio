import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}`

export const ADD_IMAGE = gql`
mutation Mutation($title: String!, $url: String!, $category: String!) {
  addImage(title: $title, url: $url, category: $category) {
    _id
    title
    createdAt
    username
    url
    category
  }
}`