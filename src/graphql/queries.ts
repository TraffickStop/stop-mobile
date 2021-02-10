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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
