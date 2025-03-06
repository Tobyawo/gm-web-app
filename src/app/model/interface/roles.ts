import { User2 } from "../class/User2";

export interface IRoles {

      roleId: number,
      role: string
}


export interface APIResponse {
      message: string,
      result: boolean,
      data: any;

}



export interface IDesignationModel {

      designationId: number,
      designation: string

}

export interface LoginResponse {
      code: number
      description: string
      loggedInUser: LoggedInUser
      token: string
    }



    export interface NewUserResponse {
      code: number
      description: string
      user: any  
    }

export interface UserResponse {
      content: User2[]
      pageable: any
      totalPages: number
      totalElements: number
      last: boolean
      size: number
      number: number
      sort: any
      numberOfElements: number
      first: boolean
      empty: boolean

    }
    
    export interface LoggedInUser {
      email: string
      firstName: string
      lastName: string
      photos: any
      enabled: boolean
      roles: string[]
    }
