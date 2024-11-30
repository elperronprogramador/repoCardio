import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should calculate age correctly if date is valid and user is old enough', () => {
    component.fechaNacimiento = '2000-01-01';
    component.calcularEdad();

    expect(component.edadCalculada).toBeGreaterThan(15);
    expect(component.mensajeErrorFecha).toBe('');
  });

  it('should show an error if the user is younger than the minimum age', () => {
    component.fechaNacimiento = '2015-01-01';
    component.calcularEdad();

    expect(component.edadCalculada).toBe(0);
    expect(component.mensajeErrorFecha).toBe(
      `Debe tener al menos ${component.ANIOS_MINIMO} años para continuar.`
    );
  });

  it('should show error messages for missing fields', () => {
    component.fechaNacimiento = '';
    component.descripcionSexo = '';
    component.programaAcademico = '';

    component.validarCampos();

    expect(component.mensajeErrorFecha).toBe(
      'La fecha de nacimiento es obligatoria.'
    );
    expect(component.mensajeErrorSexo).toBe('Debe seleccionar un sexo.');
    expect(component.mensajeErrorPrograma).toBe(
      'Debe seleccionar un programa académico.'
    );
  });
});
