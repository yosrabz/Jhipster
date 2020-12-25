import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPage } from 'app/shared/model/page.model';

type EntityResponseType = HttpResponse<IPage>;
type EntityArrayResponseType = HttpResponse<IPage[]>;

@Injectable({ providedIn: 'root' })
export class PageService {
  public resourceUrl = SERVER_API_URL + 'api/pages';

  constructor(protected http: HttpClient) {}

  create(page: IPage): Observable<EntityResponseType> {
    return this.http.post<IPage>(this.resourceUrl, page, { observe: 'response' });
  }

  update(page: IPage): Observable<EntityResponseType> {
    return this.http.put<IPage>(this.resourceUrl, page, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
