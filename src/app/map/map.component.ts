import { UserService } from 'src/app/profile/user-services/user.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { userLocation } from './find-book/find-book.component';
import { LatAndLng } from './map-models/MapInfo';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public name: any;
  public origin: any;
  public destination: any;
  public lat;
  public lng;
  public selectedMarker;
  public location: LatAndLng[];
  public markers = [];

  // trackMarkers(index: number, location: any) {
  //   return location ? location.lat : null
  // }

  constructor(private UserService: UserService) {}

  async ngOnInit() {
    const locationData = await this.UserService.getUserAddress();
    localStorage.setItem('locationData', JSON.stringify(locationData));
    this.lat = locationData.lat;
    this.lng = locationData.lng;
    this.addMarker(this.lat, this.lng);
  }

  addMarker(lat: number, lng: number) {
    this.markers.push({
      lat: lat,
      lng: lng,
      alpha: 1
    });
  }
  // Related to the rectangle property in the html
  // max(coordType: 'lat' | 'lng'): number {
  //   return Math.max(...this.markers.map(marker => marker[coordType]));
  // }

  // min(coordType: 'lat' | 'lng'): number {
  //   return Math.min(...this.markers.map(marker => marker[coordType]));
  // }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
    console.log(this.markers);
    this.markers = [];
    for (let location of userLocation){
      this.addMarker(location.lat, location.lng);
    }
    console.log(this.markers);
    // console.log(userLocation[0].lat)
    // console.log(userLocation[0].lng)
  }

  async populateMap() {
    this.location = userLocation;
  }

}
