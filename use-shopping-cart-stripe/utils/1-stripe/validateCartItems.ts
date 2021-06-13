// Types
interface ProductProps {
  id: string;
  object: string;
  active: boolean;
  attributes: [];
  created: number;
  description: string;
  images: string[];
  livemode: boolean;
  metadata: {};
  name: string;
  package_dimensions?: {};
  shippable?: boolean;
  statement_descriptor?: string;
  type: string;
  unit_label?: string;
  updated: number;
  url?: string;
}

interface InventoryItemProps {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  livemode: boolean;
  lookup_key?: string;
  metadata: {};
  nickname: string;
  product: ProductProps;
  recurring?: {};
  tiers_mode?: string;
  transform_quantity?: {};
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

interface CartItemProps {
  name: string;
  description: string;
  id: string;
  currency: string;
  price: number;
  image: string;
  quantity: number;
  value: number;
  formattedValue: string;
}

export const validateCartItems = (
  inventory: InventoryItemProps[],
  cart: CartItemProps[]
) => {
  const validatedCartItems = [];

  for (const itemId in cart) {
    const product = cart[itemId];
    const inventoryItem = inventory.find(
      (currentProduct) => currentProduct.id === itemId
    );

    if (!inventoryItem) throw new Error(`Product ${itemId} not found!`);

    const item = {
      price: inventoryItem.id,
      quantity: product.quantity,
    };
    validatedCartItems.push(item);
  }
  return validatedCartItems;
};
