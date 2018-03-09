import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Clade } from './clade.model';
import { CladeService } from './clade.service';

@Component({
    selector: 'jhi-clade-detail',
    templateUrl: './clade-detail.component.html'
})
export class CladeDetailComponent implements OnInit, OnDestroy {

    clade: Clade;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cladeService: CladeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClades();
    }

    load(id) {
        this.cladeService.find(id)
            .subscribe((cladeResponse: HttpResponse<Clade>) => {
                this.clade = cladeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClades() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cladeListModification',
            (response) => this.load(this.clade.id)
        );
    }
}
