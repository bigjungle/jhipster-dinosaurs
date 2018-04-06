import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Clade } from './clade.model';
import { CladePopupService } from './clade-popup.service';
import { CladeService } from './clade.service';

@Component({
    selector: 'jhi-clade-delete-dialog',
    templateUrl: './clade-delete-dialog.component.html'
})
export class CladeDeleteDialogComponent {

    clade: Clade;

    constructor(
        private cladeService: CladeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cladeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cladeListModification',
                content: 'Deleted an clade'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-clade-delete-popup',
    template: ''
})
export class CladeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cladePopupService: CladePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cladePopupService
                .open(CladeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
