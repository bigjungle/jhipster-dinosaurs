import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dinosaur } from 'app/shared/model/dinosaur.model';
import { DinosaurService } from './dinosaur.service';
import { DinosaurComponent } from './dinosaur.component';
import { DinosaurDetailComponent } from './dinosaur-detail.component';
import { DinosaurUpdateComponent } from './dinosaur-update.component';
import { DinosaurDeletePopupComponent } from './dinosaur-delete-dialog.component';
import { IDinosaur } from 'app/shared/model/dinosaur.model';

@Injectable({ providedIn: 'root' })
export class DinosaurResolve implements Resolve<IDinosaur> {
    constructor(private service: DinosaurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((dinosaur: HttpResponse<Dinosaur>) => dinosaur.body));
        }
        return of(new Dinosaur());
    }
}

export const dinosaurRoute: Routes = [
    {
        path: 'dinosaur',
        component: DinosaurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dinosaur/:id/view',
        component: DinosaurDetailComponent,
        resolve: {
            dinosaur: DinosaurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dinosaur/new',
        component: DinosaurUpdateComponent,
        resolve: {
            dinosaur: DinosaurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dinosaur/:id/edit',
        component: DinosaurUpdateComponent,
        resolve: {
            dinosaur: DinosaurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dinosaurPopupRoute: Routes = [
    {
        path: 'dinosaur/:id/delete',
        component: DinosaurDeletePopupComponent,
        resolve: {
            dinosaur: DinosaurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dinosaurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
