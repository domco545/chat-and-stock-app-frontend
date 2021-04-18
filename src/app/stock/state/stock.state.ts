import {Stock} from '../shared/stock';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {StockService} from '../shared/stock.service';
import {ListenForStocks, StopListeningForStocks, UpdateStocks} from './stock.actions';
import {Subscription} from 'rxjs';

export interface StockStateModel {
  stocks: Stock[];
}

@State<StockStateModel>({
  name: 'stock',
  defaults: {
    stocks: [],
  }
})
@Injectable()
export class StockState {
  private clientsUnsub: Subscription | undefined;

  constructor(private stockService: StockService) {
  }

  @Selector()
  static stocks(state: StockStateModel): Stock[] {
    return state.stocks;
  }

  @Action(ListenForStocks)
  getStocks(ctx: StateContext<StockStateModel>): void {
    this.clientsUnsub = this.stockService.listenForStocks()
      .subscribe(stockDto => {
        ctx.dispatch(new UpdateStocks(stockDto.stocks));
      });
  }

  @Action(StopListeningForStocks)
  stopListeningForStocks(ctx: StateContext<StockStateModel>): void {
    if (this.clientsUnsub) {
      this.clientsUnsub.unsubscribe();
    }
  }

  @Action(UpdateStocks)
  updateStocks(ctx: StateContext<StockStateModel>, uc: UpdateStocks): void {
    const state = ctx.getState();
    const newState: StockStateModel = {
      ...state,
      stocks: uc.stocks
    };
    ctx.setState(newState);
  }
}
