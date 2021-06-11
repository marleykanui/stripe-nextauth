// Next
import Head from 'next/head';
import Image from 'next/image';

// Components
import ProductCard from '../components/ProductCard';

// Styles
import styles from '../styles/Home.module.css';

// React Types
import { FC } from 'react';

// Next Types
import { GetServerSideProps } from 'next';

const Index: FC = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-row">
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Index;
