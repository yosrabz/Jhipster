import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPage } from 'app/shared/model/page.model';
import { PageService } from './page.service';

@Component({
  templateUrl: './page-delete-dialog.component.html',
})
export class PageDeleteDialogComponent {
  page?: IPage;

  constructor(protected pageService: PageService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pageListModification');
      this.activeModal.close();
    });
  }
}
