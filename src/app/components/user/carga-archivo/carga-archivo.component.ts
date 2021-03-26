import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CargaService} from '../../../_services/carga.service';

@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.css']
})
export class CargaArchivoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private cargaService: CargaService) {
  }

  @ViewChild('fileInput') fileInput: ElementRef;
  error: string;
  uploadResponse = {status: '', message: '', filePath: ''};
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {excel: [null]});
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('excel', this.form.get('excel').value);
    console.log(formData)
    this.cargaService.importExcel(formData).subscribe(
      (res) => console.log(formData),
      (err) => this.error = err,
    );
  }

  cargarExcel(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('excel').setValue(file);
    }
  }
}
