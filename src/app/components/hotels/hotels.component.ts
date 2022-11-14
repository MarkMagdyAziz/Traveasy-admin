import { Component, OnInit, ViewChild } from '@angular/core';
import { Ihotel } from 'src/app/interfaces/ihotel';
import { HotelsService } from 'src/app/services/hotels.service';
import {  Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotelsList: Ihotel[] = []

  constructor(
    private hotelService : HotelsService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe((data: any) => {
      this.hotelsList = data;
      // if (this.hotelsList.length > 0) {
      //   this.producOrdereList = this.hotelsList[0].Prodeuct;
      // }
      console.log(this.hotelsList);
    });

  }


  handleEditBtn(id:any){
    this.hotelService.selectedID = id;

   let currentHotel = this.hotelsList.find((h)=> {return h._id === id})
   this.hotelService.selectedHotel = currentHotel;   
    console.log(    this.hotelService.selectedID)
    
    this.router.navigate(['/updhotel',id])

  }




  handleDelete(id:any){
    const observer = {
      next: () => {
        console.log('removed succesfully');
        this.hotelService.getHotels().subscribe((data: any) => {
          this.hotelsList = data;
        });
      },
      error: (err: Error) => alert(err.message),
    };
    this.hotelService.deleteHotel(id).subscribe(observer);
  }

}
