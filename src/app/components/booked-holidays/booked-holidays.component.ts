import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IBHoliday } from 'src/app/interfaces/ibholiday';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-booked-holidays',
  templateUrl: './booked-holidays.component.html',
  styleUrls: ['./booked-holidays.component.scss']
})
export class BookedHolidaysComponent implements OnInit {

  bookedList:IBHoliday[]= []
  // @ViewChild('form') form!: NgForm
  form: FormGroup ;

  isDisabled:boolean =true;
  editMode: boolean = false;
  
  currentHolidayId: string = '';

  constructor(
    private holidayService : HolidayService,
    private fb : FormBuilder

  ) { 
    this.form = this.fb.group({
      roomCount:new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ],
      ),
      adultCount:new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ],
      ),
      child:new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ],
      ), 
      isApprove:new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      startDate:new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      endDate:new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      period:new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]
      ),
     
      holidays:new FormControl('', [
        Validators.required,
      ]
      ),
      tourist:new FormControl('', [
        Validators.required,
      ]
      ),
      // guide:new FormControl('', [
      //   Validators.required,
      // ]
      // ),
    });
  }

  ngOnInit(): void {
    this.holidayService.getBookedHolodays().subscribe((data: any) => {
      this.bookedList = data;
    });
  }




handleSubmit(holiday: any) {
  if(this.form.valid){

    console.log("valid");

    if (this.editMode) {    
    this.holidayService.updateBookedHolodays(this.currentHolidayId, holiday).subscribe();
    alert('booked holiday data updated ')
  }
  
}
  else{
    console.log('not valid: ' + this.form.valid);
  }

}


handleEditBtn(id: any) {

  this.currentHolidayId = id;
  let currentHoloday = this.bookedList.find((holiday:any) => { return holiday._id === id })
  this.form.patchValue({
    roomCount  : currentHoloday?.RoomCount,    
  adultCount : currentHoloday?.AdultCount ,
  child : currentHoloday?.Child,
  period : currentHoloday?.Period,
  isApprove : currentHoloday?.IsApprove ,
  startDate: currentHoloday?.startDate,
  endDate: currentHoloday?.endDate,
  holidays : currentHoloday?.Holidays,
  tourist :currentHoloday?.Tourist,
  // guide :currentHoloday?.Guide
  })
  console.log(this.form);

  this.editMode = true;


}




handleDelete(id: any) {
  const observer = {
    next: () => {
     alert('removed succesfully');
      this.holidayService.getBookedHolodays().subscribe((data: any) => {
        this.bookedList = data;
      });
    },
    error: (err: Error) => alert(err.message),
  };
  this.holidayService.deleteBookedHolodays(id).subscribe(observer);
}


}