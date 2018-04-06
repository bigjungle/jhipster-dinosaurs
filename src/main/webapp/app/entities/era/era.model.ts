import { BaseEntity } from './../../shared';

export class Era implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public fromMa?: number,
        public toMa?: number,
    ) {
    }
}
