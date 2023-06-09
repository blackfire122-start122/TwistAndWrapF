import styles from '../../styles/components/OrderFoodInBar.module.css';

const SearchFood = ({handleSearchTermChange}) => {
    return (
        <label className={styles.label}>
            Search food:
            <input className={styles.input} type="text" onChange={handleSearchTermChange} placeholder="Search food"/>
        </label>
    );
};

export default SearchFood;
