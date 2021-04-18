import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {StockState} from './state/stock.state';


@NgModule({
  declarations: [StockComponent],
    imports: [
        CommonModule,
        StockRoutingModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([StockState])
    ]
})
export class StockModule { }
