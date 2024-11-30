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

  // Test 1: Verificar que el componente se haya creado
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verificar validación de campos
  it('should show error message if the "fechaTest" field is empty', () => {
    component.fechaTest = '';
    component.validarCampos();
    expect(component.mensajeErrorFecha).toBe(
      'La fecha del test es obligatoria.'
    );
  });

  it('should show error message if the "presionArterial" field is empty', () => {
    component.presionArterial = '';
    component.validarCampos();
    expect(component.mensajeErrorPresion).toBe(
      'La presión arterial es obligatoria.'
    );
  });

  it('should show error message if the "consumoTabaco" field is empty', () => {
    component.consumoTabaco = '';
    component.validarCampos();
    expect(component.mensajeErrorConsumo).toBe(
      'Debe seleccionar una opción para el consumo de tabaco.'
    );
  });

  it('should show error message if the "ejercicio" field is empty', () => {
    component.ejercicio = '';
    component.validarCampos();
    expect(component.mensajeErrorEjercicio).toBe(
      'Debe seleccionar una opción para el ejercicio.'
    );
  });

  // Test 3: Verificar validación de formato de presión arterial
  it('should show error message if the "presionArterial" format is invalid', () => {
    const event = { target: { value: '120-80' } };
    component.validarFormatoPresion(event);
    expect(component.mensajeErrorPresion).toBe(
      'Formato de presión no válido (ejemplo: 120/80). Solo números y una barra entre los dos valores.'
    );
  });

  it('should not show error message if the "presionArterial" format is valid', () => {
    const event = { target: { value: '120/80' } };
    component.validarFormatoPresion(event);
    expect(component.mensajeErrorPresion).toBe('');
  });

  // Test 4: Verificar que el cálculo de riesgo no se ejecute si faltan campos
  it('should show error message if fields are missing when calculating risk', () => {
    component.fechaTest = '';
    component.presionArterial = '';
    component.consumoTabaco = '';
    component.ejercicio = '';
    component.calcularRiesgo();
    expect(component.mensajeError).toBe(
      'Por favor, complete todos los campos obligatorios.'
    );
  });

  // Test 5: Verificar que el cálculo de riesgo se ejecute correctamente si todos los campos están llenos
  it('should calculate risk if all fields are filled', () => {
    component.fechaTest = '2024-11-30';
    component.presionArterial = '120/80';
    component.consumoTabaco = 'No';
    component.ejercicio = 'Sí';

    spyOn(console, 'log'); // Espía en la función console.log para verificar que se ejecute
    component.calcularRiesgo();

    expect(console.log).toHaveBeenCalledWith('Formulario enviado');
  });
});
