import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Dinosaur } from './dinosaur.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Dinosaur>;

@Injectable()
export class DinosaurService {

    private resourceUrl =  SERVER_API_URL + 'api/dinosaurs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(dinosaur: Dinosaur): Observable<EntityResponseType> {
        const copy = this.convert(dinosaur);
        return this.http.post<Dinosaur>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dinosaur: Dinosaur): Observable<EntityResponseType> {
        const copy = this.convert(dinosaur);
        return this.http.put<Dinosaur>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Dinosaur>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Dinosaur[]>> {
        const options = createRequestOption(req);
        return this.http.get<Dinosaur[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Dinosaur[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Dinosaur = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Dinosaur[]>): HttpResponse<Dinosaur[]> {
        const jsonResponse: Dinosaur[] = res.body;
        const body: Dinosaur[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Dinosaur.
     */
    private convertItemFromServer(dinosaur: Dinosaur): Dinosaur {
        const copy: Dinosaur = Object.assign({}, dinosaur);
        copy.insertDt = this.dateUtils
            .convertDateTimeFromServer(dinosaur.insertDt);
        copy.modifiedDt = this.dateUtils
            .convertDateTimeFromServer(dinosaur.modifiedDt);
        return copy;
    }

    /**
     * Convert a Dinosaur to a JSON which can be sent to the server.
     */
    private convert(dinosaur: Dinosaur): Dinosaur {
        const copy: Dinosaur = Object.assign({}, dinosaur);

        copy.insertDt = this.dateUtils.toDate(dinosaur.insertDt);

        copy.modifiedDt = this.dateUtils.toDate(dinosaur.modifiedDt);
        return copy;
    }
}
