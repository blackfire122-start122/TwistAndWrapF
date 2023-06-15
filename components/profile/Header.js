import React from "react";
import styles from "../../styles/components/profile.module.css";
import OrderFoodButton from "../OrderFoodButton";
import HomeLink from "../HomeLink";

export default function Header() {
    return (
        <header className={styles.header}>
            <HomeLink width="75px" height="75px"/>
            <OrderFoodButton/>
        </header>
    );
}
