import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  img = '';
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Input('img') set changeImg(newImg: string) {
    this.img = newImg;
  }
  @Output() loaded = new EventEmitter<string>();
  imgDefault = './assets/images/descarga.png';
  //counter = 0;
  counterFn: number | undefined;


  constructor() {
    //before render
    //Not run async code here (like http request)  In vue.js is like created()
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    //before render
    // inputs changed in vue.js is like watch
    console.log('ngOnChanges', 'imgValue =>', this.img)
    console.log('changes', changes);
  }

  ngOnInit(): void {
    //before render
    //Can run async code here (like http request) In vue.js is like created() this run once time
    console.log('ngOnInit', 'imgValue =>', this.img);
     /* this.counterFn = window.setInterval(() => {
      this.counter++;
      console.log('counter');
    }, 1000);
      */
  }

  ngAfterViewInit() {
    //after render
    //In vue.js is like mounted handler children components
    console.log('ngAfterViewInit', 'imgValue =>', this.img);
  }

  ngOnDestroy() {
    //delete component
    //In vue.js is like beforeDestroy
    console.log('ngOnDestroy', 'imgValue =>', this.img);
   // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('img loaded');
    this.loaded.emit(this.img);
  }
}
