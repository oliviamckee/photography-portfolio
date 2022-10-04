import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      images {
        _id
        alt
        createdAt
        username
        url
        description
        category {
          _id
          name
        }
      }
    }
  }`

export const QUERY_IMAGES = gql`
  query Query {
    images {
      _id
      alt
      createdAt
      username
      url
      description
      category {
        _id
        name
      }
    }
  }`

export const QUERY_IMAGES_USERNAME = gql`
query Images($username: String) {
    images(username: $username) {
      _id
      alt
      createdAt
      username
      url
      description
      category {
        _id
        name
      }
    }
  }`

export const QUERY_IMAGES_CATEGORY = gql`
query Query($category: ID) {
    imagesCategory(category: $category) {
      _id
      alt
      createdAt
      username
      url
      description
      category {
        _id
        name
      }
    }
  }`

export const QUERY_IMAGE = gql`
query Image($id: ID!) {
    image(_id: $id) {
      _id
      alt
      createdAt
      username
      url
      description
      category {
        _id
        name
      }
    }
  }`

export const QUERY_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }`