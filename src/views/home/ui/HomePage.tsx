import GNB from "@/shared/ui/Layout/GNB";

import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <>
      <GNB />
      <main className={styles.wrapper}>HOME PAGE</main>;
    </>
  );
};

export default HomePage;
