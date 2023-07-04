import React from "react";
import styles from "../../styles/components/profile.module.css";

export default function OrdersUser({orders}) {
    return (
        <div className={styles.ordersUser}>
            {orders.map((order)=>(
                    <div key={order.Id} className={styles.order}>
                        <h3>Order Id: {order.OrderId}</h3>
                        {/*<time>Ordered at time: {new Date(order.OrderTime).toLocaleString()} </time>*/}
                        <time>Ordered at time: {order.OrderTime} </time>
                        <div className={styles.orderProducts}>
                            {order.OrderProducts.map((orderProduct)=> {
                                return orderProduct.Status !== "not created" ? (
                                    <div key={orderProduct.ID} className={styles.product}>
                                        <h2 className={styles.productName}>{orderProduct.Product.Name}</h2>
                                        <img src={"http://localhost/" + orderProduct.Product.Image}
                                             alt={orderProduct.Product.Name}/>
                                        <p className={styles.productDescriptions}>{orderProduct.Product.Description}</p>
                                        <p className={styles.productType}>Type: {orderProduct.Product.Type}</p>
                                        <p className={styles.productCount}>Count: {orderProduct.Count}</p>
                                    </div>
                                    ) : (
                                        <div key={orderProduct.ID} className={`${styles.product} ${styles.notCreated}`}>
                                            <h2 className={styles.productName}>{orderProduct.Product.Name}</h2>
                                            <img src={"http://localhost/" + orderProduct.Product.Image}
                                                 alt={orderProduct.Product.Name}/>
                                            <p className={styles.productDescriptions}>{orderProduct.Product.Description}</p>
                                            <p className={styles.productType}>Type: {orderProduct.Product.Type}</p>
                                            <p className={styles.productCount}>Count: {orderProduct.Count}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ))}
        </div>
    );
}
