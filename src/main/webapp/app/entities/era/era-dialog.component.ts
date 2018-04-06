import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Era } from './era.model';
import { EraPopupService } from './era-popup.service';
import { EraService } from './era.service';

@Component({
    selector: 'jhi-era-dialog',
    templateUrl: './era-dialog.component.html'
})
export class EraDialogComponent implements OnInit {

    era: Era;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private eraService: EraService,
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
        if (this.era.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eraService.update(this.era));
        } else {
            this.subscribeToSaveResponse(
                this.eraService.create(this.era));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Era>>) {
        result.subscribe((res: HttpResponse<Era>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Era) {
        this.eventManager.broadcast({ name: 'eraListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-era-popup',
    template: ''
})
export class EraPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eraPopupService: EraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eraPopupService
                    .open(EraDialogComponent as Component, params['id']);
            } else {
                this.eraPopupService
                    .open(EraDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
