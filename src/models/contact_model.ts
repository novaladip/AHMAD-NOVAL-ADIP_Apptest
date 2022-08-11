import {BaseResponseModel} from './base_response_model';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}

export type FetchContactsResponse = BaseResponseModel<Contact[]>;
