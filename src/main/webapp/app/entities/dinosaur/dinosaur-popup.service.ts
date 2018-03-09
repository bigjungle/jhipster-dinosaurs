import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Dinosaur } from './dinosaur.model';
import { DinosaurService } from './dinosaur.service';

@Injectable()
export class DinosaurPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dinosaurService: DinosaurService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dinosaurService.find(id)
                    .subscribe((dinosaurResponse: HttpResponse<Dinosaur>) => {
                        const dinosaur: Dinosaur = dinosaurResponse.body;
                        dinosaur.insertDt = this.datePipe
                            .transform(dinosaur.insertDt, 'yyyy-MM-ddTHH:mm:ss');
                        dinosaur.modifiedDt = this.datePipe
                            .transform(dinosaur.modifiedDt, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.dinosaurModalRef(component, dinosaur);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dinosaurModalRef(component, new Dinosaur());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dinosaurModalRef(component: Component, dinosaur: Dinosaur): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dinosaur = dinosaur;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
