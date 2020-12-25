import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPage, Page } from 'app/shared/model/page.model';
import { PageService } from './page.service';
import { PageComponent } from './page.component';
import { PageDetailComponent } from './page-detail.component';
import { PageUpdateComponent } from './page-update.component';

@Injectable({ providedIn: 'root' })
export class PageResolve implements Resolve<IPage> {
  constructor(private service: PageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((page: HttpResponse<Page>) => {
          if (page.body) {
            return of(page.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Page());
  }
}

export const pageRoute: Routes = [
  {
    path: '',
    component: PageComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Pages',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PageDetailComponent,
    resolve: {
      page: PageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Pages',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PageUpdateComponent,
    resolve: {
      page: PageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Pages',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PageUpdateComponent,
    resolve: {
      page: PageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Pages',
    },
    canActivate: [UserRouteAccessService],
  },
];
