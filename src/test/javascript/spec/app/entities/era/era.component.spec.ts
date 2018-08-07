/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DinosaursTestModule } from '../../../test.module';
import { EraComponent } from '../../../../../../main/webapp/app/entities/era/era.component';
import { EraService } from '../../../../../../main/webapp/app/entities/era/era.service';
import { Era } from '../../../../../../main/webapp/app/shared/model/era.model';

describe('Component Tests', () => {
    describe('Era Management Component', () => {
        let comp: EraComponent;
        let fixture: ComponentFixture<EraComponent>;
        let service: EraService;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [DinosaursTestModule],
                    declarations: [EraComponent],
                    providers: [EraService]
                })
                    .overrideTemplate(EraComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(EraComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EraService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Era(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.eras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
