import { OperationType } from './operation-type';

export interface Operation {
  type: OperationType;
  parameters: any;
}