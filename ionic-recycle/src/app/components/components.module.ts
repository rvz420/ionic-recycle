import { NgModule } from "@angular/core";
import { PickupCallCardComponent } from "./pickup-call-card/pickup-call-card.component";
import { ErrorMessageComponent } from "./error-message/error-message.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HomePageRoutingModule } from "../pages/home/home-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [PickupCallCardComponent,ErrorMessageComponent],
  exports: [PickupCallCardComponent,ErrorMessageComponent]
})
export class ComponentsModule{};
