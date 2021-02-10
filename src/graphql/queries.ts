/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPeople = /* GraphQL */ `
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      caseNumber
      firstName
      lastName
      missingAge
      city
      county
      state
      sex
      race
      dateModified
      imageFilename
      imagePath
      faceVector {
        id
        person {
          id
          caseNumber
          firstName
          lastName
          missingAge
          city
          county
          state
          sex
          race
          dateModified
          imageFilename
          imagePath
          createdAt
          updatedAt
        }
        vector
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPeoples = /* GraphQL */ `
  query ListPeoples(
    $filter: ModelPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeoples(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        caseNumber
        firstName
        lastName
        missingAge
        city
        county
        state
        sex
        race
        dateModified
        imageFilename
        imagePath
        faceVector {
          id
          vector
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFaceVector = /* GraphQL */ `
  query GetFaceVector($id: ID!) {
    getFaceVector(id: $id) {
      id
      person {
        id
        caseNumber
        firstName
        lastName
        missingAge
        city
        county
        state
        sex
        race
        dateModified
        imageFilename
        imagePath
        faceVector {
          id
          vector
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      vector
      createdAt
      updatedAt
    }
  }
`;
export const listFaceVectors = /* GraphQL */ `
  query ListFaceVectors(
    $filter: ModelFaceVectorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFaceVectors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        person {
          id
          caseNumber
          firstName
          lastName
          missingAge
          city
          county
          state
          sex
          race
          dateModified
          imageFilename
          imagePath
          createdAt
          updatedAt
        }
        vector
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
