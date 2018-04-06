import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CladeComponent } from './clade.component';
import { CladeDetailComponent } from './clade-detail.component';
import { CladePopupComponent } from './clade-dialog.component';
import { CladeDeletePopupComponent } from './clade-delete-dialog.component';

@Injectable()
export class CladeResolvePagingParams implements Resolve<any> {

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

export const cladeRoute: Routes = [
    {
        path: 'clade',
        component: CladeComponent,
        resolve: {
            'pagingParams': CladeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clades'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'clade/:id',
        component: CladeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clades'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cladePopupRoute: Routes = [
    {
        path: 'clade-new',
        component: CladePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clades'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clade/:id/edit',
        component: CladePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clades'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clade/:id/delete',
        component: CladeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clades'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
