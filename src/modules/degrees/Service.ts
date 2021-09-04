import HttpClient, { IsValidResponse } from '../../common/config/http';
import { CreateDegreeRequest, Degree, Degrees } from './Models';

export const createDegree = async (
  data: CreateDegreeRequest,
): Promise<void> => {
  const response = await HttpClient.post('/Degrees', data);

  if (!IsValidResponse(response)) {
    throw new Error('No se pudo registrar el grado');
  }
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
