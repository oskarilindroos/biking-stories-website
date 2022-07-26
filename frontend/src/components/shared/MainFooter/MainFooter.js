import styles from './MainFooter.module.css'

const MainFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>Mern-kesäkurssi 2022</p>
                <p>Tekijä: <strong>Oskari Lindroos</strong></p>
            </div>
        </footer>
    );
}

export default MainFooter;