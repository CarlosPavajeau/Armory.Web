import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import {
  CreateWeaponRequest,
  Weapon,
  Weapons,
} from 'modules/armament/weapons/models';

const WeaponsService = {
  /**
   * Send request to create a Weapon
   * @param data request body
   */
  create: async (data: CreateWeaponRequest): Promise<Blob> => {
    const response = await HttpClient.post<
      CreateWeaponRequest,
      AxiosResponse<Blob>
    >('weapons', data, {
      responseType: 'blob',
    });

    return response.data;
  },
  /**
   * Fetch all weapons
   */
  fetchAll: async (): Promise<Weapons> => {
    const response = await HttpClient.get<Weapons>('weapons');
    return response.data;
  },
  /**
   * Fetch all weapon by flight
   * @param flight flight code
   */
  fetchAllByFlight: async (flight: string): Promise<Weapons> => {
    const response = await HttpClient.get<Weapons>(
      `weapons/byflight/${flight}`,
    );
    return response.data;
  },
  /**
   * Fetch Weapon
   * @param serial weapon serial
   */
  fetch: async (serial: string): Promise<Weapon> => {
    const response = await HttpClient.get<Weapon>(`weapons/${serial}`);
    return response.data;
  },
  /**
   * Send request to generate a weapon Qr
   * @param serial weapon serial
   */
  generateQr: async (serial: string): Promise<Blob> => {
    const response = await HttpClient.get<Blob>(
      `/weapons/generateqr/${serial}`,
      {
        responseType: 'blob',
      },
    );
    return response.data;
  },
};

export default WeaponsService;
