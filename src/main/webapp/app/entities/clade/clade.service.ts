import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Clade } from './clade.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Clade>;

@Injectable()
export class CladeService {

    private resourceUrl =  SERVER_API_URL + 'api/clades';

    constructor(private http: HttpClient) { }

    create(clade: Clade): Observable<EntityResponseType> {
        const copy = this.convert(clade);
        return this.http.post<Clade>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(clade: Clade): Observable<EntityResponseType> {
        const copy = this.convert(clade);
        return this.http.put<Clade>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Clade>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Clade[]>> {
        const options = createRequestOption(req);
        return this.http.get<Clade[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Clade[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Clade = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Clade[]>): HttpResponse<Clade[]> {
        const jsonResponse: Clade[] = res.body;
        const body: Clade[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Clade.
     */
    private convertItemFromServer(clade: Clade): Clade {
        const copy: Clade = Object.assign({}, clade);
        return copy;
    }

    /**
     * Convert a Clade to a JSON which can be sent to the server.
     */
    private convert(clade: Clade): Clade {
        const copy: Clade = Object.assign({}, clade);
        return copy;
    }
}
