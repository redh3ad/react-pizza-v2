import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://630fb35336e6a2a04ee0239b.mockapi.io/items/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className='container'>
      <div className='pizza-block-wrapper'>
        <div className='pizza-block-full'>
          <img
            className='pizza-block-full__image'
            src={pizza.imageUrl}
            alt={`pizza img ${pizza.id}`}
          />
          <div>
            <h4 className='pizza-block-full__title'>{pizza.title}</h4>
          </div>
        </div>
      </div>
      <Link to='/' className='button button--outline button--add go-back-btn'>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
