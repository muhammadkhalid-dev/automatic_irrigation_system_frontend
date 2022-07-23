import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';
import { NgModule } from '@angular/core';
import { SavePlotModalComponent } from './save-plot-modal/save-plot-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent
  }
];

@NgModule({
  declarations: [DetailsComponent, SavePlotModalComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class DetailsModule {}
