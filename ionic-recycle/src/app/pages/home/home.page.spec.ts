import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  }));

  it('should go to pickup-calls on see all', () => {
    spyOn(router,'navigate');

    component.goToPickupCalls();

    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']);
  });

  it('should go to pickup-calls on see all', () => {
    spyOn(router,'navigate');
    component.newPickupCall();

    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  });
});
