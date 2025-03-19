export class User2 {

    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    photos: string;
    enabled: boolean;
    roles: any[];
    fullName: string;
    photosImagePath: string;
    phoneNumber: string;
    gender: string;

    constructor() {
        this.id = 0;
        this.email = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.photos = '';
        this.enabled = false;
        this.roles = [];
        this.fullName = '';
        this.photosImagePath = '';
        this.phoneNumber = '';
        this.gender = '';
    }


  }