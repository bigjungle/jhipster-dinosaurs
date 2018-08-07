import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDinosaur } from 'app/shared/model/dinosaur.model';

type EntityResponseType = HttpResponse<IDinosaur>;
type EntityArrayResponseType = HttpResponse<IDinosaur[]>;

@Injectable({ providedIn: 'root' })
export class DinosaurService {
    private resourceUrl = SERVER_API_URL + 'api/dinosaurs';

    constructor(private http: HttpClient) {}

    create(dinosaur: IDinosaur): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dinosaur);
        return this.http
            .post<IDinosaur>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(dinosaur: IDinosaur): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dinosaur);
        return this.http
            .put<IDinosaur>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDinosaur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDinosaur[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(dinosaur: IDinosaur): IDinosaur {
        const copy: IDinosaur = Object.assign({}, dinosaur, {
            insertDt: dinosaur.insertDt != null && dinosaur.insertDt.isValid() ? dinosaur.insertDt.toJSON() : null,
            modifiedDt: dinosaur.modifiedDt != null && dinosaur.modifiedDt.isValid() ? dinosaur.modifiedDt.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.insertDt = res.body.insertDt != null ? moment(res.body.insertDt) : null;
        res.body.modifiedDt = res.body.modifiedDt != null ? moment(res.body.modifiedDt) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((dinosaur: IDinosaur) => {
            dinosaur.insertDt = dinosaur.insertDt != null ? moment(dinosaur.insertDt) : null;
            dinosaur.modifiedDt = dinosaur.modifiedDt != null ? moment(dinosaur.modifiedDt) : null;
        });
        return res;
    }
}
