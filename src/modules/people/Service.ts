import { AppDispatch } from '../../common/store';
import { CreatePersonRequest, Person, People } from './Models';
import axiosInstance from '../../common/config/axios';
import {
  deletedPerson,
  deletingPerson,
  loadingPeople,
  loadingPerson,
  loadPeople,
  loadPerson,
  notRegister,
  personNotFound,
  registeredCorrectly,
  updatedPerson,
  updatingPerson,
} from './Slice';

const createPerson = async (
  data: CreatePersonRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await axiosInstance.post('/People', data);
    if (response && response.status === 200) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede registrar a la persona'));
  }
};

const getPeople = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingPeople());
    const response = await axiosInstance.get<People>('/People');
    if (response && response.status === 200) {
      dispatch(loadPeople(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const getPerson = async (id: string, dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingPerson());
    const response = await axiosInstance.get<Person>(`/People/${id}`);
    if (response && response.status === 200) {
      dispatch(loadPerson(response.data));
    }
  } catch (error) {
    if (error.response.data.errors.PersonNotFound) {
      const errorMsg = error.response.data.errors.PersonNotFound.join(', ');
      dispatch(personNotFound(errorMsg));
    }
  }
};

const getPeopleByRole = async (
  role: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingPeople());
    const response = await axiosInstance.get<People>(`/People/ByRole/${role}`);
    if (response && response.status === 200) {
      dispatch(loadPeople(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const getPersonByUserId = async (
  userId: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingPerson());
    const response = await axiosInstance.get<Person>(
      `/People/ByUserId/${userId}`,
    );
    if (response && response.status === 200) {
      dispatch(loadPerson(response.data));
    }
  } catch (error) {
    if (error.response.data.errors.PersonNotFound) {
      const errorMsg = error.response.data.errors.PersonNotFound.join(', ');
      dispatch(personNotFound(errorMsg));
    }
  }
};

const updatePerson = async (
  person: Person,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(updatingPerson());
    const response = await axiosInstance.put(`/People/${person.id}`, person);
    if (response && response.status === 200) {
      dispatch(updatedPerson);
    }
  } catch (error) {
    if (error.response.data.errors.PersonNotFound) {
      const errorMsg = error.response.data.errors.PersonNotFound.join(', ');
      dispatch(personNotFound(errorMsg));
    }
  }
};

const deletePerson = async (
  id: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(deletingPerson());
    const response = await axiosInstance.delete(`/People/${id}`);
    if (response && response.status === 200) {
      dispatch(deletedPerson(id));
    }
  } catch (error) {
    if (error.response.data.errors.PersonNotFound) {
      const errorMsg = error.response.data.errors.PersonNotFound.join(', ');
      dispatch(personNotFound(errorMsg));
    }
  }
};

export {
  createPerson,
  getPeople,
  getPerson,
  getPeopleByRole,
  getPersonByUserId,
  updatePerson,
  deletePerson,
};