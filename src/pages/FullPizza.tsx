import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { selectCartItemById } from '../redux/slices/cart/selectors';
import { addItem } from '../redux/slices/cart/slice';
import { TCartItem } from '../redux/slices/cart/types';

const typeNames: string[] = ['тонкое', 'традиционные'];

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    types: number[];
    sizes: number[];
  }>();
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id as string));
  const addedCount = cartItem ? cartItem.count : 0;

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

  const onClickAdd = () => {
    const item: TCartItem = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      size: pizza.sizes[activeSize],
      type: typeNames[pizza.types[activeType]],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className='container'>
      <div className='pizza-block-wrapper'>
        <div className='pizza-block-full'>
          <img
            className='pizza-block-full__image'
            src={pizza.imageUrl}
            alt={`pizza img ${pizza.id}`}
          />
          <div className='pizza-block-full-wrapper'>
            <h4 className='pizza-block-full__title'>{pizza.title}</h4>
            <div className='pizza-block-full__selector'>
              <ul>
                {pizza.types.map((typeId, index) => (
                  <li
                    onClick={() => setActiveType(typeId)}
                    className={activeType === index ? 'active' : ''}
                    key={typeId}>
                    {typeNames[typeId]}
                  </li>
                ))}
              </ul>
              <ul>
                {pizza.sizes.map((size, index) => (
                  <li
                    onClick={() => setActiveSize(index)}
                    key={size}
                    className={activeSize === index ? 'active' : ''}>
                    {size} см.
                  </li>
                ))}
              </ul>
            </div>
            <div className='pizza-block-full__bottom'>
              <div className='pizza-block-full__price'>от {pizza.price} ₽</div>
              <button
                onClick={onClickAdd}
                className='button button--outline button--add'>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                    fill='white'
                  />
                </svg>
                <span>Добавить</span>
                {addedCount > 0 && <i>{addedCount}</i>}
              </button>
            </div>
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
