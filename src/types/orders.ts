export type OrderItem = {
  id: string;
  categoryId: number;
  quantity: number;
  amount: number;
};

export type Order = {
  id: string;
  totalAmount: number;
  items: OrderItem[];
  isEmailSend?: boolean;
};
