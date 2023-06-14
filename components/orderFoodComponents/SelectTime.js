import React from 'react';
import styles from '../../styles/components/OrderFoodInBar.module.css';

const SelectTime = ({selectedTime,handleTimeChange,errorSelectedTime}) => {
    return (
        <label className={styles.label}>
            Select Time:
            <input className={styles.input}
                   type="time"
                   value={selectedTime}
                   onChange={handleTimeChange}
            />
            <span>{errorSelectedTime}</span>
        </label>
    );
};

export default SelectTime;
