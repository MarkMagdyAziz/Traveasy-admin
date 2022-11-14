import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ihotel } from 'src/app/interfaces/ihotel';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent implements OnInit {

  // editMode:boolean =false;
  // @ViewChild('hotelForm') form: NgForm =this.hotelService.selectedHotel;

  isEdit:any ;
  constructor(
    private hotelService : HotelsService,

  ) { 

    // this.form.setValue({city: this.hotelService.selectedHotel.city})

  }

  ngOnInit(): void {

    // console.log(this.form);
    
  }

  handleSubmit(hotel:Ihotel){
console.log(hotel)
this.hotelService.postHotel(hotel).subscribe((data: any) => {

  console.log(data);

});
  }
}
