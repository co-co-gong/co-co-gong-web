import { getMeApi } from "@/entities/user/api";

import SSRSafeSuspense from "@/shared/hooks/SSRSafeSuspense";

import Test from "app/(authorized)/test";

const Home: React.FC = async () => {
  const { data } = await getMeApi();

  return (
    <>
      SERVER GET ME: {data.email} {data.username}
      <br />
      <SSRSafeSuspense fallback={<div>Loading...</div>}>
        <Test />
      </SSRSafeSuspense>
    </>
  );
};

export default Home;
