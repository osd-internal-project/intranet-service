export class CreateUserDto {
  userType: string;
  username: string;
  email: string;
  activeStatus: boolean;
  password: string;
  cfpassword: string;
  firstNameTh: string;
  lastNameTh: string;
  phoneNumber: string;
  masterPositionId: number;
  ldapQuery?: string;
  dataModule: string;
  masterDataModule: string;
  groupOwnerId: string;
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
