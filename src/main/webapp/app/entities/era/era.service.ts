import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Era } from './era.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Era>;

@Injectable()
export class EraService {

    private resourceUrl =  SERVER_API_URL + 'api/eras';

    constructor(private http: HttpClient) { }

    create(era: Era): Observable<EntityResponseType> {
        const copy = this.convert(era);
        return this.http.post<Era>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(era: Era): Observable<EntityResponseType> {
        const copy = this.convert(era);
        return this.http.put<Era>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Era>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Era[]>> {
        const options = createRequestOption(req);
        return this.http.get<Era[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Era[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Era = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Era[]>): HttpResponse<Era[]> {
        const jsonResponse: Era[] = res.body;
        const body: Era[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Era.
     */
    private convertItemFromServer(era: Era): Era {
        const copy: Era = Object.assign({}, era);
        return copy;
    }

    /**
     * Convert a Era to a JSON which can be sent to the server.
     */
    private convert(era: Era): Era {
        const copy: Era = Object.assign({}, era);
        return copy;
    }
}
