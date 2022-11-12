import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';


interface SlideBarToggle{
  screenWidth : number;
  collapsed:boolean;
 }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'traveasy-client';

  isSlideBarCollapsed= false;
  screenWidth=0;
  onToggleSlideBar(data:SlideBarToggle):void{
    this.isSlideBarCollapsed= data.collapsed;
    this.screenWidth=data.screenWidth;
    
  }
  ngOnInit(): void {
    AOS.init()
  }

}
