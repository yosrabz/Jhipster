import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPage, Page } from 'app/shared/model/page.model';
import { PageService } from './page.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';

@Component({
  selector: 'jhi-page-update',
  templateUrl: './page-update.component.html',
})
export class PageUpdateComponent implements OnInit {
  isSaving = false;
  books: IBook[] = [];

  editForm = this.fb.group({
    id: [],
    numero: [],
    contenu: [],
    book: [],
  });

  constructor(
    protected pageService: PageService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ page }) => {
      this.updateForm(page);

      this.bookService.query().subscribe((res: HttpResponse<IBook[]>) => (this.books = res.body || []));
    });
  }

  updateForm(page: IPage): void {
    this.editForm.patchValue({
      id: page.id,
      numero: page.numero,
      contenu: page.contenu,
      book: page.book,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const page = this.createFromForm();
    if (page.id !== undefined) {
      this.subscribeToSaveResponse(this.pageService.update(page));
    } else {
      this.subscribeToSaveResponse(this.pageService.create(page));
    }
  }

  private createFromForm(): IPage {
    return {
      ...new Page(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      contenu: this.editForm.get(['contenu'])!.value,
      book: this.editForm.get(['book'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPage>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBook): any {
    return item.id;
  }
}
