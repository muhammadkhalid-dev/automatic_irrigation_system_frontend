import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IrrigationSystemService } from 'src/app/services/irrigation-system.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-save-plot-modal',
  templateUrl: './save-plot-modal.component.html',
  styleUrls: ['./save-plot-modal.component.scss'],
  preserveWhitespaces: true
})
export class SavePlotModalComponent implements OnInit {
  @Input() plot: any = {};
  @Input() mode: any = '';
  @Output() submitChangesEvent: EventEmitter<any> = new EventEmitter<any>();

  crops: any[] = [];

  plotForm: FormGroup = new FormGroup({
    location: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    ownerName: new FormControl('', Validators.required),
    crop: new FormControl('', Validators.required),
    irrigationRate: new FormControl('', Validators.required),
    waterAmount: new FormControl('', Validators.required)
  });
  submitted: boolean = false;

  constructor(
    private irrigationSystemService: IrrigationSystemService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.irrigationSystemService.getCrops().subscribe({
      next: (plots) => {
        this.crops = plots;
      },
      error: (e) => console.error(e)
    });

    if (this.mode === 'edit') {
      let currentPlotConfiguration = this.plot.plotConfigurations.filter(
        (plotConfiguration: any) => {
          return plotConfiguration.currentConfig == true;
        }
      )[0];
      this.plotForm.controls['location'].setValue(this.plot.location);
      this.plotForm.controls['area'].setValue(this.plot.area);
      this.plotForm.controls['ownerName'].setValue(this.plot.ownerName);
      this.plotForm.controls['crop'].setValue(currentPlotConfiguration.crop);
      this.plotForm.controls['irrigationRate'].setValue(
        currentPlotConfiguration.irrigationRate
      );
      this.plotForm.controls['waterAmount'].setValue(
        currentPlotConfiguration.waterAmount
      );
    } else {
      this.plotForm.controls['location'].reset();
      this.plotForm.controls['area'].setValue(1);
      this.plotForm.controls['ownerName'].reset();
      this.plotForm.controls['crop'].reset();
      this.plotForm.controls['irrigationRate'].setValue(5);
      this.plotForm.controls['waterAmount'].setValue(1);
    }
  }

  get f() {
    return this.plotForm.controls;
  }

  compareWithCrops(item: any, selected: any) {
    return item?.id === selected?.id;
  }

  loadCropRecommondations() {
    this.plotForm.controls['irrigationRate'].setValue(
      this.plotForm.value.crop.irrigationRate
    );
  }

  onSubmit() {
    this.submitted = true;
    if (!this.plotForm.invalid) {
      let plot: any = {
        location: this.plotForm.value.location,
        area: this.plotForm.value.area,
        ownerName: this.plotForm.value.ownerName,
        plotConfiguration: {
          cropId: this.plotForm.value.crop.id,
          irrigationRate: this.plotForm.value.irrigationRate,
          waterAmount: this.plotForm.value.waterAmount
        }
      };
      console.log(plot);
      this.submitChangesEvent.emit({ plot: plot });
    } else {
      console.log(this.plotForm.invalid);
      console.log(this.plotForm);
      return;
    }
  }
}
