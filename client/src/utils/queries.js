import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    username
    email
    images {
      _id
      title
      createdAt
      username
      url
      category
    }
  }
}`

export const QUERY_IMAGES = gql`
query Images {
  images {
    _id
    title
    createdAt
    username
    url
    category
  }
}`

export const QUERY_IMAGES_USERNAME = gql`
query Images($username: String) {
  images(username: $username) {
    _id
    title
    createdAt
    username
    url
    category
  }
}`

export const QUERY_IMAGES_CATEGORY = gql`
query ImagesCategory($category: String) {
  imagesCategory(category: $category) {
    _id
    title
    createdAt
    username
    url
    category
  }
}`

export const QUERY_IMAGE = gql`
query Image($id: ID!) {
  image(_id: $id) {
    _id
    title
    createdAt
    username
    url
    category
  }
}`
