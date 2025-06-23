"use server";
import MainPage from "@/components/home/MainPage";

export default async function Home() {
  const type = "freshfood";
  const header = "Fresh Food Fulfillment";

  return <MainPage header={header} type={type} />;
}
