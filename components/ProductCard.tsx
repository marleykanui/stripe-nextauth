// Next
import Image from 'next/image';

// React Types
import { FC } from 'react';

// Component Level Types
import { ProductCardProps } from './ProductCardTypes';

const ProductCard: FC<ProductCardProps> = ({
  name,
  description,
  price,
  image,
}) => {
  return (
    <div className="flex flex-col text-center p-8">
      <div>{name}</div>
      <div>
        <Image src={image} alt={name} height={132} width={215} />
      </div>

      <div style={{ width: '15vw' }}>{description}</div>
      <div>{`$${price / 100}.00`}</div>
    </div>
  );
};

export default ProductCard;
