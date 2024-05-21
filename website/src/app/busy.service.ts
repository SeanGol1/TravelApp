import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount= 0

  constructor(private spinnerService:NgxSpinnerService) { };
  

  busy(){
    this.busyRequestCount ++;

    this.spinnerService.show(undefined, {
      type: "pacman",
      size: "large",
      bdColor: "rgba(0, 0, 0, 0)",
      color: "black",
      fullScreen: true,
      template:
        "<img style='margin:10%;' src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
    });

    // this.spinnerService.show(undefined,{
    //   type: 'pacman',
    //   bdColor: 'rgba(255,255,255,0)',
    //   color: '#000',
    //   template:
    //     "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
    // })
  }

  

  idle(){
    this.busyRequestCount --;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
