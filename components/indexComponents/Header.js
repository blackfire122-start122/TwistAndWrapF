import React from 'react';
import styles from "../../styles/components/home.module.css";
import OrderFoodButton from "../OrderFoodButton";
import UserPictureLink from "../UserPictureLink";

const Header = ({user}) => {
    return (
        <header className={styles.header}>
            <div>
                <h1 className={styles.title}>Twist&amp;Wrap</h1>
                <OrderFoodButton />
            </div>
            <UserPictureLink user={user}/>
        </header>
    );
};

export default Header;
