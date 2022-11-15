import { Component, OnInit, ViewChild } from '@angular/core';
import { Ihotel } from 'src/app/interfaces/ihotel';
import { HotelsService } from 'src/app/services/hotels.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotelsList: Ihotel[] = []
  // @ViewChild('hotelForm') form!: NgForm

 form!: FormGroup

  editMode: boolean = false;
  postMode: boolean = false;
  currentHotelId: string = '';


  constructor(
    private hotelService: HotelsService,
    private router: Router,
    private fb : FormBuilder

  ) {

    this.form = this.fb.group({
      hotelName:new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ),
      city:new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ),
      img:new FormControl('',[Validators.required]),

      evaluation:
      ['', [
        Validators.required,
        Validators.min(0),
        Validators.max(5)]
      ],
      period:new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]
      ),
      description:new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ),
      lat:new FormControl('', [
        Validators.required,
        ]
      ),
      lon:new FormControl('', [
        Validators.required,
       ]
      ),
      price:new FormControl('', [
        Validators.required,
        Validators.min(0),]
      ),
    });
  }

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe((data: any) => {
      this.hotelsList = data;
    });

  }
  showForm() {
    this.postMode = true;
  }

  handleSubmit(hotel: any) {
    if(this.form.valid){
      console.log("valid");
      
    if (this.editMode) {
      this.hotelService.updateHotel(this.currentHotelId, hotel).subscribe();
      alert('hotel data updated ')
    } else {
      this.hotelService.postHotel(hotel).subscribe((data: any) => {
        alert('new hotel added ')
  
      })
    }}else{
      console.log('not valid' );
      
    }

  }

  handleEditBtn(id: any) {

    this.currentHotelId = id;
    let currentHotel = this.hotelsList.find((hotel) => { return hotel._id === id })
    this.form.setValue({
      hotelName: currentHotel?.HotelName,
      city: currentHotel?.City,
      evaluation: currentHotel?.Evaluation,
      img: currentHotel?.ImgURL,
      period: currentHotel?.Period,
      description: currentHotel?.Description,
      lat: currentHotel?.lat,
      lon: currentHotel?.lon,
      price: currentHotel?.Price

    })
    console.log(this.form);

    this.editMode = true;


  }




  handleDelete(id: any) {
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
