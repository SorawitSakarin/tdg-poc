"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { title } from "@/components/primitives";
import CardDetail from "@/components/detail/CardDetail";
import FirstLoadSekeleton from "@/components/detail/FirstLoadSekeleton";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsFirstLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v2/notifications/tdg-poc/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        },
      );

      if (!response.ok) {
        setIsFirstLoading(false);
        router.push("/not-found");
      }
      const data: any = await response.json();

      setData(data);
      setIsFirstLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-start justify-start gap-8">
      <div className="inline-block max-w-xl text-left justify-center md:whitespace-nowrap">
        <span className={title()}>Notification&nbsp;</span>
        <span className={title({ color: "blue" })}>Detail</span>
      </div>
      {isFirstLoading ? (
        <FirstLoadSekeleton />
      ) : (
        <CardDetail
          branch={data.branchName}
          camera={data.cameraName}
          detectedAt={data.detectedAt}
          id={data.id}
          imageUrl={data.imageUrl}
          mediaUrl={data.mediaUrl}
          title={data.title}
          type={data.type}
        />
      )}
    </section>
  );
}
