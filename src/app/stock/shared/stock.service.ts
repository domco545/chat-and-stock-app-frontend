import { Injectable } from '@angular/core';
import {SocketStock} from '../../app.module';
import {StockDto} from './stock.dto';
import {Observable} from 'rxjs';
import {AllStocksDto} from './all-stocks.dto';
import {ChangePriceDto} from './change-price.dto';
import {Stock} from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private socket: SocketStock) { }

  createStock(stock: StockDto): void{
    this.socket.emit('create-stock', stock);
  }

  listenForErrors(): Observable<string>{
    return this.socket
      .fromEvent<string>('error');
  }

  listenForStocks(): Observable<Stock[]>{
    return this.socket
      .fromEvent<Stock[]>('allStocks');
  }

  disconnect(): void{
    // this.socket.disconnect();
  }

  connect(): void{
    // this.socket.connect();
  }

  deleteStock(id: string | undefined): void {
    this.socket.emit('delete-stock', id);
  }

  changePrice(dto: ChangePriceDto): void {
    this.socket.emit('price-change', dto);
  }
}
