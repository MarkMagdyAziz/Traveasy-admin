import { Component, OnInit } from '@angular/core';
import { Iholiday } from 'src/app/interfaces/iholiday';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss']
})
export class HolidayFormComponent implements OnInit {

  constructor(
    private holidayService: HolidayService,
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(holiday:Iholiday){
    console.log(holiday)
    this.holidayService.postHoliday(holiday)
    .subscribe((data: any) => {
    
      console.log(data);
    });
      }
}
