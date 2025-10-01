import { Injectable } from '@angular/core';
import { UserRole } from '../Shared/Enums/UserRole/UserRole';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  role: number;

  constructor() {}

  set(role: UserRole) {
    this.role = Number(role);
  }

  get(): number {
    return this.role;
  }
}
