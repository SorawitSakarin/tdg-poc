"use server";
import Page from "@/app/shoplifter/page";

export default async function Home() {
  const type = "freshfood";
  const header = "Fresh Food Fulfillment";

  return <Page header={header} type={type} />;
}
