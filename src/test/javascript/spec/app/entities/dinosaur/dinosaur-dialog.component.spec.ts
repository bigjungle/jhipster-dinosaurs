/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DinosaursTestModule } from '../../../test.module';
import { DinosaurDialogComponent } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur-dialog.component';
import { DinosaurService } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur.service';
import { Dinosaur } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur.model';
import { EraService } from '../../../../../../main/webapp/app/entities/era';
import { CladeService } from '../../../../../../main/webapp/app/entities/clade';

describe('Component Tests', () => {

    describe('Dinosaur Management Dialog Component', () => {
        let comp: DinosaurDialogComponent;
        let fixture: ComponentFixture<DinosaurDialogComponent>;
        let service: DinosaurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DinosaursTestModule],
                declarations: [DinosaurDialogComponent],
                providers: [
                    EraService,
                    CladeService,
                    DinosaurService
                ]
            })
            .overrideTemplate(DinosaurDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DinosaurDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DinosaurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Dinosaur(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.dinosaur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dinosaurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Dinosaur();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.dinosaur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dinosaurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
