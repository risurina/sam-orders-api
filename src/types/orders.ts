export type OrderItem = {
  id: string;
  catalogId: number;
  quantity: number;
  amount: number;
};

export type Order = {
  id: string;
  customerEmail: string;
  item: OrderItem;
  emailStatus: 'pending' | 'sent' | 'failed';
};
