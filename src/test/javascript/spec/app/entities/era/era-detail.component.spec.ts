/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DinosaursTestModule } from '../../../test.module';
import { EraDetailComponent } from '../../../../../../main/webapp/app/entities/era/era-detail.component';
import { EraService } from '../../../../../../main/webapp/app/entities/era/era.service';
import { Era } from '../../../../../../main/webapp/app/shared/model/era.model';

describe('Component Tests', () => {
    describe('Era Management Detail Component', () => {
        let comp: EraDetailComponent;
        let fixture: ComponentFixture<EraDetailComponent>;
        let service: EraService;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [DinosaursTestModule],
                    declarations: [EraDetailComponent],
                    providers: [EraService]
                })
                    .overrideTemplate(EraDetailComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(EraDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EraService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Era(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.era).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
