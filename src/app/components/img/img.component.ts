import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string = 'https://www.w3schools.com/howto/img_avatar.png';
  constructor() { }

  ngOnInit(): void {
  }

}
