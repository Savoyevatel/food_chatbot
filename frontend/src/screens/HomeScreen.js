import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();

  const productList = useSelector(state => state.productList);
  const { error, loading, products, page, pages } = productList;
  const [currentHeading, setCurrentHeading] = useState(0);
  
  let keyword = location.search;
  const textStyle = {
    fontSize: '30px',
  };

  useEffect(() => {
    dispatch(listProducts(keyword));
    
    const totalHeadings = 4; // Number of headings

    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % totalHeadings);
    }, 4000); // 4 seconds for each heading

    return () => clearInterval(interval);
  }, [dispatch, keyword]);

  return (
    <div>
      <div className="home-screen">
        <h1 className={`heading ${currentHeading === 0 ? 'visible' : ''}`} style={textStyle}>
          Savor each moment with every bite.
        </h1>
        <h1 className={`heading ${currentHeading === 1 ? 'visible' : ''}`} style={textStyle}>
          Discover a world of flavors at your fingertips.
        </h1>
        <h1 className={`heading ${currentHeading === 2 ? 'visible' : ''}`} style={textStyle}>
          Fast, feast, and savor the culinary journey.
        </h1>
        <h1 className={`heading ${currentHeading === 3 ? 'visible' : ''}`} style={textStyle}>
          Experience culinary bliss in every dish.
        </h1>
      </div>  
        
        <img src='/static/images/vanillaice.jpg' alt='Example' className='salad-image' />
        
        <div className="home-grid card-gap">
          <Card className='my-3 p-3 rounded text-center'>
            <h1><i className="fas fa-thin fa-city"></i></h1>
            <div className="bold-text">Directions</div>
            <p>Emmen 9763AC</p>
          </Card>
          <Card className='my-3 p-3 rounded text-center'>
            <h1><i className="fas fa-thin fa-phone"></i></h1>
            <div className="bold-text">Opening hours</div>
            <p>9 am - 17 pm</p>
          </Card>
          <Card className='my-3 p-3 rounded text-center'>
            <h1><i className="fas fa-thin fa-star"></i></h1>
            <div className="bold-text">Enjoyed our service?</div>
            <p>Rate us!</p>
          </Card>
        
      </div>

      {!keyword && <ProductCarousel />}
      <h1>Available Meals</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
