import { Component, Output } from '@angular/core';
import { EventEmitter } from 'stream';
import { UserRole } from '../../Shared/Enums/UserRole/UserRole';
import { UserRoleService } from '../user-role.service';

@Component({
  selector: 'app-role-selection-popup',
  templateUrl: './role-selection-popup.component.html',
  styleUrl: './role-selection-popup.component.scss',
})
export class RoleSelectionPopupComponent {
  showModel: boolean = true;
  //@Output() RoleSelected: EventEmitter<string>;
  freelancer: UserRole = UserRole.Freelancer;
  client: UserRole = UserRole.Client;

  constructor(private userRoleService: UserRoleService) {}

  selectRole(selectedRole: UserRole) {
    console.log(selectedRole);
    this.userRoleService.set(selectedRole);
    console.log(this.userRoleService.get());
    this.showModel = false;
  }
}
