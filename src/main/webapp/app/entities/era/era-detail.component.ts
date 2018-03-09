import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Era } from './era.model';
import { EraService } from './era.service';

@Component({
    selector: 'jhi-era-detail',
    templateUrl: './era-detail.component.html'
})
export class EraDetailComponent implements OnInit, OnDestroy {

    era: Era;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eraService: EraService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEras();
    }

    load(id) {
        this.eraService.find(id)
            .subscribe((eraResponse: HttpResponse<Era>) => {
                this.era = eraResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEras() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eraListModification',
            (response) => this.load(this.era.id)
        );
    }
}
