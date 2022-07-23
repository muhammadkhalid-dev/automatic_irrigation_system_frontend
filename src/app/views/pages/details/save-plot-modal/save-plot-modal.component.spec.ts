import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SavePlotModalComponent } from './save-plot-modal.component';

describe('SavePlotModalComponent', () => {
  let component: SavePlotModalComponent;
  let fixture: ComponentFixture<SavePlotModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavePlotModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
