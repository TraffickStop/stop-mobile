/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePeopleInput = {
  id?: string | null,
  caseNumber?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  missingAge?: number | null,
  city?: string | null,
  county?: string | null,
  state?: string | null,
  sex?: string | null,
  race?: string | null,
  dateModified?: string | null,
};

export type ModelPeopleConditionInput = {
  caseNumber?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  missingAge?: ModelIntInput | null,
  city?: ModelStringInput | null,
  county?: ModelStringInput | null,
  state?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  race?: ModelStringInput | null,
  dateModified?: ModelStringInput | null,
  and?: Array< ModelPeopleConditionInput | null > | null,
  or?: Array< ModelPeopleConditionInput | null > | null,
  not?: ModelPeopleConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePeopleInput = {
  id: string,
  caseNumber?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  missingAge?: number | null,
  city?: string | null,
  county?: string | null,
  state?: string | null,
  sex?: string | null,
  race?: string | null,
  dateModified?: string | null,
};

export type DeletePeopleInput = {
  id?: string | null,
};

export type ModelPeopleFilterInput = {
  id?: ModelIDInput | null,
  caseNumber?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  missingAge?: ModelIntInput | null,
  city?: ModelStringInput | null,
  county?: ModelStringInput | null,
  state?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  race?: ModelStringInput | null,
  dateModified?: ModelStringInput | null,
  and?: Array< ModelPeopleFilterInput | null > | null,
  or?: Array< ModelPeopleFilterInput | null > | null,
  not?: ModelPeopleFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreatePeopleMutationVariables = {
  input: CreatePeopleInput,
  condition?: ModelPeopleConditionInput | null,
};

export type CreatePeopleMutation = {
  createPeople:  {
    __typename: "People",
    id: string,
    caseNumber: string | null,
    firstName: string | null,
    lastName: string | null,
    missingAge: number | null,
    city: string | null,
    county: string | null,
    state: string | null,
    sex: string | null,
    race: string | null,
    dateModified: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePeopleMutationVariables = {
  input: UpdatePeopleInput,
  condition?: ModelPeopleConditionInput | null,
};

export type UpdatePeopleMutation = {
  updatePeople:  {
    __typename: "People",
    id: string,
    caseNumber: string | null,
    firstName: string | null,
    lastName: string | null,
    missingAge: number | null,
    city: string | null,
    county: string | null,
    state: string | null,
    sex: string | null,
    race: string | null,
    dateModified: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePeopleMutationVariables = {
  input: DeletePeopleInput,
  condition?: ModelPeopleConditionInput | null,
};

export type DeletePeopleMutation = {
  deletePeople:  {
    __typename: "People",
    id: string,
    caseNumber: string | null,
    firstName: string | null,
    lastName: string | null,
    missingAge: number | null,
    city: string | null,
    county: string | null,
    state: string | null,
    sex: string | null,
    race: string | null,
    dateModified: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPeopleQueryVariables = {
  id: string,
};

export type GetPeopleQuery = {
  getPeople:  {
    __typename: "People",
    id: string,
    caseNumber: string | null,
    firstName: string | null,
    lastName: string | null,
    missingAge: number | null,
    city: string | null,
    county: string | null,
    state: string | null,
    sex: string | null,
    race: string | null,
    dateModified: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPeoplesQueryVariables = {
  filter?: ModelPeopleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPeoplesQuery = {
  listPeoples:  {
    __typename: "ModelPeopleConnection",
    items:  Array< {
      __typename: "People",
      id: string,
      caseNumber: string | null,
      firstName: string | null,
      lastName: string | null,
      missingAge: number | null,
      city: string | null,
      county: string | null,
      state: string | null,
      sex: string | null,
      race: string | null,
      dateModified: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePeopleSubscription = {
  onCreatePeople:  {
    __typename: "People",
    id: string,
    caseNumber: string | null,
    firstName: string | null,
    lastName: string | null,
    missingAge: number | null,
    city: string | null,
    county: string | null,
    state: string | null,
    sex: string | null,
    race: string | null,
    dateModified: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePeopleSubscription = {
  onUpdatePeople:  {
    __typename: "People",
    id: string,
    caseNumber: string | null,
    firstName: string | null,
    lastName: string | null,
    missingAge: number | null,
    city: string | null,
    county: string | null,
    state: string | null,
    sex: string | null,
    race: string | null,
    dateModified: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePeopleSubscription = {
  onDeletePeople:  {
    __typename: "People",
    id: string,
    caseNumber: string | null,
    firstName: string | null,
    lastName: string | null,
    missingAge: number | null,
    city: string | null,
    county: string | null,
    state: string | null,
    sex: string | null,
    race: string | null,
    dateModified: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
