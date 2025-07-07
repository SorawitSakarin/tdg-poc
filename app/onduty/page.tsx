"use server";
import { Suspense } from "react";

import MainPage from "@/components/home/MainPage";

export default async function Home() {
  const type = "onduty";
  const header = "Staff On Duty";

  return (
    <Suspense>
      <MainPage header={header} type={type} />
    </Suspense>
  );
}
