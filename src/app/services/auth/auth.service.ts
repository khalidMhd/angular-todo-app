import { Injectable } from '@angular/core';
import { User, UserCredentials, UserList } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  //Public methods

  logout(): void {
    this.clearLoginUser();
    this.router.navigate(['/login']);
  }

  createUser(user: User): boolean {
    if (this.isUserEmailExists(user.email)) {
      alert('User already exists with this email');
      return false;
    }
    this.addUser(user);
    this.saveLoginUser({ name: user.name, email: user.email });
    this.router.navigate(['/']);
    return true;
  }

  loginUser(credentials: UserCredentials): boolean {
    const user = this.findUserByCredentials(credentials);
    if (user) {
      this.saveLoginUser({ name: user.name, email: user.email });
      this.router.navigate(['/']);
      return true;
    }
    alert('Invalid credentials');
    return false;
  }

  getLoginUser(): UserList {
    return this.retrieveLoginUser();
  }

  //Private methods

  private getUsers(): User[] {
    const usersString = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  private isUserEmailExists(email: string): boolean {
    return this.getUsers().some(user => user.email === email);
  }

  private addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  private findUserByCredentials(credentials: UserCredentials): User | undefined {
    return this.getUsers().find(
      user => user.email === credentials.email && user.password === credentials.password
    );
  }

  private saveLoginUser(user: UserList): void {
    localStorage.setItem('login-user', JSON.stringify(user));
  }

  private retrieveLoginUser(): UserList {
    const userString = localStorage.getItem('login-user');
    return userString ? JSON.parse(userString) : {};
  }

  private clearLoginUser(): void {
    localStorage.removeItem('login-user');
  }
}
