// Use-Shopping-Cart
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';

// Data
import { ProductData } from '../1-data/ProductData';

// React Types
import { FC } from 'react';

const Products: FC = () => {
  const { addItem, removeItem } = useShoppingCart();

  return (
    <section className="products">
      {ProductData.map((product) => (
        <div key={product.sku} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>
          <button
            className="cart-style-background"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeItem(product.sku)}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default Products;
