// Use-Shopping-Cart
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';

// React Types
import { FC } from 'react';

// Component Level Types
import { ProductsProps } from '@/components/cart/0-types/ProductProps';

const Products: FC<ProductsProps> = ({ products }) => {
  const { addItem, removeItem, decrementItem } = useShoppingCart();

  return (
    <section className="products">
      {products.map(
        ({
          id,
          unit_amount,
          currency,
          product: { name, description, images },
        }) => (
          <div key={id} className="product">
            <img
              style={{ width: '8rem', height: '4rem' }}
              src={images[0]}
              alt={name}
            />
            <h2>{name}</h2>
            <p className="price">
              {formatCurrencyString({
                value: unit_amount,
                currency: currency,
              })}
            </p>
            <button
              className="cart-style-background"
              onClick={() =>
                addItem({
                  name,
                  description,
                  id,
                  currency,
                  price: unit_amount,
                  image: images[0],
                } as any)
              }
            >
              Add to cart
            </button>
            <button
              className="cart-style-background"
              onClick={() => decrementItem(id)}
            >
              Decrease
            </button>
            <button
              className="cart-style-background"
              onClick={() => removeItem(id)}
            >
              Remove
            </button>
          </div>
        )
      )}
    </section>
  );
};

export default Products;
