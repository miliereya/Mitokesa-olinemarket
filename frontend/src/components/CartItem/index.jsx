import React from 'react'
import s from './CartItem.module.css'

export const CartItem = ({collectionType, img, name, size, quantity, price, onDelete}) => {
    return (
        <div className={s.item}>
            <div className={s.img}>
                <img src={img} alt={name} />
            </div>
            <div className={s.description}>
                <h5 className={s.collectionType}>{collectionType}</h5>
                <div className={s.box}>
                    <h3 className={s.name}>{name}</h3>
                    <span className={s.color}>Color</span>
                </div>
            </div>
            <span className={s.size}>{size}</span>
            <span className={s.quantity}>{quantity}</span>
            <span className={s.price}>{price} EUR</span>
            <button className={s.delete} onClick={() => onDelete(name)}>X</button>
        </div>
    )
}
