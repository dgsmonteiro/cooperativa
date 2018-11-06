import { CooperadoModule } from './cooperado.module';

describe('CooperadoModule', () => {
  let cooperadoModule: CooperadoModule;

  beforeEach(() => {
    cooperadoModule = new CooperadoModule();
  });

  it('should create an instance', () => {
    expect(cooperadoModule).toBeTruthy();
  });
});
