/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DinosaursTestModule } from '../../../test.module';
import { DinosaurDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur-delete-dialog.component';
import { DinosaurService } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur.service';

describe('Component Tests', () => {

    describe('Dinosaur Management Delete Component', () => {
        let comp: DinosaurDeleteDialogComponent;
        let fixture: ComponentFixture<DinosaurDeleteDialogComponent>;
        let service: DinosaurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DinosaursTestModule],
                declarations: [DinosaurDeleteDialogComponent],
                providers: [
                    DinosaurService
                ]
            })
            .overrideTemplate(DinosaurDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DinosaurDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DinosaurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
