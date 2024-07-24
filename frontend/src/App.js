import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import KommunicateChat from './components/KommunicateChat';
import { handleOrderComplete } from './actions/cartActions';

function App() {
    const [actionComplete, setActionComplete] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new WebSocket('wss://7f39-217-62-112-245.ngrok-free.app/ws/orders/');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'order_complete') {
                setActionComplete(data.action_complete);
                dispatch(handleOrderComplete(data.action_complete));
            }
        };

        return () => {
            socket.close();
        };
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/shipping" element={<ShippingScreen />} />
                        <Route path="/placeorder" element={<PlaceOrderScreen />} />
                        <Route path="/orders/:id" element={<OrderScreen />} />
                        <Route path="/payment" element={<PaymentScreen />} />
                        <Route path="/product/:id" element={<ProductScreen />} />
                        <Route path="/cart/:id?" element={<CartScreen />} />
                        <Route path="/admin/userlist" element={<UserListScreen />} />
                        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
                        <Route path="/admin/productlist" element={<ProductListScreen />} />
                        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                        <Route path="/admin/orderlist" element={<OrderListScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
            <KommunicateChat />
        </Router>
    );
}

export default App;
