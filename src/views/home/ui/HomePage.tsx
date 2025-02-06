import { BaseLayout } from "@/shared/ui/Layout";

import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <BaseLayout hasGNB hasLNB>
      <main className={styles.wrapper}>Home Page</main>
    </BaseLayout>
  );
};

export default HomePage;
