import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { ToastContainerComponent } from 'src/app/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer,ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-cad-v.1');
}
