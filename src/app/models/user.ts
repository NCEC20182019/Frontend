import {IRole} from "./irole";

export class User {
  id: number;
  username: string;
  email: string;
  roles: IRole[]
}
