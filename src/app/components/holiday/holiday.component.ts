import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Icity } from 'src/app/interfaces/icity';
import { Iholiday } from 'src/app/interfaces/iholiday';
import { HolidayService } from 'src/app/services/holiday.service';
import { HotelsService } from 'src/app/services/hotels.service';
import { NotificationService } from 'src/app/services/notification.service';

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
  cities :Icity[]=[];


  // @ViewChild('holidayForm') form!: NgForm
  holidayForm: FormGroup ;

  constructor(
    private holidayService : HolidayService,
    private notifyService : NotificationService,
    private hotelService: HotelsService,
    private fb : FormBuilder

  ) { 

    this.holidayForm = this.fb.group({
   
      city:new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      description:new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ),
      img:new FormControl(
        '',[Validators.required]
        ),

      evaluation:
      new FormControl ( ['', [
        Validators.required,
        Validators.min(0),
        // ************************************************************************************************
        Validators.max(5)]
      ]),
      period:new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]
      ),
      price:new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]
      ),
      // guide:new FormControl('', [
      //   Validators.required,
      // ]
      // ),
    });
  }

  ngOnInit(): void {
    this.holidayService.getHolodays().subscribe((data: any) => {
      this.holidaysList = data;
    });

    this.hotelService.getCities().subscribe((data: any) => {
      this.cities = data;
      
    });
  }

  showForm() {
    this.postMode = true;
  }

  handleSubmit(holiday: any) {
   
    if(this.holidayForm.valid){
      console.log("valid");
    if (this.editMode) {
      
      this.holidayService.updateHoliday(this.currentHolidayID, holiday)
      .subscribe((data: any) => {
        this.notifyService.showSuccess("holiday updated successfully !!", "Notification")
      })
    } else {
      this.holidayService.postHoliday(holiday).subscribe((data: any) => {
        this.notifyService.showSuccess("holiday added successfully !!", "Notification")

      })
    }
  }else{
    console.log('not valid: ')

  }

  }


  handleEditBtn(id: any) {

    this.currentHolidayID = id;
    console.log(this.currentHolidayID);
    
    let currentHoliday = this.holidaysList.find((holiday) => { return holiday._id === id })
    this.holidayForm.patchValue({
      city: currentHoliday?.City,
      evaluation: currentHoliday?.Evaluation,
      img: currentHoliday?.ImgURL,
      period: currentHoliday?.Period,
      description: currentHoliday?.Description,
      price: currentHoliday?.Price,
      // guide: currentHoliday?.Guide

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
