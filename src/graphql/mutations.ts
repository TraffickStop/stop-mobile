/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPeople = /* GraphQL */ `
  mutation CreatePeople(
    $input: CreatePeopleInput!
    $condition: ModelPeopleConditionInput
  ) {
    createPeople(input: $input, condition: $condition) {
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
export const updatePeople = /* GraphQL */ `
  mutation UpdatePeople(
    $input: UpdatePeopleInput!
    $condition: ModelPeopleConditionInput
  ) {
    updatePeople(input: $input, condition: $condition) {
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
export const deletePeople = /* GraphQL */ `
  mutation DeletePeople(
    $input: DeletePeopleInput!
    $condition: ModelPeopleConditionInput
  ) {
    deletePeople(input: $input, condition: $condition) {
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
