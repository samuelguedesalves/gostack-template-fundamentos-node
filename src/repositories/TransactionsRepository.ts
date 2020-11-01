import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const icomesTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = icomesTransactions.reduce(
      (accumulate, currentValue: Transaction) => {
        return accumulate + currentValue.value;
      },
      0,
    );

    const outcome = outcomeTransactions.reduce(
      (accumulate, currentValue: Transaction) => {
        return accumulate + currentValue.value;
      },
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
