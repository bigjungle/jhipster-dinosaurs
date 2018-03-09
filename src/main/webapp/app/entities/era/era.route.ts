import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EraComponent } from './era.component';
import { EraDetailComponent } from './era-detail.component';
import { EraPopupComponent } from './era-dialog.component';
import { EraDeletePopupComponent } from './era-delete-dialog.component';

@Injectable()
export class EraResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const eraRoute: Routes = [
    {
        path: 'era',
        component: EraComponent,
        resolve: {
            'pagingParams': EraResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'era/:id',
        component: EraDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eraPopupRoute: Routes = [
    {
        path: 'era-new',
        component: EraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'era/:id/edit',
        component: EraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'era/:id/delete',
        component: EraDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
