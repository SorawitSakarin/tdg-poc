"use server";
import MainPage from "@/components/home/MainPage";

export default async function Home() {
  const type = "shoplifter";
  const header = "Fraud Shoplifter";

  return <MainPage header={header} type={type} />;
}
