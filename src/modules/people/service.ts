import HttpClient from 'common/config/http';
import {
  CreatePersonRequest,
  People,
  Person,
  UpdatePersonDegreeRequest,
} from 'modules/people/models';

export const createPerson = async (
  data: CreatePersonRequest,
): Promise<void> => {
  await HttpClient.post('/People', data);
};

export const getPeople = async (): Promise<People> => {
  const response = await HttpClient.get<People>('/People');
  return response.data;
};

export const getPerson = async (id: string): Promise<Person> => {
  const response = await HttpClient.get<Person>(`/People/${id}`);
  return response.data;
};

export const getPeopleByRole = async (role: string): Promise<People> => {
  const response = await HttpClient.get<People>(`/People/ByRole/${role}`);
  return response.data;
};

export const getPeopleByRank = async (rankName: string): Promise<People> => {
  const response = await HttpClient.get<People>(`/People/ByRank/${rankName}`);
  return response.data;
};

export const getPersonByUserId = async (userId: string): Promise<Person> => {
  const response = await HttpClient.get<Person>(`/People/ByUserId/${userId}`);
  return response.data;
};

export const updatePerson = async (person: Person): Promise<void> => {
  await HttpClient.put(`/People/${person.id}`, person);
};

export const updatePersonDegree = async (
  data: UpdatePersonDegreeRequest,
): Promise<void> => {
  await HttpClient.put(`/People/ChangeDegree/${data.id}`, data);
};

export const deletePerson = async (id: string): Promise<void> => {
  await HttpClient.delete(`/People/${id}`);
};
