import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from '../../shared';
import {
    CladeService,
    CladePopupService,
    CladeComponent,
    CladeDetailComponent,
    CladeDialogComponent,
    CladePopupComponent,
    CladeDeletePopupComponent,
    CladeDeleteDialogComponent,
    cladeRoute,
    cladePopupRoute,
    CladeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cladeRoute,
    ...cladePopupRoute,
];

@NgModule({
    imports: [
        DinosaursSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CladeComponent,
        CladeDetailComponent,
        CladeDialogComponent,
        CladeDeleteDialogComponent,
        CladePopupComponent,
        CladeDeletePopupComponent,
    ],
    entryComponents: [
        CladeComponent,
        CladeDialogComponent,
        CladePopupComponent,
        CladeDeleteDialogComponent,
        CladeDeletePopupComponent,
    ],
    providers: [
        CladeService,
        CladePopupService,
        CladeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DinosaursCladeModule {}
