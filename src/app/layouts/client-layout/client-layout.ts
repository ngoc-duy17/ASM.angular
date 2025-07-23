import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Banner } from '../../components/banner/banner';

@Component({
  selector: 'app-client-layout',
  imports: [RouterOutlet, Header, Footer, Banner],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css'
})
export class ClientLayout {

}
