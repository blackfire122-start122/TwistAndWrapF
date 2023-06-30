import React from 'react';
import styles from "../../styles/components/orderFoodInBar.module.css";

const ListCreatedProducts = ({ createdOrders }) => {
    const findFoodById = (order,id) => {
        return order.productsCreated.find((idp) =>  Number(idp) === Number(id));
    };

    return (
        <div className={styles.orders}>
            {createdOrders.map((order) => (
                <div key={order.id} className={styles.order}>
                    <h2>Your id: {order.id}</h2>
                    <div className={styles.orderFoods}>
                        {order.selectedFood ? order.selectedFood.map((food) => {
                            const foundFood = findFoodById(order,food.id);
                            return foundFood!==undefined ? (
                                <div className={styles.listCreatedProductsFood} key={food.id}>
                                    <h2 className={styles.orderName}>{food.name}</h2>
                                    <img src={"http://localhost/"+food.image} alt={food.name} />
                                    <p className={styles.listCreatedProductsFoodDescriptions}>{food.description}</p>
                                    <p className={styles.orderType}>Type: {food.type}</p>
                                    <p className={styles.orderCount}>Count: {food.count}</p>
                                </div>
                            ) : (
                                <div className={`${styles.listCreatedProductsFood} ${styles.notCreated}`} key={food.id}>
                                    <h2 className={styles.orderName}>{food.name} NotCreated</h2>
                                    <img src={"http://localhost/"+food.image} alt={food.name} />
                                    <p className={styles.listCreatedProductsFoodDescriptions}>{food.description}</p>
                                    <p className={styles.orderType}>Type: {food.type}</p>
                                    <p className={styles.orderCount}>Count: {food.count}</p>
                                </div>
                            );
                        }):null}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListCreatedProducts;
