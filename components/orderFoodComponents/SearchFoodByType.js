import styles from '../../styles/components/OrderFoodInBar.module.css';

const SearchFoodByType = ({handleSearchTypeChange,foodTypes}) => {
    return (
        <label className={styles.label}>
            Search by food type:
            <select className={styles.select} onChange={handleSearchTypeChange}>
                <option value="">All Types</option>
                {foodTypes.map(type=>(
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </label>
    );
};

export default SearchFoodByType;
