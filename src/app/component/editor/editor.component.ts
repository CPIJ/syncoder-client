import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  content: string

  constructor() { }

  ngOnInit() {
  }

  onChange(code) {
    console.log(code);
    
  }

}
