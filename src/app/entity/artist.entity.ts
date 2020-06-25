import {Concert} from "./concert.entity";

export class Artist {
  id: number;
  name: string;
  biography: string;
  concerts: number | Concert;
}
