import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPage } from 'app/shared/model/page.model';
import { PageService } from './page.service';
import { PageDeleteDialogComponent } from './page-delete-dialog.component';

@Component({
  selector: 'jhi-page',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit, OnDestroy {
  pages?: IPage[];
  eventSubscriber?: Subscription;

  constructor(protected pageService: PageService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.pageService.query().subscribe((res: HttpResponse<IPage[]>) => (this.pages = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPage): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPages(): void {
    this.eventSubscriber = this.eventManager.subscribe('pageListModification', () => this.loadAll());
  }

  delete(page: IPage): void {
    const modalRef = this.modalService.open(PageDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.page = page;
  }
}
