"use server";
import { Suspense } from "react";

import MainPage from "@/components/home/MainPage";

export default async function Home() {
  const type = "cashroom";
  const header = "Cash Room Operation";

  return (
    <Suspense>
      <MainPage header={header} type={type} />
    </Suspense>
  );
}
