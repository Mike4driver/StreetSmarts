import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Axios from 'axios';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    userUrl = 'https://afu8lhb2z7.execute-api.us-east-1.amazonaws.com/dev/user/profile';
    addressUrl = 'https://afu8lhb2z7.execute-api.us-east-1.amazonaws.com/dev/user/address';
    locationUrl = 'https://afu8lhb2z7.execute-api.us-east-1.amazonaws.com/dev/user/location';

    constructor (private http: HttpClient) { }
  // GET
  // /user/profile
  //   - return Signed it user
  // /user/profile/{userID}
  //   - returns user by userid
  public userProfileUrl = 'user/profile';
  // POST
  // /user/checkout/{userID}
  //   - send {book}
  //   - get back message saying it completed
  public userCheckoutUrl = 'user/checkout';

    async addUserAddress(locationObject) {
        //  const config = {
        //   headers: {
        //     'Authorization': 'bearer ' + await localStorage.getItem('bToken')
        //   }
        // };
        await Axios.post(this.addressUrl, locationObject);
    }

    async getUserAddress() {
      const result = await Axios.get(this.locationUrl);
      return result.data;
    }

    async getUserProfile() {
        const config = {
          headers: {
            'Authorization': 'bearer ' + await localStorage.getItem('bToken')
          }
        };
        const bodyParameters = {
          key: 'value'
        };
        try {
          const response = await Axios.get(this.userUrl, config);
          console.log(response);

        } catch (e) {
          console.log(e);
        }
      }


}
  // async getUserByID (userID: number) {

  // }
  // //Check out a user's book to another user.
  // async checkoutBook() {

  // }
  // //Return a book that was checked out
  // async returnCheckoutBook() {
  //   //TODO
  // }
// }
