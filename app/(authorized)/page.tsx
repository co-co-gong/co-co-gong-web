import { Suspense } from "react";

import { getMeApi } from "@/entities/user/api";

import Test from "app/(authorized)/test";

const Home: React.FC = async () => {
  const { data } = await getMeApi();

  return (
    <>
      SERVER GET ME: {data.email} {data.username}
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
    </>
  );
};

export default Home;
