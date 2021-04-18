import {Component, OnDestroy, OnInit} from '@angular/core';
import {StockService} from './shared/stock.service';
import {Stock} from './shared/stock';
import {StockDto} from './shared/stock.dto';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ChangePriceDto} from './shared/change-price.dto';
import {Select, Store} from '@ngxs/store';
import {StockState} from './state/stock.state';
import {ListenForStocks, StopListeningForStocks} from './state/stock.actions';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnDestroy {
  @Select(StockState.stocks) stocks$: Observable<Stock[]> | undefined;

  unsubscribe$ = new Subject();
  // stocks: Stock[] | undefined;
  error$: Observable<string> | undefined;
  selectedStock: Stock | undefined;
  priceFc = new FormControl('');

  constructor(private stockService: StockService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new ListenForStocks());
    // this.stockService.connect();

    // this.error$ = this.stockService.listenForErrors();

    // this.stockService.listenForStocks()
    //   .pipe(
    //   takeUntil(this.unsubscribe$)
    // )
    //   .subscribe(dto => {
    //     this.stocks = dto.stocks;
    //     this.selectedStock = undefined;
    //   });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForStocks());
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();
    // this.stockService.disconnect();
  }

  createStock(): void{
    // const stock: StockDto = {name: 'microsoft', price: 448, description: 'good stock'};
    const stock2: StockDto = {name: 'Apple', price: 1240, description: 'expensive stock'};
    const stock3: StockDto = {name: 'Amazon', price: 843, description: 'amazon stock'};
    const stock4: StockDto = {name: 'Tesla', price: 1094, description: 'tesla stock'};
    this.stockService.createStock(stock2);
    this.stockService.createStock(stock3);
    this.stockService.createStock(stock4);
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
