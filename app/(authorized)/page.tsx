import { getMeApi } from "@/entities/user/api";

const Home: React.FC = async () => {
  const { data } = await getMeApi();

  return (
    <>
      HOME {data.email} {data.username}
    </>
  );
};

export default Home;
