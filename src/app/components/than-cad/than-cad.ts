import { Component, inject } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { SessionService } from 'src/app/shared/services/session.service ';

@Component({
  selector: 'app-than-cad',
  imports: [Sidebar],
  templateUrl: './than-cad.html',
  styleUrl: './than-cad.css',
})
export class ThanCad {
  sessionService = inject(SessionService);

  sessionUrl = this.sessionService.sessionUrl;

  ngOnInit() {
    console.log('ThanCad initialized', this.sessionUrl());
  }

}
