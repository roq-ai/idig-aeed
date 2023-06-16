import { ExcavatorInterface } from 'interfaces/excavator';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  location: string;
  soil_condition_data: string;
  excavator_id: string;
  created_at?: any;
  updated_at?: any;

  excavator?: ExcavatorInterface;
  _count?: {};
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  soil_condition_data?: string;
  excavator_id?: string;
}
