type Pending = "Pending";
type Fulfilled = "Fulfilled";
type Shipped = "Shipped";
type Unfulfillable = "Unfulfillable";

// The status an order can be in.
export type OrderStatus = Pending | Fulfilled | Shipped | Unfulfillable;
