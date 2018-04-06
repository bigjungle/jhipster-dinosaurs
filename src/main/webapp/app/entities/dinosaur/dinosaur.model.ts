import { BaseEntity } from './../../shared';

export const enum Diet {
    'HERBIVORE',
    'CARNIVORE',
    'OMNIVORE'
}

export class Dinosaur implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public weight?: number,
        public length?: number,
        public diet?: Diet,
        public insertDt?: any,
        public modifiedDt?: any,
        public eraName?: string,
        public eraId?: number,
        public cladeDescription?: string,
        public cladeId?: number,
    ) {
    }
}
