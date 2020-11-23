import React, {useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout, Checkbox, Button, Card} from 'antd';
import {ShoppingCartOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {getAsyncCards, selectCards} from './features/cardsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Switch, Route, Link} from 'react-router-dom';

const {Meta} = Card;

const {Header, Sider, Content} = Layout;

function App() {
  const dispatch = useDispatch();

  const allCards = useSelector(selectCards);
  const [filteredCards, setFilteredCards] = useState([]);
  let cards = filteredCards.length > 0 ? filteredCards : allCards;

  const [cardsInCard, setCardsInCart] = useState([]);

  const price = (cards) => {
    let sum = 0;
    cards.map((card) => {
      sum += card.price;
    });
    return sum;
  };

  useEffect(() => {
    dispatch(getAsyncCards());
  }, []);

  const onChange = (e) => {
    if (e.target.checked) {
      console.log(cards.filter((card) => card.type == e.target.name));

      setFilteredCards(allCards.filter((card) => card.type == e.target.name));
    } else {
      setFilteredCards([]);
    }
  };

  const onBuy = (card) => {
    const cartItems = [...cardsInCard];
    cartItems.push(card);
    setCardsInCart(cartItems);
  };

  const deleteFromCart = (cardd) => {
    const newCartItem = cardsInCard.filter((card) => card.id != cardd.id);
    setCardsInCart(newCartItem);
  };
  return (
    <div className='app'>
      <Layout className='app__wrapper'>
        <Sider className='app__sider'>
          <Link to='/'>
            <img
              src='https://images.vexels.com/media/users/3/132449/isolated/preview/62b0bbd53e9a14638f0cf56364c3ee98-tennis-logo-by-vexels.png'
              alt=''
              className='app__logo'
            />
          </Link>
          <div className='app__checkBoxes'>
            <Checkbox onChange={onChange} className='app__check' name='ball'>
              Ball
            </Checkbox>
            <Checkbox
              onChange={onChange}
              className='app__check'
              name='sneakers'
            >
              Sneakers
            </Checkbox>
            <Checkbox onChange={onChange} className='app__check' name='racket'>
              Racket
            </Checkbox>
            <Checkbox
              onChange={onChange}
              className='app__check'
              name='leggings'
            >
              Leggings
            </Checkbox>
            <Checkbox
              onChange={onChange}
              className='app__check'
              name='backpack'
            >
              Backpack
            </Checkbox>
          </div>
        </Sider>
        <Layout>
          <Header className='app__header'>
            Tenis Shop
            <Link to='/cart'>
              <Button
                className='app__cartButton'
                shape='circle'
                icon={<ShoppingCartOutlined className='app__cartIcon' />}
                size='large'
                type='dashed'
              >
                {cardsInCard.length > 0 && (
                  <div className='app__itemCart'>{cardsInCard.length}</div>
                )}
              </Button>
            </Link>
          </Header>
          <Content>
            <Switch>
              <Route exact path='/'>
                <div className='app__content'>
                  {cards.map((card) => (
                    <Card
                      key={card.id}
                      className='app__card'
                      hoverable
                      style={{width: 240}}
                      cover={
                        <img
                          alt='example'
                          src={card.img}
                          style={{height: 195, objectFit: 'contain'}}
                        />
                      }
                    >
                      <Meta
                        title={card.name}
                        description={card.price + ' грн'}
                      />
                      <Button
                        type='primary'
                        className='app__buyButton'
                        onClick={() => onBuy(card)}
                      >
                        Buy
                      </Button>
                    </Card>
                  ))}
                </div>
              </Route>
              <Route path='/cart'>
                <div className='app__cart'>
                  <div className='app__cartWrapper'>
                    {cardsInCard.map((card) => (
                      <Card className='app__item'>
                        <img
                          src={card.img}
                          alt=''
                          style={{
                            height: 150,
                            width: 150,
                            objectFit: 'contain',
                          }}
                        />
                        <div className='app__itemInf'>
                          <div className='app__itemName'>{card.name}</div>
                          <div className='app__itemPrice'>
                            {card.price + ' грн'}
                          </div>
                        </div>
                        <Button
                          icon={
                            <CloseCircleOutlined className='app__cartDeleteIcon' />
                          }
                          shape='circle'
                          className='app__cartDelete'
                          onClick={() => deleteFromCart(card)}
                        ></Button>
                      </Card>
                    ))}
                  </div>

                  {price(cardsInCard) !== 0 && (
                    <div className='app__allPrice'>
                      Price: {price(cardsInCard) + ' грн'}
                    </div>
                  )}
                  <div className='map'>
                    <iframe
                      width='1320'
                      height='500'
                      frameborder='0'
                      scrolling='no'
                      marginheight='0'
                      marginwidth='0'
                      id='gmap_canvas'
                      src='https://maps.google.com/maps?width=1200&amp;height=500&amp;hl=en&amp;q=Antonovycha%20Kyiv+(Msp)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                    ></iframe>{' '}
                    <script
                      type='text/javascript'
                      src='script.js?id=27631927a28d8597cfe9577c531393877c2cae00'
                    ></script>
                  </div>
                </div>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
