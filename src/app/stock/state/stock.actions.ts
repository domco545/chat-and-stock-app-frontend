import {Stock} from '../shared/stock';

export class ListenForStocks {
  static readonly type = '[Stock] Listen For Stocks';
}

export class StopListeningForStocks {
  static readonly type = '[Stock] Stop Listening For Stocks';
}

export class DeleteStock {
  constructor(public stock: Stock) {}

  static readonly type = '[Stock] Delete Stock';
}

export class UpdateStocks {
  constructor(public stocks: Stock[]) {}

  static readonly type = '[Stock] Update Stocks';
}
