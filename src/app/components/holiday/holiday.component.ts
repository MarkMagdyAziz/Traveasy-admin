import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iholiday } from 'src/app/interfaces/iholiday';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  holidaysList: Iholiday[] = [];
  
  editMode: boolean = false;
  postMode: boolean = false;
  currentHolidayID: string = '';


  @ViewChild('holidayForm') form!: NgForm

  constructor(
    private holidayService : HolidayService
  ) { }

  ngOnInit(): void {
    this.holidayService.getHolodays().subscribe((data: any) => {
      this.holidaysList = data;
      console.log("holidays: "+this.holidaysList);
    });
  }

  showForm() {
    this.postMode = true;
  }

  handleSubmit(holiday: any) {
   
      
    if (this.editMode) {
      
      this.holidayService.updateHoliday(this.currentHolidayID, holiday)
      .subscribe((data: any) => {
        alert('holiday data updated ')
  
      })
    } else {
      this.holidayService.postHoliday(holiday).subscribe((data: any) => {
        alert('new holiday added ')
  
      })
    }

  }


  handleEditBtn(id: any) {

    this.currentHolidayID = id;
    console.log(this.currentHolidayID);
    
    let currentHoliday = this.holidaysList.find((holiday) => { return holiday._id === id })
    this.form.setValue({
      city: currentHoliday?.City,
      evaluation: currentHoliday?.Evaluation,
      img: currentHoliday?.ImgURL,
      period: currentHoliday?.Period,
      description: currentHoliday?.Description,
      price: currentHoliday?.Price,
      guide: currentHoliday?.Guide

    })

    this.editMode = true;


  }

  handleDelete(id:any){
    const observer = {
      next: () => {
     alert('removed succesfully');
        this.holidayService.getHolodays().subscribe((data: any) => {
          this.holidaysList = data;
        });
      },
      error: (err: Error) => alert(err.message),
    };
    this.holidayService.deleteHoliday(id).subscribe(observer);
  }

}
