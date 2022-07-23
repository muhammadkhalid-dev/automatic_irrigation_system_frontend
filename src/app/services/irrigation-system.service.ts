import { catchError, map } from 'rxjs/operators';
import { lastValueFrom, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IrrigationSystemService {
  constructor(private http: HttpClient) {}

  getPlots() {
    const url = `${environment.baseURL}${constants.API.GET_PLOTS_API}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  getPlot(plotId: string) {
    const url = `${environment.baseURL}${constants.API.GET_PLOT_API}`;
    return this.http.get(url.replace('{plotId}', plotId)).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  getCrops() {
    const url = `${environment.baseURL}${constants.API.GET_CROPS_API}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  async addPlot(plot: any): Promise<any> {
    const url = environment.baseURL + constants.API.ADD_PLOT_API;
    let res: any = await lastValueFrom(this.http.post(url, plot));
    return res;
  }

  async editPlot(plotId: any, plot: any): Promise<any> {
    const url =
      environment.baseURL +
      constants.API.EDIT_PLOT_API.replace('{plotId}', plotId);
    await lastValueFrom(this.http.patch(url, plot));
  }
}
