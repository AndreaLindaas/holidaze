import Search from "./_components/Search/Search";
import Venues from "./_components/Venues/Venues";
import styles from "./page.module.css";
export default function Home() {
  return (
    <main>
      <div className={styles.backgroundImage}></div>
      <Search />
      <Venues />
    </main>
  );
}
