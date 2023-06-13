import React from "react";
import Link from "next/link";
import styles from "../../styles/components/profile.module.css";

export default function AdminLinks() {
    return (
        <div className={styles.links}>
            <Link className={styles.link} href="/createProduct">
                <h4>Create product</h4>
            </Link>
            <Link className={styles.link} href="/registerBar">
                <h4>Create bar</h4>
            </Link>
        </div>
    );
}
