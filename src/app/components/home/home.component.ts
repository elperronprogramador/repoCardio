import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  fechaTest: string = '';
  presionArterial: string = '';
  consumoTabaco: string = '';
  ejercicio: string = '';
  mensajeError: string = '';
  mensajeErrorFecha: string = '';
  mensajeErrorPresion: string = '';
  mensajeErrorConsumo: string = '';
  mensajeErrorEjercicio: string = '';

  // Validar campos
  validarCampos(): void {
    // Validación de la fecha
    if (!this.fechaTest) {
      this.mensajeErrorFecha = 'La fecha del test es obligatoria.';
    } else {
      this.mensajeErrorFecha = '';
    }

    // Validación de la presión arterial
    if (!this.presionArterial) {
      this.mensajeErrorPresion = 'La presión arterial es obligatoria.';
    } else {
      this.mensajeErrorPresion = '';
    }

    // Validación de consumo de tabaco
    if (!this.consumoTabaco) {
      this.mensajeErrorConsumo =
        'Debe seleccionar una opción para el consumo de tabaco.';
    } else {
      this.mensajeErrorConsumo = '';
    }

    // Validación de ejercicio
    if (!this.ejercicio) {
      this.mensajeErrorEjercicio =
        'Debe seleccionar una opción para el ejercicio.';
    } else {
      this.mensajeErrorEjercicio = '';
    }
  }

  // Validar formato de la presión
  validarFormatoPresion(event: any): void {
    const presion = event.target.value;

    // Permitir solo números y una barra '/' entre dos números, sin negativos ni letras
    const regex = /^\d{1,3}\/\d{1,3}$/;

    if (!regex.test(presion)) {
      this.mensajeErrorPresion =
        'Formato de presión no válido (ejemplo: 120/80). Solo números y una barra entre los dos valores.';
    } else {
      this.mensajeErrorPresion = '';
    }
  }

  // Calcular riesgo (puedes agregar tu lógica de cálculo aquí)
  calcularRiesgo(): void {
    if (
      !this.fechaTest ||
      !this.presionArterial ||
      !this.consumoTabaco ||
      !this.ejercicio
    ) {
      this.mensajeError = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    // Lógica de cálculo de riesgo...
    console.log('Formulario enviado');
  }
}
