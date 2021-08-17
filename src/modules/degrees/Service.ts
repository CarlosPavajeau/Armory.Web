import { CreateDegreeRequest, Degree, Degrees } from './Models';
import HttpClient, { IsValidResponse } from '../../common/config/http';

export const createDegree = async (
  data: CreateDegreeRequest,
): Promise<void> => {
  await HttpClient.post('/Degrees', data);
};

export const getDegrees = async (): Promise<Degrees> => {
  const response = await HttpClient.get<Degrees>('/Degrees');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se puedieron obtener los grados.');
};

export const getDegreesByRank = async (rankId: number): Promise<Degrees> => {
  const response = await HttpClient.get<Degrees>(`/Degrees/ByRank/${rankId}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se puedieron obtener los grados.');
};

export const getDegree = async (id: number): Promise<Degree | undefined> => {
  const response = await HttpClient.get<Degree>(`/Degrees/${id}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo obtener el grado.');
};
