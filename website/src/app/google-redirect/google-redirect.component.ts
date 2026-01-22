import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-redirect',
  templateUrl: './google-redirect.component.html',
  standalone: false,
  styleUrls: ['./google-redirect.component.css']
})

export class GoogleRedirectComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    // For POST, you may need to parse the body; for GET, use query params
    const params = new URLSearchParams(window.location.search);
    const credential = params.get('credential');

    if (credential) {
      this.accountService.loginWithGoogle(credential).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.router.navigate(['/login'])
      });
    } else {
      // Handle error or fallback
      this.router.navigate(['/login']);
    }
  }
}
