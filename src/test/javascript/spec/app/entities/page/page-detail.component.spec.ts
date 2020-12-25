import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { PageDetailComponent } from 'app/entities/page/page-detail.component';
import { Page } from 'app/shared/model/page.model';

describe('Component Tests', () => {
  describe('Page Management Detail Component', () => {
    let comp: PageDetailComponent;
    let fixture: ComponentFixture<PageDetailComponent>;
    const route = ({ data: of({ page: new Page(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestTestModule],
        declarations: [PageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load page on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.page).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
