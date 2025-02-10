export class CreateUserDto {
  userType: string;
  username: string;
  email: string;
  password: string;
  cfpassword: string;
  activeStatus: boolean;
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string;
  lastNameEn: string;
  phoneNumber: string;
  masterPositionId: number;
  departmentId: string;
  dataModule: string;
  organizeId: string;
  groupList: string[];
  ownerGroupId: string;
  ldapQuery?: string;
  startWork?: Date;
}

export class CreateUserId24Dto {
  username: string;
  email: string;
  group: string[];
  active: boolean;
  type: string;
  phone: string;
  ldapQuery: string;
}
