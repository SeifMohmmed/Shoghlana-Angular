import { Injectable } from '@angular/core';
import { UserRole } from '../Shared/Enums/UserRole/UserRole';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  role: number | null;

  constructor() {}

  set(role: UserRole | null) {
    this.role = Number(role);
  }

  get(): number | null {
    return this.role;
  }
}
