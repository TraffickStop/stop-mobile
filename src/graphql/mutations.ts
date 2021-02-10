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
export const createFaceVector = /* GraphQL */ `
  mutation CreateFaceVector(
    $input: CreateFaceVectorInput!
    $condition: ModelFaceVectorConditionInput
  ) {
    createFaceVector(input: $input, condition: $condition) {
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
export const updateFaceVector = /* GraphQL */ `
  mutation UpdateFaceVector(
    $input: UpdateFaceVectorInput!
    $condition: ModelFaceVectorConditionInput
  ) {
    updateFaceVector(input: $input, condition: $condition) {
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
export const deleteFaceVector = /* GraphQL */ `
  mutation DeleteFaceVector(
    $input: DeleteFaceVectorInput!
    $condition: ModelFaceVectorConditionInput
  ) {
    deleteFaceVector(input: $input, condition: $condition) {
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
