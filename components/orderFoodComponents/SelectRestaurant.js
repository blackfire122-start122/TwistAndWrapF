import React from 'react';
import styles from '../../styles/components/OrderFoodInBar.module.css';

const SelectRestaurant = ({selectedRestaurant,handleRestaurantChange,restaurants}) => {
    return (
        <label className={styles.label}>
            Select a restaurant:
            <select className={styles.select} value={selectedRestaurant} onChange={handleRestaurantChange}>
                <option value="">--Please choose a restaurant--</option>
                {restaurants.map((r ) => (
                    <option key={r.id} value={r.idBar}>{r.address}</option>
                ))}
            </select>
        </label>
    );
};

export default SelectRestaurant;
