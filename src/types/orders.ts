export type OrderItem = {
  id: number;
  categoryId: number;
  quantity: number;
  amount: number;
};

export type Order = {
  id: number;
  totalAmount: number;
  items: OrderItem[];
  isEmailSend?: boolean;
};
