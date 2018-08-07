import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IClade } from 'app/shared/model/clade.model';
import { CladeService } from './clade.service';

@Component({
    selector: 'jhi-clade-update',
    templateUrl: './clade-update.component.html'
})
export class CladeUpdateComponent implements OnInit {
    private _clade: IClade;
    isSaving: boolean;

    constructor(private cladeService: CladeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ clade }) => {
            this.clade = clade;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.clade.id !== undefined) {
            this.subscribeToSaveResponse(this.cladeService.update(this.clade));
        } else {
            this.subscribeToSaveResponse(this.cladeService.create(this.clade));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClade>>) {
        result.subscribe((res: HttpResponse<IClade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get clade() {
        return this._clade;
    }

    set clade(clade: IClade) {
        this._clade = clade;
    }
}
