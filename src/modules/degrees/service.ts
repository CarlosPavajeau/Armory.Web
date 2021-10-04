import HttpClient from 'common/config/http';
import { CreateDegreeRequest, Degree, Degrees } from 'modules/degrees/models';

export const createDegree = async (
  data: CreateDegreeRequest,
): Promise<void> => {
  await HttpClient.post('/Degrees', data);
};

export const getDegrees = async (): Promise<Degrees> => {
  const response = await HttpClient.get<Degrees>('/Degrees');
  return response.data;
};

export const getDegreesByRank = async (rankId: number): Promise<Degrees> => {
  const response = await HttpClient.get<Degrees>(`/Degrees/ByRank/${rankId}`);
  return response.data;
};

export const getDegree = async (id: number): Promise<Degree | undefined> => {
  const response = await HttpClient.get<Degree>(`/Degrees/${id}`);
  return response.data;
};
