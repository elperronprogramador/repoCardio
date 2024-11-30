import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Field Validations', () => {
    it('should show an error if "fechaTest" is empty', () => {
      component.fechaTest = '';
      component.validarCampos();
      expect(component.mensajeErrorFecha).toBe(
        'La fecha del test es obligatoria.'
      );
    });

    it('should clear the error if "fechaTest" is valid', () => {
      component.fechaTest = '2024-11-30';
      component.validarCampos();
      expect(component.mensajeErrorFecha).toBe('');
    });

    it('should show an error if "presionArterial" format is invalid', () => {
      const mockEvent = { target: { value: '12080' } };
      component.validarFormatoPresion(mockEvent);
      expect(component.mensajeErrorPresion).toBe(
        'Formato de presión no válido (ejemplo: 120/80). Solo números y una barra entre los dos valores.'
      );
    });

    it('should clear the error if "presionArterial" format is valid', () => {
      const mockEvent = { target: { value: '120/80' } };
      component.validarFormatoPresion(mockEvent);
      expect(component.mensajeErrorPresion).toBe('');
    });

    it('should show an error if "consumoTabaco" is empty', () => {
      component.consumoTabaco = '';
      component.validarCampos();
      expect(component.mensajeErrorConsumo).toBe(
        'Debe seleccionar una opción para el consumo de tabaco.'
      );
    });

    it('should show an error if "ejercicio" is empty', () => {
      component.ejercicio = '';
      component.validarCampos();
      expect(component.mensajeErrorEjercicio).toBe(
        'Debe seleccionar una opción para el ejercicio.'
      );
    });
  });

  describe('Risk Calculation', () => {
    it('should not calculate risk if fields are incomplete', () => {
      component.fechaTest = '';
      component.presionArterial = '120/80';
      component.consumoTabaco = 'nunca';
      component.ejercicio = 'aveces';
      component.calcularRiesgo();
      expect(component.mensajeError).toBe(
        'Por favor, complete todos los campos obligatorios.'
      );
    });

    it('should calculate risk if all fields are valid', () => {
      spyOn(console, 'log'); // Espía para verificar si se ejecuta el cálculo.
      component.fechaTest = '2024-11-30';
      component.presionArterial = '120/80';
      component.consumoTabaco = 'nunca';
      component.ejercicio = 'aveces';
      component.calcularRiesgo();
      expect(component.mensajeError).toBe('');
      expect(console.log).toHaveBeenCalledWith('Formulario enviado');
    });
  });
});
