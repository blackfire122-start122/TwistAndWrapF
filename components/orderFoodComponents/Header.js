import React from 'react';
import styles from "../../styles/components/orderFoodInBar.module.css";
import Link from "next/link";
import UserPictureLink from "../UserPictureLink";

const Header = ({user}) => {
    return (
        <header className={styles.header}>
            <div>
                <Link className={styles.link} href="/">
                    <h2>Home</h2>
                </Link>
            </div>
            <UserPictureLink user={user} width="100px" height="100px"/>
        </header>
    );
};

export default Header;
