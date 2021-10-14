import HttpClient from 'common/config/http';
import {
  AddAssignedWeaponMagazineFormatItemRequest,
  AssignedWeaponMagazineFormat,
  AssignedWeaponMagazineFormatItem,
  CreateAssignedWeaponMagazineFormatRequest,
} from 'modules/formats/assigned-weapon-magazine/models';

const AssignedWeaponMagazineFormatsService = {
  /**
   * Send request to create an AssignedWeaponMagazineFormat
   * @param data request body
   */
  create: async (
    data: CreateAssignedWeaponMagazineFormatRequest,
  ): Promise<number> => {
    return HttpClient.post<CreateAssignedWeaponMagazineFormatRequest, number>(
      'assignedweaponmagazineformats',
      data,
    );
  },
  /**
   * Send request to add an item to an AssignedWeaponMagazineFormat
   * @param data request body
   */
  addItem: async (
    data: AddAssignedWeaponMagazineFormatItemRequest,
  ): Promise<AssignedWeaponMagazineFormatItem> => {
    return HttpClient.post<
      AddAssignedWeaponMagazineFormatItemRequest,
      AssignedWeaponMagazineFormatItem
    >(`assignedweaponmagazineformats/additem/${data.formatId}`, data);
  },
  /**
   * Fetch an AssignedWeaponMagazineFormat
   * @param id format id
   */
  fetch: async (id: number): Promise<AssignedWeaponMagazineFormat> => {
    const response = await HttpClient.get<AssignedWeaponMagazineFormat>(
      `assignedweaponmagazineformats/${id}`,
    );
    return response.data;
  },
  /**
   * Send request to generate an AssignedWeaponMagazineFormat
   * @param id format id
   */
  generate: async (id: number): Promise<Blob> => {
    const response = await HttpClient.get<Blob>(
      `assignedweaponmagazineformats/generate/${id}`,
      {
        responseType: 'blob',
      },
    );
    return response.data;
  },
};

export default AssignedWeaponMagazineFormatsService;
