// React Types
import { FC } from 'react';

// Component Level Types
import { ProductCardProps } from './ProductCardTypes';

const ProductCard: FC<ProductCardProps> = ({ name, description, price }) => {
  return <div className="p-4">Product Card</div>;
};

export default ProductCard;
