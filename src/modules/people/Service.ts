import { AppDispatch } from '../../common/store';
import { CreatePersonRequest, Person, People } from './Models';
import HttpClient, {
  GetErrorStr,
  HasErrorName,
  IsValidResponse,
} from '../../common/config/http';
import {
  deletedPerson,
  deletingPerson,
  loadingPeople,
  loadingPerson,
  loadPeople,
  loadPerson,
  registeredCorrectly,
  updatedPerson,
  updatingPerson,
  apiError,
} from './Slice';

export const createPerson = async (
  data: CreatePersonRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/People', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(apiError('No se pudo registrar a la persona'));
  }
};

export const getPeople = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingPeople());
    const response = await HttpClient.get<People>('/People');
    if (IsValidResponse(response)) {
      dispatch(loadPeople(response.data));
    }
  } catch (error) {
    dispatch(apiError('No se puedo obtener los datos.'));
  }
};

export const getPerson = async (
  id: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingPerson());
    const response = await HttpClient.get<Person>(`/People/${id}`);
    if (IsValidResponse(response)) {
      dispatch(loadPerson(response.data));
    }
  } catch (error) {
    if (HasErrorName(error.response, 'PersonNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'PersonNotFound')));
    }
  }
};

export const getPeopleByRole = async (
  role: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingPeople());
    const response = await HttpClient.get<People>(`/People/ByRole/${role}`);
    if (IsValidResponse(response)) {
      dispatch(loadPeople(response.data));
    }
  } catch (error) {
    dispatch(apiError('No se pudo cargar los datos.'));
  }
};

export const getPersonByUserId = async (
  userId: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingPerson());
    const response = await HttpClient.get<Person>(`/People/ByUserId/${userId}`);
    if (IsValidResponse(response)) {
      dispatch(loadPerson(response.data));
    }
  } catch (error) {
    if (HasErrorName(error.response, 'PersonNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'PersonNotFound')));
    }
  }
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

export const updatePerson = async (
  person: Person,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(updatingPerson());
    const response = await HttpClient.put(`/People/${person.id}`, person);
    if (IsValidResponse(response)) {
      dispatch(updatedPerson);
    }
  } catch (error) {
    if (HasErrorName(error.response, 'PersonNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'PersonNotFound')));
    }
  }
};

export const deletePerson = async (
  id: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(deletingPerson());
    const response = await HttpClient.delete(`/People/${id}`);
    if (IsValidResponse(response)) {
      dispatch(deletedPerson(id));
    }
  } catch (error) {
    if (HasErrorName(error.response, 'PersonNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'PersonNotFound')));
    }
  }
};
