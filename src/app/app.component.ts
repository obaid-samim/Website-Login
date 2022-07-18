import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

//Observable? Similar to a JavaScript promise
//Observables are a type that provides support in passing messages from a source to a consumer
//They are powerful in that messages can be pushed, and a consumer can subscribe to the result
//All consumers are notified of any changes to the Observable
//When you subscribe to an Observable, you have access to the data being streamed
//Input Variables: Input variables are used to set custom component properties
//We can pass data from a parent component to a child component
//Lifecycle hooks are methods that are triggered at different points during the component lifecycle
//ngOnChanges,ngOnInit,ngDoCheck,ngAfterContentInit,ngAfterContentChecked,ngAfterViewInit,ngAfterViewChecked,ngOnDestroy
//Pipes are ways to format text in your application Angular provides some build in pipes that can show your data in predictable ways
//CurrencyPipe,DatePipe,LowerCasePipe,UpperCasePipe,Others (full tutorial here: 
//Directives are basically components that have references to HTML elements builthin
//*ngFor *ngIf ngClass ngStyle
//BehaviorSubject A BehaviorSubject is a Subject that not only has an initial value but also holds the current value
//Is very useful for maintaining state of an application and also data storage!
//Subject/BehaviorSubject like an Observable, we would want to use the .asObservable method on a separate variable
//This allows us to prevent consumers from accidentally pushing new data to our Subject – separation of concerns
//SwotchMap There are going to be instances where we need to access one HTTP call to get the required data for the request of another HTTP call
//We can store all of our main application data in Observables – specifically in BehaviorSubjects that are converted to Observables
//A subject is both an observer and an observable
//A BehaviorSubject is a Subject that not only has an initial value but also holds the current value
//Modules Overview For larger applications, we may want to split our code up into modules
//This can have a positive impact on performance if we use another feature called lazy loading
//As our applications grow very large, we may start noticing that the initial load ends up being longer than we want
//Lazy loading is done in Angular by first creating modules for different parts of your application
//This creates a level of separation between features
//Each module should correspond to a specific route or set of routes
//Lazy loading is done in Angular by first creating modules for different parts of your application
//This creates a level of separation between features
//Each module should correspond to a specific route or set of routes
//Route Guard
/*There are a few interfaces we can implement using a route guard:
CanActivate: when the route can only be navigated to if it fulfills a set of conditions (ex. Authentication)
CanDeactive: the route can only be navigated away from if it fulfills a set of conditions (ex. Saving form data before navigating away)
CanActivateChild: if you define children for your route – you can only navigate to a child route if you fulfill a set of conditions
*/
//JWT A JWT is a very secure form of transporting data in the form of JSON
//It can include a lot of different information inside of it that can only be parsed with a secret
//use the JSon server  https://www.npmjs.com/package/json-server 
//for starting your json server json-server --watch db.json    for more go to the https://www.npmjs.com/package/json-server



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Final Project';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

