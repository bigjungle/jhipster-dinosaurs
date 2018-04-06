import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from '../../shared';
import {
    EraService,
    EraPopupService,
    EraComponent,
    EraDetailComponent,
    EraDialogComponent,
    EraPopupComponent,
    EraDeletePopupComponent,
    EraDeleteDialogComponent,
    eraRoute,
    eraPopupRoute,
    EraResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...eraRoute,
    ...eraPopupRoute,
];

@NgModule({
    imports: [
        DinosaursSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EraComponent,
        EraDetailComponent,
        EraDialogComponent,
        EraDeleteDialogComponent,
        EraPopupComponent,
        EraDeletePopupComponent,
    ],
    entryComponents: [
        EraComponent,
        EraDialogComponent,
        EraPopupComponent,
        EraDeleteDialogComponent,
        EraDeletePopupComponent,
    ],
    providers: [
        EraService,
        EraPopupService,
        EraResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DinosaursEraModule {}
