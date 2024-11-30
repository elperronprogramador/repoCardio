import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  readonly ANIOS_MINIMO: number = 15;
  fechaNacimiento: string = '';
  descripcionSexo: string = '';
  programaAcademico: string = '';
  mensajeErrorFecha: string = '';
  mensajeErrorPrograma: string = '';
  mensajeErrorSexo: string = '';
  edadCalculada: number = 0;

  // Lista de carreras académicas válidas
  programasValidos: string[] = [
    'Ingeniería de Sistemas',
    'Medicina',
    'Psicología',
    'Arquitectura',
    'Derecho',
    'Ingeniería Industrial',
    'Ciencias de la Computación',
  ];

  calcularEdad(): void {
    if (!this.fechaNacimiento) {
      this.mensajeErrorFecha =
        'Por favor, ingrese una fecha de nacimiento válida.';
      return;
    }

    const fechaNacimientoDate = new Date(this.fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())
    ) {
      edad--;
    }

    if (edad < this.ANIOS_MINIMO) {
      this.mensajeErrorFecha = `Debe tener al menos ${this.ANIOS_MINIMO} años para continuar.`;
      return;
    }

    this.edadCalculada = edad;
    this.mensajeErrorFecha = '';
  }

  validarCampos(): void {
    // Validación para cada campo, los mensajes de error se eliminan si es válido
    if (!this.fechaNacimiento) {
      this.mensajeErrorFecha = 'La fecha de nacimiento es obligatoria.';
    } else {
      this.mensajeErrorFecha = '';
    }

    if (!this.descripcionSexo) {
      this.mensajeErrorSexo = 'Debe seleccionar un sexo.';
    } else {
      this.mensajeErrorSexo = '';
    }

    if (!this.programaAcademico) {
      this.mensajeErrorPrograma = 'Debe seleccionar un programa académico.';
    } else {
      this.mensajeErrorPrograma = '';
    }
  }

  guardarDatos(): void {
    this.calcularEdad();

    if (
      this.mensajeErrorFecha ||
      this.mensajeErrorSexo ||
      this.mensajeErrorPrograma
    ) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    console.log('Datos guardados correctamente:');
    console.log(`Fecha de nacimiento: ${this.fechaNacimiento}`);
    console.log(`Edad: ${this.edadCalculada}`);
    console.log(`Sexo: ${this.descripcionSexo}`);
    console.log(`Programa Académico: ${this.programaAcademico}`);
  }
}
