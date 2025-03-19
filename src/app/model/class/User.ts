export class User {
    // employeeId: number;
    // employeeName: string;
    // contactNo: string;
    // emailId: string;
    // deptId: number;
    // password: string;
    // gender: string;
    // role: string;

    empName: string;
    empId: number;
    empCode: string;
    empEmailId: string;
    empDesignation: string;
    role: string;
    mobile: string;
    password: string;
    gender: string;
    empContactNo: string;
    userName: string;

    constructor() {
        this.empName = '';
        this.empId = 0;
        this.empCode = '';
        this.empEmailId= '';
        this.empDesignation= '';
        this.role = '';
        this.mobile = '';
        this.password = '';
        this.gender = '';
        this.empContactNo = '';
        this.userName = '';
    }
  }