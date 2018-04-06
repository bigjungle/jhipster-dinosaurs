import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Era } from './era.model';
import { EraPopupService } from './era-popup.service';
import { EraService } from './era.service';

@Component({
    selector: 'jhi-era-delete-dialog',
    templateUrl: './era-delete-dialog.component.html'
})
export class EraDeleteDialogComponent {

    era: Era;

    constructor(
        private eraService: EraService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eraService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eraListModification',
                content: 'Deleted an era'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-era-delete-popup',
    template: ''
})
export class EraDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eraPopupService: EraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eraPopupService
                .open(EraDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
