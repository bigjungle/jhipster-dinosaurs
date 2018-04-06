import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Dinosaur } from './dinosaur.model';
import { DinosaurPopupService } from './dinosaur-popup.service';
import { DinosaurService } from './dinosaur.service';
import { Era, EraService } from '../era';
import { Clade, CladeService } from '../clade';

@Component({
    selector: 'jhi-dinosaur-dialog',
    templateUrl: './dinosaur-dialog.component.html'
})
export class DinosaurDialogComponent implements OnInit {

    dinosaur: Dinosaur;
    isSaving: boolean;

    eras: Era[];

    clades: Clade[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dinosaurService: DinosaurService,
        private eraService: EraService,
        private cladeService: CladeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.eraService.query()
            .subscribe((res: HttpResponse<Era[]>) => { this.eras = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cladeService.query()
            .subscribe((res: HttpResponse<Clade[]>) => { this.clades = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dinosaur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dinosaurService.update(this.dinosaur));
        } else {
            this.subscribeToSaveResponse(
                this.dinosaurService.create(this.dinosaur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Dinosaur>>) {
        result.subscribe((res: HttpResponse<Dinosaur>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Dinosaur) {
        this.eventManager.broadcast({ name: 'dinosaurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEraById(index: number, item: Era) {
        return item.id;
    }

    trackCladeById(index: number, item: Clade) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dinosaur-popup',
    template: ''
})
export class DinosaurPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dinosaurPopupService: DinosaurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dinosaurPopupService
                    .open(DinosaurDialogComponent as Component, params['id']);
            } else {
                this.dinosaurPopupService
                    .open(DinosaurDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
