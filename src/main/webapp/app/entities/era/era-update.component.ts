import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEra } from 'app/shared/model/era.model';
import { EraService } from './era.service';

@Component({
    selector: 'jhi-era-update',
    templateUrl: './era-update.component.html'
})
export class EraUpdateComponent implements OnInit {
    private _era: IEra;
    isSaving: boolean;

    constructor(private eraService: EraService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ era }) => {
            this.era = era;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.era.id !== undefined) {
            this.subscribeToSaveResponse(this.eraService.update(this.era));
        } else {
            this.subscribeToSaveResponse(this.eraService.create(this.era));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEra>>) {
        result.subscribe((res: HttpResponse<IEra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get era() {
        return this._era;
    }

    set era(era: IEra) {
        this._era = era;
    }
}
