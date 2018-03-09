import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Clade } from './clade.model';
import { CladePopupService } from './clade-popup.service';
import { CladeService } from './clade.service';

@Component({
    selector: 'jhi-clade-dialog',
    templateUrl: './clade-dialog.component.html'
})
export class CladeDialogComponent implements OnInit {

    clade: Clade;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cladeService: CladeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.clade.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cladeService.update(this.clade));
        } else {
            this.subscribeToSaveResponse(
                this.cladeService.create(this.clade));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Clade>>) {
        result.subscribe((res: HttpResponse<Clade>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Clade) {
        this.eventManager.broadcast({ name: 'cladeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-clade-popup',
    template: ''
})
export class CladePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cladePopupService: CladePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cladePopupService
                    .open(CladeDialogComponent as Component, params['id']);
            } else {
                this.cladePopupService
                    .open(CladeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
