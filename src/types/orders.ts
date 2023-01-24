export type OrderItem = {
  id: string;
  categoryId: number;
  quantity: number;
  amount: number;
};

export type Order = {
  id: string;
  customerEmail: string;
  item: OrderItem;
  isEmailSend?: boolean;
};
