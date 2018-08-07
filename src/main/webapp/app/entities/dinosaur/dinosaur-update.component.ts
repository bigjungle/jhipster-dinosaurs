import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IDinosaur } from 'app/shared/model/dinosaur.model';
import { DinosaurService } from './dinosaur.service';
import { IEra } from 'app/shared/model/era.model';
import { EraService } from 'app/entities/era';
import { IClade } from 'app/shared/model/clade.model';
import { CladeService } from 'app/entities/clade';

@Component({
    selector: 'jhi-dinosaur-update',
    templateUrl: './dinosaur-update.component.html'
})
export class DinosaurUpdateComponent implements OnInit {
    private _dinosaur: IDinosaur;
    isSaving: boolean;

    eras: IEra[];

    clades: IClade[];
    insertDt: string;
    modifiedDt: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private dinosaurService: DinosaurService,
        private eraService: EraService,
        private cladeService: CladeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dinosaur }) => {
            this.dinosaur = dinosaur;
        });
        this.eraService.query().subscribe(
            (res: HttpResponse<IEra[]>) => {
                this.eras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cladeService.query().subscribe(
            (res: HttpResponse<IClade[]>) => {
                this.clades = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.dinosaur.insertDt = moment(this.insertDt, DATE_TIME_FORMAT);
        this.dinosaur.modifiedDt = moment(this.modifiedDt, DATE_TIME_FORMAT);
        if (this.dinosaur.id !== undefined) {
            this.subscribeToSaveResponse(this.dinosaurService.update(this.dinosaur));
        } else {
            this.subscribeToSaveResponse(this.dinosaurService.create(this.dinosaur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDinosaur>>) {
        result.subscribe((res: HttpResponse<IDinosaur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEraById(index: number, item: IEra) {
        return item.id;
    }

    trackCladeById(index: number, item: IClade) {
        return item.id;
    }
    get dinosaur() {
        return this._dinosaur;
    }

    set dinosaur(dinosaur: IDinosaur) {
        this._dinosaur = dinosaur;
        this.insertDt = moment(dinosaur.insertDt).format(DATE_TIME_FORMAT);
        this.modifiedDt = moment(dinosaur.modifiedDt).format(DATE_TIME_FORMAT);
    }
}
