import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { PageUpdateComponent } from 'app/entities/page/page-update.component';
import { PageService } from 'app/entities/page/page.service';
import { Page } from 'app/shared/model/page.model';

describe('Component Tests', () => {
  describe('Page Management Update Component', () => {
    let comp: PageUpdateComponent;
    let fixture: ComponentFixture<PageUpdateComponent>;
    let service: PageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestTestModule],
        declarations: [PageUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Page(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Page();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
