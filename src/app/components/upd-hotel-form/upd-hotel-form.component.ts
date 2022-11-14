import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Ihotel } from 'src/app/interfaces/ihotel';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-upd-hotel-form',
  templateUrl: './upd-hotel-form.component.html',
  styleUrls: ['./upd-hotel-form.component.scss']
})
export class UpdHotelFormComponent implements OnInit {
  id:any ;
  selectedHotel:any ;
  // @ViewChild('hotelForm') form: new Form ;

  constructor(
    private hotelService : HotelsService,

  ) {
    this.id = this.hotelService.selectedID;
    this.selectedHotel = this.hotelService.selectedHotel;
   }

  ngOnInit(): void {
  }

  handleSubmit(id:any,hotel:Ihotel){
    console.log("upd"+id,hotel)
    this.hotelService.updateHotel(id,hotel).subscribe((data: any) => {
      console.log(id, data);
    });
      }
}
