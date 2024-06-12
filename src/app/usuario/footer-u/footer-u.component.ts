import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { InfoAsoFutbol } from 'src/app/models/infoAsoFutbol';
import { InfoAsoFutbolService } from 'src/app/services/infoAsoFutbol.service';


@Component({
  selector: 'app-footer-u',
  templateUrl: './footer-u.component.html',
  styleUrls: ['./footer-u.component.css'],
})
export class FooterUComponent implements OnInit {
  phoneIcon = faPhone;
  envelopeIcon = faEnvelope;
  mapMarkerIcon = faMapMarkerAlt;
  facebookIcon = faFacebook;
  xIcon = faTimes;
  instagramIcon = faInstagram;


  infoAsoFutbol: InfoAsoFutbol | undefined;

  constructor(private InfoAsoFutbolService: InfoAsoFutbolService) { }

  ngOnInit(): void {
    this.getInfoAsoFutbol();
  }

  getInfoAsoFutbol() {
    this.InfoAsoFutbolService.getInfoAsoFutbolo(1).subscribe(data => {
      this.infoAsoFutbol = data;
    });
  }
}

