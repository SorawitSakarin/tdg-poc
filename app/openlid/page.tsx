"use server";
import { Suspense } from "react";

import MainPage from "@/components/home/MainPage";

export default async function Home() {
  const type = "openlid";
  const header = "Open Lid";

  return (
    <Suspense>
      <MainPage header={header} type={type} />
    </Suspense>
  );
}
