import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Dinosaur } from './dinosaur.model';
import { DinosaurService } from './dinosaur.service';

@Component({
    selector: 'jhi-dinosaur-detail',
    templateUrl: './dinosaur-detail.component.html'
})
export class DinosaurDetailComponent implements OnInit, OnDestroy {

    dinosaur: Dinosaur;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dinosaurService: DinosaurService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDinosaurs();
    }

    load(id) {
        this.dinosaurService.find(id)
            .subscribe((dinosaurResponse: HttpResponse<Dinosaur>) => {
                this.dinosaur = dinosaurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDinosaurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dinosaurListModification',
            (response) => this.load(this.dinosaur.id)
        );
    }
}
