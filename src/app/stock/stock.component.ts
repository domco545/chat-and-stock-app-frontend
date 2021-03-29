import {Component, OnDestroy, OnInit} from '@angular/core';
import {StockService} from './shared/stock.service';
import {Stock} from './shared/stock';
import {StockDto} from './shared/stock.dto';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ChangePriceDto} from './shared/change-price.dto';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  stocks: Stock[] | undefined;
  error$: Observable<string> | undefined;
  selectedStock: Stock | undefined;
  priceFc = new FormControl('');

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.connect();

    this.error$ = this.stockService.listenForErrors();

    this.stockService.listenForStocks()
      .pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(dto => {
        this.stocks = dto.stocks;
        this.selectedStock = undefined;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.stockService.disconnect();
  }

  createStock(): void{
    const stock: StockDto = {name: 'microsoft', price: 448, description: 'good stock'};
    this.stockService.createStock(stock);
  }

  selectStock(stock: Stock): void{
    this.selectedStock = stock;
    this.priceFc.setValue(stock.price);
  }

  changePrice(): void {
    if (this.selectedStock?.id && !Number.isNaN(this.priceFc.value)){
      const dto: ChangePriceDto = {id: this.selectedStock.id, newPrice: this.priceFc.value};
      this.stockService.changePrice(dto);
    }
  }

  updateStock(): void{

  }

  deleteStock(): void {
    this.stockService.deleteStock(this.selectedStock?.id);
  }
}
