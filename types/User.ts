export interface UserUI {
  displayName: string;
  email: string;
  phoneNumber: null | string;
  photoURL: string;
  uid: string;
}

export interface UserPhoto {
  name: string;
  url: string;
}
export interface UserProfile {
  aboutYourSelf: string;
  country: string;
  email: string;
  fullName: string;
  isEmailExist: boolean;
  isPhoneExist: string;
  mainPhoto: UserPhoto;
  phoneNumber: string;
  position: string;
  publicName: string;
}
