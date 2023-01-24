export type Job<Payload = any> = {
  id: string;
  type: 'send-order-email' | 'send-order-sms';
  payload?: Payload;
};
