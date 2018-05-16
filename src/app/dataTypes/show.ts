import { Venue } from './venue';
export class Show {
  id: number;
  name: string;
  description: string;
  url: string;
  performances: any[];
  venue: Venue;
}
