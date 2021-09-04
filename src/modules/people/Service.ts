import HttpClient, { IsValidResponse } from '../../common/config/http';
import { CreatePersonRequest, People, Person } from './Models';

export const createPerson = async (
  data: CreatePersonRequest,
): Promise<void> => {
  const response = await HttpClient.post('/People', data);

  if (!IsValidResponse(response)) {
    throw new Error('No se pudo registrar a la persona');
  }
};

export const getPeople = async (): Promise<People> => {
  const response = await HttpClient.get<People>('/People');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las personas.');
};

export const getPerson = async (id: string): Promise<Person> => {
  const response = await HttpClient.get<Person>(`/People/${id}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo obtener la persona');
};

export const getPeopleByRole = async (role: string): Promise<People> => {
  const response = await HttpClient.get<People>(`/People/ByRole/${role}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las personas.');
};

export const getPersonByUserId = async (userId: string): Promise<Person> => {
  const response = await HttpClient.get<Person>(`/People/ByUserId/${userId}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo obtener la persona');
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(`/People/Exists/${code}`);
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const updatePerson = async (person: Person): Promise<void> => {
  await HttpClient.put(`/People/${person.id}`, person);
};

export const deletePerson = async (id: string): Promise<void> => {
  await HttpClient.delete(`/People/${id}`);
};
