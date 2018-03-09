import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from '../../shared';
import {
    DinosaurService,
    DinosaurPopupService,
    DinosaurComponent,
    DinosaurDetailComponent,
    DinosaurDialogComponent,
    DinosaurPopupComponent,
    DinosaurDeletePopupComponent,
    DinosaurDeleteDialogComponent,
    dinosaurRoute,
    dinosaurPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dinosaurRoute,
    ...dinosaurPopupRoute,
];

@NgModule({
    imports: [
        DinosaursSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DinosaurComponent,
        DinosaurDetailComponent,
        DinosaurDialogComponent,
        DinosaurDeleteDialogComponent,
        DinosaurPopupComponent,
        DinosaurDeletePopupComponent,
    ],
    entryComponents: [
        DinosaurComponent,
        DinosaurDialogComponent,
        DinosaurPopupComponent,
        DinosaurDeleteDialogComponent,
        DinosaurDeletePopupComponent,
    ],
    providers: [
        DinosaurService,
        DinosaurPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DinosaursDinosaurModule {}
