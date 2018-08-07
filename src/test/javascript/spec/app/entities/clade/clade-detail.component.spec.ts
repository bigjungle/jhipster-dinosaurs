/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DinosaursTestModule } from '../../../test.module';
import { CladeDetailComponent } from '../../../../../../main/webapp/app/entities/clade/clade-detail.component';
import { CladeService } from '../../../../../../main/webapp/app/entities/clade/clade.service';
import { Clade } from '../../../../../../main/webapp/app/shared/model/clade.model';

describe('Component Tests', () => {
    describe('Clade Management Detail Component', () => {
        let comp: CladeDetailComponent;
        let fixture: ComponentFixture<CladeDetailComponent>;
        let service: CladeService;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [DinosaursTestModule],
                    declarations: [CladeDetailComponent],
                    providers: [CladeService]
                })
                    .overrideTemplate(CladeDetailComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(CladeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CladeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Clade(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clade).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
