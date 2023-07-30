import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadingComponent } from './loading.component';
import { AppStoreModule } from 'src/store/AppStoreModule';
import { AppState } from 'src/store/AppState';
import { StoreModule } from "@ngrx/store";
import { Store } from '@ngrx/store';
import { show } from 'src/store/loading/loading.actions';
import { loadingReducer } from 'src/store/loading/loading.reducers';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [IonicModule.forRoot(),
      StoreModule.forRoot([]),
      StoreModule.forFeature("loading", loadingReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide loading component when it is not loading', () => {

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".backdrop")).toBeNull();
  });

   // TODO fix this test
  it('should show loading component when it is loading', fakeAsync( () => {

    const compiled = fixture.nativeElement;
    store.dispatch(show());
    fixture.detectChanges();
    tick(1500);
    expect(compiled.querySelector(".backdrop")).not.toBeNull();
  })
  );
});
