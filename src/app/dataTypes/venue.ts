import { Show } from './show';
export class Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  url: string;
  levels: any[];
  shows: Show[];
}
