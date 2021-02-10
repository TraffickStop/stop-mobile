/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePeople = /* GraphQL */ `
  subscription OnCreatePeople {
    onCreatePeople {
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
export const onUpdatePeople = /* GraphQL */ `
  subscription OnUpdatePeople {
    onUpdatePeople {
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
export const onDeletePeople = /* GraphQL */ `
  subscription OnDeletePeople {
    onDeletePeople {
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
export const onCreateFaceVector = /* GraphQL */ `
  subscription OnCreateFaceVector {
    onCreateFaceVector {
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
export const onUpdateFaceVector = /* GraphQL */ `
  subscription OnUpdateFaceVector {
    onUpdateFaceVector {
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
export const onDeleteFaceVector = /* GraphQL */ `
  subscription OnDeleteFaceVector {
    onDeleteFaceVector {
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
