import { IProduct } from 'app/shared/model/product.model';

export interface ICategory {
  id?: number;
  name_category?: string;
  products?: IProduct[];
}

export class Category implements ICategory {
  constructor(public id?: number, public name_category?: string, public products?: IProduct[]) {}
}
