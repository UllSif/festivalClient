import {Artist} from "./artist.entity";

export class Concert {
  id: number;
  date: string;
  time: string;
  duration: string;
  artist: number | Artist;
}
