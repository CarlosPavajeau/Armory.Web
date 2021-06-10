import axios, { AxiosResponse } from 'axios';
import { AuthenticationRequest } from '../models/AuthenticationRequest';

const authorizeUser = async (
  data: AuthenticationRequest,
): Promise<AxiosResponse<string>> => {
  return axios.post<string>(
    `${process.env.REACT_APP_API_URL}/Authentication`,
    data,
  );
};

export { authorizeUser };
