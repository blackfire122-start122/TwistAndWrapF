import React from "react";
import styles from "../../styles/components/createProduct.module.css";
import HomeLink from "../HomeLink";
import UserPictureLink from "../UserPictureLink";

export default function ProductFormHeader({user}) {
    return (
        <div className={styles.leftInfo}>
            <h1>Create Product</h1>
            <div className={styles.links}>
                <HomeLink width="75px" height="75px"/>
                <UserPictureLink user={user} width="75px" height="75px"/>
            </div>
        </div>
    );
}
