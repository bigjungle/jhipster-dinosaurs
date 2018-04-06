import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DinosaursEraModule } from './era/era.module';
import { DinosaursCladeModule } from './clade/clade.module';
import { DinosaursDinosaurModule } from './dinosaur/dinosaur.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DinosaursEraModule,
        DinosaursCladeModule,
        DinosaursDinosaurModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DinosaursEntityModule {}
