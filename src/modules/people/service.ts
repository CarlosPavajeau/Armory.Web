import HttpClient from 'common/config/http';
import {
  CreatePersonRequest,
  People,
  Person,
  UpdatePersonDegreeRequest,
} from 'modules/people/models';

const PeopleService = {
  /**
   * Send request to create a person
   * @param data request body
   */
  createPerson: async (data: CreatePersonRequest): Promise<void> => {
    await HttpClient.post('/People', data);
  },
  /**
   * Fetch all people
   */
  fetchPeople: async (): Promise<People> => {
    const response = await HttpClient.get<People>('/People');
    return response.data;
  },
  /**
   * Return all people in rank
   * @param rank name of the rank to fetch people
   */
  fetchPeopleByRank: async (rank: string): Promise<People> => {
    const response = await HttpClient.get<People>(`/People/ByRank/${rank}`);
    return response.data;
  },
  /**
   * Fetch a person by user id
   * @param userId
   */
  fetchPersonByUserId: async (userId: string): Promise<Person> => {
    const response = await HttpClient.get<Person>(`/People/ByUserId/${userId}`);
    return response.data;
  },
  /**
   * Send request to update a person's degree
   * @param data request body
   */
  updatePersonDegree: async (
    data: UpdatePersonDegreeRequest,
  ): Promise<void> => {
    await HttpClient.put(`/People/ChangeDegree/${data.id}`, data);
  },
};

export default PeopleService;
