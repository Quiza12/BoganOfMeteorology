import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { enableProdMode } from '@angular/core';

enableProdMode();

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  appPageShowing: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.determinePage(event.url);
    });
  }

  determinePage(url:String): void {
    if (url == "/app" || url == "/" ) {
      this.appPageShowing = true;
    } else {
      this.appPageShowing = false;
    }
  }

}
