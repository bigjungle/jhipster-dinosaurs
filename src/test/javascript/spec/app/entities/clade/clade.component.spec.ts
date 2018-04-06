/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DinosaursTestModule } from '../../../test.module';
import { CladeComponent } from '../../../../../../main/webapp/app/entities/clade/clade.component';
import { CladeService } from '../../../../../../main/webapp/app/entities/clade/clade.service';
import { Clade } from '../../../../../../main/webapp/app/entities/clade/clade.model';

describe('Component Tests', () => {

    describe('Clade Management Component', () => {
        let comp: CladeComponent;
        let fixture: ComponentFixture<CladeComponent>;
        let service: CladeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DinosaursTestModule],
                declarations: [CladeComponent],
                providers: [
                    CladeService
                ]
            })
            .overrideTemplate(CladeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CladeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CladeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Clade(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clades[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
