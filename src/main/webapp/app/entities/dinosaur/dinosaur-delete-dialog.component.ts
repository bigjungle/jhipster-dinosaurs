import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDinosaur } from 'app/shared/model/dinosaur.model';
import { DinosaurService } from './dinosaur.service';

@Component({
    selector: 'jhi-dinosaur-delete-dialog',
    templateUrl: './dinosaur-delete-dialog.component.html'
})
export class DinosaurDeleteDialogComponent {
    dinosaur: IDinosaur;

    constructor(private dinosaurService: DinosaurService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dinosaurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dinosaurListModification',
                content: 'Deleted an dinosaur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dinosaur-delete-popup',
    template: ''
})
export class DinosaurDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dinosaur }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DinosaurDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.dinosaur = dinosaur;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
