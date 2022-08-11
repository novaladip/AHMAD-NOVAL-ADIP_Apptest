import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Contact, FetchContactsResponse} from '../models';

export type CreateContactDto = Omit<Contact, 'id'>;

export const contactsApi = createApi({
  reducerPath: 'contacts',
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://simple-contact-crud.herokuapp.com/contact',
  }),
  tagTypes: ['contacts'],

  endpoints: builder => ({
    fetchContacts: builder.query<Contact[], null>({
      query: () => '',
      transformResponse: (response: FetchContactsResponse) => response.data,
      providesTags: ['contacts'],
    }),
    getContactById: builder.query<Contact, string>({
      query: id => `/${id}`,
      providesTags: ['contacts'],
    }),
    deleteContactById: builder.mutation<Contact, string>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
    createContact: builder.mutation<Contact, Omit<Contact, 'id'>>({
      query: (contact: CreateContactDto) => ({
        url: '',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['contacts'],
    }),
    updateContact: builder.mutation<Contact, Contact>({
      query: (contact: Contact) => ({
        url: `/${contact.id}`,
        method: 'PUT',
        body: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          age: contact.age,
          photo: contact.photo,
        },
      }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useGetContactByIdQuery,
  useDeleteContactByIdMutation,
  useCreateContactMutation,
  useUpdateContactMutation,
} = contactsApi;
