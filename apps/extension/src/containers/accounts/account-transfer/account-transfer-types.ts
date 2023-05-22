export interface ITransaction {
  from: string;
  message: string;
  sends: ISend[];
}

export interface ISend {
  to: string;
  tokens: IToken[];
}

export interface IToken {
  token: string;
  amount: number;
}
