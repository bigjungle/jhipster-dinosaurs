/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DinosaursTestModule } from '../../../test.module';
import { DinosaurComponent } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur.component';
import { DinosaurService } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur.service';
import { Dinosaur } from '../../../../../../main/webapp/app/entities/dinosaur/dinosaur.model';

describe('Component Tests', () => {

    describe('Dinosaur Management Component', () => {
        let comp: DinosaurComponent;
        let fixture: ComponentFixture<DinosaurComponent>;
        let service: DinosaurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DinosaursTestModule],
                declarations: [DinosaurComponent],
                providers: [
                    DinosaurService
                ]
            })
            .overrideTemplate(DinosaurComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DinosaurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DinosaurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Dinosaur(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dinosaurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
