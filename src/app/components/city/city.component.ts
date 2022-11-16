import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Icity } from 'src/app/interfaces/icity';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  cityList: Icity[] =[];
  postMode: boolean = false;
  currentHolidayID: string = '';


  @ViewChild('form') form!: NgForm
  constructor(
    private hotelService: HotelsService,

  ) { }

  ngOnInit(): void {
    this.hotelService.getCities().subscribe((data: any) => {
      this.cityList = data;
      console.log(  this.cityList);
      
    });
  }


  showForm() {
    this.postMode = true;
  }

  handleSubmit(city: any) {     
  
      this.hotelService.postCities(city).subscribe((data: any) => {
        alert('new hotel added ')
console.log(city);

  })
}


handleDelete(id: any) {
  const observer = {
    next: () => {
      alert('removed succesfully');
      this.hotelService.getHotels().subscribe((data: any) => {
        this.cityList = data;
      });
    },
    error: (err: Error) => alert(err.message),
  };
  this.hotelService.deleteCity(id).subscribe(observer);
}
}
