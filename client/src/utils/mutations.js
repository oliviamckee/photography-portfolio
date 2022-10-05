import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
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
mutation AddImage($title: String!, $url: String!, $category: String!) {
  addImage(title: $title, url: $url, category: $category) {
    _id
    title
    createdAt
    url
    category
  }
}`

export const EDIT_IMAGE = gql`
mutation EditImage($id: ID!, $title: String!, $url: String!, $category: String!) {
  editImage(_id: $id, title: $title, url: $url, category: $category) {
    _id
    title
    createdAt
    url
    category
  }
}`

export const DELETE_IMAGE = gql`
mutation DeleteImage($id: ID!) {
  deleteImage(_id: $id) {
    _id
    title
    createdAt
    url
    category
  }
}`