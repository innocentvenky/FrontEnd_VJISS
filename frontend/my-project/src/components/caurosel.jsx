import styles from './carousel.module.css';


const Carousal=()=>{
    return(
        <div>   
            <h1>Carousal Component</h1>

      <div className={styles.carousel}>
        <div className={styles.group}>
            <div className={styles.card}>1</div>
            <div className={styles.card}>2</div>
            <div className={styles.card}>3</div>
            <div className={styles.card}>4</div>
            <div className={styles.card}>5</div>
            <div className={styles.card}>6</div>
        </div>
         <div aria-hidden className={styles.group}>
            <div className={styles.card}>1</div>
            <div className={styles.card}>2</div>
            <div className={styles.card}>3</div>
            <div className={styles.card}>4</div>
            <div className={styles.card}>5</div>
            <div className={styles.card}>6</div>
        </div>
      </div>
        </div>
    )
}
export default Carousal;




  