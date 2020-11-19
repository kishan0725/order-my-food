import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() public userName;

  constructor(private router: Router) { }

  goToHome = () => {
    this.router.navigateByUrl("/hotels");
  }
  ngOnInit(): void {
  }

}
