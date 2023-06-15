import React from 'react';
import styles from "../styles/components/homeLink.module.css";
import Link from "next/link";

const HomeLink = ({width, height}) => {
    const pictureStyle = {
        width: width || '150px',
        height: height || '150px',
    };

    return (
        <Link href="/">
            <img className={styles.picture} src="http://localhost/static/home.png" alt="home" style={pictureStyle} />
        </Link>
    );
};

export default HomeLink;
