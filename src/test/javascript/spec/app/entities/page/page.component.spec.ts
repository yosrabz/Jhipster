import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestTestModule } from '../../../test.module';
import { PageComponent } from 'app/entities/page/page.component';
import { PageService } from 'app/entities/page/page.service';
import { Page } from 'app/shared/model/page.model';

describe('Component Tests', () => {
  describe('Page Management Component', () => {
    let comp: PageComponent;
    let fixture: ComponentFixture<PageComponent>;
    let service: PageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestTestModule],
        declarations: [PageComponent],
      })
        .overrideTemplate(PageComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PageComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PageService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Page(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pages && comp.pages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
