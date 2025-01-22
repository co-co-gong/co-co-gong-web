import { getUserApi } from "@/entities/user/api/user.server-service";

import styles from "./homePage.module.scss";

const HomePage: React.FC = async () => {
  const user = await getUserApi(1);

  return (
    <div className={styles.wrapper}>
      HOME PAGE 이메일: {user.data.email} / 이름: {user.data.username}
    </div>
  );
};

export default HomePage;
