import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { IBHotel } from 'src/app/interfaces/ibhotel';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-booked-hotels',
  templateUrl: './booked-hotels.component.html',
  styleUrls: ['./booked-hotels.component.scss']
})
export class BookedHotelsComponent implements OnInit,OnChanges {

  
   bookedList:IBHotel[]= []
  @ViewChild('form') form!: NgForm

//  form!: FormGroup

  editMode: boolean = false;
  // postMode: boolean = false;
  currentHotelId: string = '';

  constructor(
    private hotelService: HotelsService,
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
    this.hotelService.getBookedHotels().subscribe((data: any) => {
      this.bookedList = data;

    });
    
  }
  ngOnChanges(){

    // this.hotelService.getBookedHotels().subscribe((data: any) => {
    //   this.bookedList = data;

    // });

    // ********************************

    // function handleSubmit(hotel: any) {     
    //   if (this.editMode) {
    //     this.hotelService.updateBookedHotels(this.currentHotelId, hotel).subscribe();
    //     alert('hotel data updated ')
    //   }
    // }

  }



  // showForm() {
  //   this.postMode = true;
  // }



  handleSubmit(hotel: any) {
    // if(this.form.valid){
    //   console.log("valid");
      
    if (this.editMode) {
      this.hotelService.updateBookedHotels(this.currentHotelId, hotel).subscribe();
      alert('hotel data updated ')
    }
    //  else {
    //   this.hotelService.postHotel(hotel).subscribe((data: any) => {
    //     alert('new hotel added ')
    //   })
    // }

    // else{
    //   console.log('not valid' );
      
    // }

  }
 

  handleEditBtn(id: any) {

    this.currentHotelId = id;
    let currentHotel = this.bookedList.find((hotel:any) => { return hotel._id === id })
    this.form.setValue({
      roomCount  : currentHotel?.RoomCount,    
    adultCount : currentHotel?.AdultCount ,
    child : currentHotel?.Child,
    period : currentHotel?.Period,
    single : currentHotel?.Single,
    double : currentHotel?.Double,
    isApprove : currentHotel?.IsApprove ,
    startDate: currentHotel?.startDate,
    endDate: currentHotel?.endDate,
    hotels : currentHotel?.Hotels,
    tourist :currentHotel?.Tourist,
    // guide :currentHotel?.Guide
    })

    this.editMode = true;


  }




  handleDelete(id: any) {
    const observer = {
      next: () => {
       alert('removed succesfully');
        this.hotelService.getBookedHotels().subscribe((data: any) => {
          this.bookedList = data;
        });
      },
      error: (err: Error) => alert(err.message),
    };
    this.hotelService.deleteBookedHotels(id).subscribe(observer);
  }

}
