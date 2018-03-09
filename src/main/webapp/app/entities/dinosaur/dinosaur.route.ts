import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DinosaurComponent } from './dinosaur.component';
import { DinosaurDetailComponent } from './dinosaur-detail.component';
import { DinosaurPopupComponent } from './dinosaur-dialog.component';
import { DinosaurDeletePopupComponent } from './dinosaur-delete-dialog.component';

export const dinosaurRoute: Routes = [
    {
        path: 'dinosaur',
        component: DinosaurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dinosaur/:id',
        component: DinosaurDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dinosaurPopupRoute: Routes = [
    {
        path: 'dinosaur-new',
        component: DinosaurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dinosaur/:id/edit',
        component: DinosaurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dinosaur/:id/delete',
        component: DinosaurDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
