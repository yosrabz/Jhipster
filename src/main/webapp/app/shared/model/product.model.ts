import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';

export interface IProduct {
  id?: number;
  libelle?: string;
  creationDate?: Moment;
  prix?: number;
  category?: ICategory;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public libelle?: string,
    public creationDate?: Moment,
    public prix?: number,
    public category?: ICategory
  ) {}
}
