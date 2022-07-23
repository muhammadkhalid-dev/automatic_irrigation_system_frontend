import { Component, OnInit } from '@angular/core';
import { IrrigationSystemService } from 'src/app/services/irrigation-system.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Plot } from 'src/app/models/plot.model';
import { Router } from '@angular/router';
import { SavePlotModalComponent } from '../details/save-plot-modal/save-plot-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  preserveWhitespaces: true
})
export class HomeComponent implements OnInit {
  plots: any[] = [];

  constructor(
    private irrigationSystemService: IrrigationSystemService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadPlots();
  }

  loadPlots() {
    this.irrigationSystemService.getPlots().subscribe({
      next: (plots) => {
        this.plots = plots;
      },
      error: (e) => console.error(e)
    });
  }

  openPlotDetails(plot: Plot) {
    this.router.navigate([`details/${plot.id}`]);
  }

  async addPlot() {
    const modalRef = this.modalService.open(SavePlotModalComponent, {
      centered: true,
      size: 'lg'
    });

    modalRef.componentInstance.mode = 'add';
    modalRef.componentInstance.submitChangesEvent.subscribe(
      async (data: any) => {
        try {
          await this.irrigationSystemService.addPlot(data.plot);
          this.loadPlots();
          modalRef.close();
        } catch (e) {
          console.log(e);
        }
      }
    );
  }
}
