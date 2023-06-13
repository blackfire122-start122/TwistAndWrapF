import React from 'react';
import styles from "../../styles/components/home.module.css";
import Link from "next/link";
import OrderFoodButton from "./OrderFoodButton";

const Header = ({user}) => {
    return (
        <header className={styles.header}>
            <div>
                <h1 className={styles.title}>Twist&amp;Wrap</h1>
                <OrderFoodButton />
            </div>
            {
                user ? (
                    <Link href="/profile">
                        <img className={styles.picture} src={`http://localhost/${user.image}`} alt={user.username} />
                    </Link>
                ) : (
                    <>
                        <Link href="/login">
                            <p>Login</p>
                        </Link>
                        <Link href="/register">
                            <p>Register</p>
                        </Link>
                    </>
                )
            }
        </header>
    );
};

export default Header;
