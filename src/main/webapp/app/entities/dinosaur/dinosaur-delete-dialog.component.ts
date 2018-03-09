import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Dinosaur } from './dinosaur.model';
import { DinosaurPopupService } from './dinosaur-popup.service';
import { DinosaurService } from './dinosaur.service';

@Component({
    selector: 'jhi-dinosaur-delete-dialog',
    templateUrl: './dinosaur-delete-dialog.component.html'
})
export class DinosaurDeleteDialogComponent {

    dinosaur: Dinosaur;

    constructor(
        private dinosaurService: DinosaurService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dinosaurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dinosaurListModification',
                content: 'Deleted an dinosaur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dinosaur-delete-popup',
    template: ''
})
export class DinosaurDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dinosaurPopupService: DinosaurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dinosaurPopupService
                .open(DinosaurDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
