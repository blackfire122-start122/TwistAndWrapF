import React from 'react';
import styles from "../../styles/components/orderFoodInBar.module.css";
import UserPictureLink from "../UserPictureLink";
import HomeLink from "../HomeLink";

const Header = ({user}) => {
    return (
        <header className={styles.header}>
            <HomeLink width="100px" height="100px"/>
            <UserPictureLink user={user} width="100px" height="100px"/>
        </header>
    );
};

export default Header;
