import { Moment } from 'moment';
import { IAuthor } from 'app/shared/model/author.model';
import { IPage } from 'app/shared/model/page.model';

export interface IBook {
  id?: number;
  title?: string;
  description?: string;
  publicationDate?: Moment;
  price?: number;
  author?: IAuthor;
  pages?: IPage[];
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public publicationDate?: Moment,
    public price?: number,
    public author?: IAuthor,
    public pages?: IPage[]
  ) {}
}
