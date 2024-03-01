import { Injectable } from '@angular/core';
import { Constant } from '../constants/constants';
import { AesService } from './aes.service';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  constructor(private aes: AesService) { }

  public getUserId() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let userid = rawid.user ? rawid.user?.id: rawid.school?.id
      return userid
    } else
      return 0

  }

  public getUserEmail() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let email = rawid.user ? rawid.user?.email : rawid.school?.email
      return email
    } else
      return ''
  }

  public getUserFirstName() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user?.first_name ? rawid.user?.first_name : rawid.user?.school_name
      return name
    } else
      return ''
  }

  public getUserLastName() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user?.last_name
      return name
    } else
      return ''
  }

  public getUserName() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.username : rawid.school?.username
      return name
    } else
      return ''
  }

  public getUserCountry() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.country : rawid.school?.country
      return name
    } else
      return ''
  }

  public getInstitutionType() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.school?.institution_type
      return name
    } else
      return 0
  }

  public getUserPhone() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user?.phone_number
      return name
    } else
      return ''
  }

  public getSchoolPhone1() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.school?.phone_number1
      return name
    } else
      return ''
  }

  public getSchoolPhone2() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.school?.phone_number2
      return name
    } else
      return ''
  }

  public getUserBio() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.bio : rawid.school?.bio
      return name
    } else
      return ''
  }

  public setUserBio(bio: string) {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      rawid.user.bio = bio
      this.saveToStore(Constant.USER, rawid)
    } 
  }

  public setPhone1(phone: string) {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      rawid.user.phone_number1 = phone
      this.saveToStore(Constant.USER, rawid)
    } 
  }

  public setPhone2(phone: string) {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      rawid.user.phone_number2 = phone
      this.saveToStore(Constant.USER, rawid)
    } 
  }

  public setPhoneNumber(phone: string) {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      rawid.user.phone_number = phone
      this.saveToStore(Constant.USER, rawid)
    } 
  }

  public getAllCurrentRole() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid?.role) {
        let name = rawid.role
        return name
    } else
      return ''
  }

  public getUserCurrentRole() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      if(rawid.roles?.length > 0 ){
        let name = rawid.roles[0].role_name 
        return name
      }else{
        let name = rawid.user ? rawid.user?.current_role : rawid.school?.current_role
        return name
      }
    } else
      return ''
  }

  public getUserCurrentEmployer() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.current_employer : rawid.school?.current_employer
      return name
    } else
      return ''
  }

  public getSchoolId() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.employer_id ? rawid.employer_id : 0
      return name
    } else
      return ''
  }

  public getUserStatus() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.status : rawid.school?.status
      return name
    } else
      return ''
  }

  public getUserInterests() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid?.interests
      return name
    } else
      return []
  }

  public setUserInterests(interest: any) {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      rawid.interests = interest
      this.saveToStore(Constant.USER, rawid)
    } 
  }

  public getVerifiedStatus() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.verified : rawid.school?.verified
      return name
    } else
      return 0
  }

  public getUserType() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.user_type : rawid.school?.user_type
      return name
    } else
      return 0
  }

  public onboardedStatus() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let onboard = rawid.user.onboarded ? rawid.user?.onboarded : rawid.school?.onboarded
      return onboard
    } else
      return false
  }

  public getUserProfileImage() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.profile_img : rawid.school?.profile_img
      return name
    } else
      return ''
  }

  public getUserOthername() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.other_name : rawid.school?.other_name 
      return name
    } else
      return ''
  }

  public getUserAddress() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.address : rawid.school?.address 
      return name
    } else
      return ''
  }

  public getUserGender() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.gender : rawid.school?.gender
      return name
    } else
      return ''
  }

  public setUserProfileImage(pic: string) {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      rawid.user.profile_img = pic
      this.saveToStore(Constant.USER, rawid)
    }
  }

  public getUserHeaderImage() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let name = rawid.user ? rawid.user?.cover_img : rawid.school?.cover_img
      return name
    } else
      return ''
  }

  public setUserHeaderImage(pic: string) {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      rawid.user.cover_img = pic
      this.saveToStore(Constant.USER, rawid)
    } 
  }

  public getUserToken() {
    let rawid = this.getFromStore(Constant.USER);
    if (rawid) {
      let token = rawid.token
      
      return token
    } else
      return ''
  }

  public formatJSON(val: string) {
    return JSON.parse(val)
  }


  public saveToStore(key: string, data: any) {
    // let encrypt = this.aes.encrypt(JSON.stringify(data));
    // localStorage.setItem(key, encrypt);
    
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeFromStore(key: string) {
    localStorage.removeItem(key)
  }

  public getFromStore(key: string) {
    let store: any = localStorage.getItem(key);
    return JSON.parse(store)

    // if(store){
    //   let decrypt = this.aes.decrypt(store)
    //   return JSON.parse(decrypt)
    // }
  }

}
