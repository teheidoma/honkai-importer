import {EventEmitter, Injectable, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {ParseResponseDTO} from "../model/ParseResponseDTO";
import {ParseEvent} from "../model/event/ParseEvent";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Pull} from "../model/Pull";
import {catchError, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {TimeRange} from "../model/TimeRange";
import {TimeRangeEvent} from "../model/event/TimeRangeEvent";


const {electronAPI} = window as any;


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public newPulls = new EventEmitter<ParseEvent>();
  public newRanges = new EventEmitter<TimeRangeEvent>();

  constructor(private httpClient: HttpClient) {
  }

  init(): void {
    console.log('init')
    if (electronAPI != null) {
      electronAPI.onParse((_event: any, data: string) => {
        let response = JSON.parse(data) as ParseResponseDTO
        console.log(response)
        console.log(response.success)
        if (response.success) {
          localStorage.setItem('uid', response.uid!.toString());
          localStorage.setItem('secret', response.secret!)
          this.getPulls()
          Swal.fire("success")
        } else {
          Swal.fire("error upload file")
        }
      })
    }
  }

  public getPulls() {
    console.log("get pulls")
    let secret = localStorage.getItem('secret');
    if (secret != null) {
      this.httpClient.get<Pull[]>(environment.apiUrl + '/pulls/all?secret=' + secret)
        .pipe(catchError(this.handleError))
        .subscribe(pulls => {
          console.log(pulls)
          this.newPulls.emit({
            pulls: pulls
          })
          localStorage.setItem('lastGacha', JSON.stringify(pulls))
        })
    }
  }

  public getTime() {
    console.log("get time")
    let secret = localStorage.getItem('secret');
    this.httpClient.get<TimeRange[]>(environment.apiUrl + "/time?secret="+secret)
      .pipe(catchError(this.handleError))
      .subscribe(ranges => {
        this.newRanges.emit({
          ranges: ranges
        })
        localStorage.setItem('ranges', JSON.stringify(ranges));
      })
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
