export interface UserDTO {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    idCard?: string;
    dateOfBirth?: string; 
    avatar?: string;
    roleId: number;
    roleName: string; 
    createdAt?: Date;
  }