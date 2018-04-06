/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DinosaursTestModule } from '../../../test.module';
import { DinosaurDetailComponent } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur-detail.component';
import { DinosaurService } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur.service';
import { Dinosaur } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur.model';

describe('Component Tests', () => {

    describe('Dinosaur Management Detail Component', () => {
        let comp: DinosaurDetailComponent;
        let fixture: ComponentFixture<DinosaurDetailComponent>;
        let service: DinosaurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DinosaursTestModule],
                declarations: [DinosaurDetailComponent],
                providers: [
                    DinosaurService
                ]
            })
            .overrideTemplate(DinosaurDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DinosaurDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DinosaurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Dinosaur(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dinosaur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
