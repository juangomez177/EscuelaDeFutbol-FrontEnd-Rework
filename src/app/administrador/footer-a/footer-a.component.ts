import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { InfoAsoFutbol } from 'src/app/models/infoAsoFutbol';
import { InfoAsoFutbolService } from 'src/app/services/infoAsoFutbol.service';
import Swal from 'sweetalert2';
import { AwsService } from '../../services/aws.service';

@Component({
  selector: 'app-footer-a',
  templateUrl: './footer-a.component.html',
  styleUrls: ['./footer-a.component.css'],
})
export class FooterAComponent implements OnInit {
  phoneIcon = faPhone;
  envelopeIcon = faEnvelope;
  mapMarkerIcon = faMapMarkerAlt;
  facebookIcon = faFacebook;
  xIcon = faTimes;
  instagramIcon = faInstagram;
  selectedFile: File | null = null;
  sp1 = false;
  sp2 = false;
  sp3 = false;

  infoAsoFutbol: InfoAsoFutbol = {
    id: 1,
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    sponsor1: '',
    sponsor2: '',
    sponsor3: '',
    facebook: '',
    x: '',
    instagram: ''
  };

  constructor(
    private infoAsoFutbolService: InfoAsoFutbolService,
    private AwsService: AwsService,
  ) { }

  ngOnInit(): void {
    this.getInfoAsoFutbol();
  }

  mostrarSweetAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'EXITO',
      text: '¡Exito en la transacción!',
      confirmButtonText: 'Aceptar',
    });
  }


  getInfoAsoFutbol(): void {
    this.infoAsoFutbolService.getInfoAsoFutbolo(1)
      .subscribe(info => this.infoAsoFutbol = info);
  }

  saveChanges(): void {
    this.infoAsoFutbolService.updateInfoAsoFutbol(this.infoAsoFutbol)
      .subscribe(_ => {
        // Manejar éxito en la actualización
        console.log('La información se ha actualizado correctamente.');
        this.mostrarSweetAlert();
      }, error => {
        // Manejar error en la actualización
        console.error('Error al actualizar la información:', error);
      });
  }

  //Gestión de archivos
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.AwsService.uploadFileToS3(formData).subscribe(
        (response: any) => {
          if (response && response.value) {

            // Asignar el nombre de la imagen devuelto por el servicio al campo sponsor
            if (this.sp1 == true) {

              this.infoAsoFutbol.sponsor1 = response.value;
              this.sp1 = false;
            }
            else if (this.sp2 == true) {

              this.infoAsoFutbol.sponsor2 = response.value;
              this.sp2 = false;
            }
            else if (this.sp3 == true) {

              this.infoAsoFutbol.sponsor3 = response.value;
              this.sp3 = false;
            }

          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }


}
