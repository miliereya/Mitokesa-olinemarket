import React from 'react'
import {CartItem} from "../CartItem";
import {useLocalStorage} from "../../hooks/useLocalStorage.hook";
import s from './Cart.module.css';
import {calculateTotalPrice} from "../../utils";

const orderInfoData = [
    {title: 'Secure Checkout', text: 'We offer secure and simple payment options ensuring a safe shopping experience'},
    {title: 'Shipping Information', text: 'Free worldwide shipping on orders over $500 / €500. Customs duties and taxes included. For exceptions, more exact dispatch times, please click here and check our Shipping information page.'},
    {title: 'Returns & Refunds', text: 'Free returns on full-price orders. If something isn\'t quite right, you have 14 days to return.'},
    {title: 'Customer Service', text: 'Questions? Please check your FAQ for more information, or contact us. Our customer service team is available 10-5pm CET during weekdays.'},
]

export const Cart = () => {
    const [cart, setCart] = useLocalStorage('cart', [])

    const deleteProduct = (name) => {
        const filteredCart = cart.filter(p => p.name !== name)
        setCart([...filteredCart])
    }

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.cart}>
                    <h3 className={s.title}>Shopping cart</h3>
                    <ul className={s.meta}>
                        <li className={`${s.name} ${s.item}`}>Product</li>
                        <li className={`${s.size} ${s.item}`}>Size</li>
                        <li className={`${s.quantity} ${s.item}`}>Quantity</li>
                        <li className={`${s.price} ${s.item}`}>Price</li>
                    </ul>
                    <div className={s.list}>
                        {cart.map((item) => <CartItem {...item} key={item.name} onDelete={deleteProduct} />)}
                    </div>
                    <div className={s.notification}>
                        <span>Please note that the final purchase price may change depending on your selected shipping destination.</span>
                    </div>
                </div>
                <div className={s.order}>
                    <h3 className={s.title}>Order summary</h3>
                    <div className={s.subtotal}>
                        <span>Subtotal</span>
                        <span>1 590 EUR</span>
                    </div>
                    <div className={s.vat}>
                        <span>VAT</span>
                        <span>0 EUR</span>
                    </div>
                    <span className={s.divider}></span>
                    <div className={s.total}>
                        <span>Total</span>
                        <span>{calculateTotalPrice(cart)} EUR</span>
                    </div>
                    <button className={s.checkout}>Proceed to checkout</button>
                    <button className={s.continue}>Continue shopping</button>
                    <span className={s.divider}></span>
                    {orderInfoData.map(({title, text}) => {
                        return (
                            <>
                                <div className={s.info}>
                                    <div className={s.info_icon}>X</div>
                                    <div className={s.info_content}>
                                        <h5 className={s.info_title}>{title}</h5>
                                        <p className={s.info_text}>{text}</p>
                                    </div>
                                </div>
                                <span className={s.divider}></span>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
