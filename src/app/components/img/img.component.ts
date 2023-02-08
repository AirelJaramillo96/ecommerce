import {Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = './assets/images/descarga.png';

  constructor() {
    //before render
    //Not run async code here (like http request)  In vue.js is like created()
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges() {
    //before render
    // inputs changed in vue.js is like watch
    console.log('ngOnChanges', 'imgValue =>', this.img)
  }

  ngOnInit(): void {
    //before render
    //Can run async code here (like http request) In vue.js is like created() this run once time
    console.log('ngOnInit', 'imgValue =>', this.img);
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
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('img loaded');
    this.loaded.emit(this.img);
  }
}
