import { UserInterface } from 'interfaces/user';
import { ExcavatorInterface } from 'interfaces/excavator';
import { GetQueryInterface } from 'interfaces';

export interface InvitationInterface {
  id?: string;
  invited_user_id: string;
  excavator_id: string;
  role: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  excavator?: ExcavatorInterface;
  _count?: {};
}

export interface InvitationGetQueryInterface extends GetQueryInterface {
  id?: string;
  invited_user_id?: string;
  excavator_id?: string;
  role?: string;
}
