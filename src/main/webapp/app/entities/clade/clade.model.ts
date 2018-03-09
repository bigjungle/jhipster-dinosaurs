import { BaseEntity } from './../../shared';

export class Clade implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
    ) {
    }
}
