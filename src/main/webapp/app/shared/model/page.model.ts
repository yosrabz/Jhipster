import { IBook } from 'app/shared/model/book.model';

export interface IPage {
  id?: number;
  numero?: number;
  contenu?: string;
  book?: IBook;
}

export class Page implements IPage {
  constructor(public id?: number, public numero?: number, public contenu?: string, public book?: IBook) {}
}
