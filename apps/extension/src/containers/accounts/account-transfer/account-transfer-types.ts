export interface ITransaction {
  from: string;
  message: string;
  isMessageEncrypted: boolean;
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
