import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

}
