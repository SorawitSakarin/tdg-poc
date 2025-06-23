"use server";
import Page from "@/app/shoplifter/page";

export default async function Home() {
  const type = "cashroom";
  const header = "Cash Room Operation";

  return <Page header={header} type={type} />;
}
