"use server";
import MainPage from "@/components/home/MainPage";

export default async function Home() {
  const type = "cashroom";
  const header = "Cash Room Operation";

  return <MainPage header={header} type={type} />;
}
