"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";
import { Link, Button } from "@heroui/react";

import { title } from "@/components/primitives";
import CardDetail from "@/components/detail/CardDetail";
import FirstLoadSekeleton from "@/components/detail/FirstLoadSekeleton";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [prevData, setPrevData] = useState<any>();
  const [nextData, setNextData] = useState<any>();
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
            "Organization-Id": "1",
          },
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        setIsFirstLoading(false);
        router.push("/not-found");
      }
      const data: any = await response.json();

      setData(data?.data || data);
      setPrevData(data?.prevData);
      setNextData(data?.nextData);
      setIsFirstLoading(false);
    };

    fetchData();
  }, []);

  const channel =
    data.type === "unusualPickingBehavior"
      ? "shoplifter"
      : data.type === "insufficientFreshFood"
        ? "freshfood"
        : data.type === "openLid"
          ? "openlid"
          : data.type === "unusualSafeOpening"
            ? "cashroom"
            : data.type === "staffNotWeighingArea" ||
              data.type === "staffNotCashierArea"
              ? "onduty"
              : "shoplifter";

  return (
    <section className="flex flex-col items-start justify-start gap-8">
      <div className="inline-block max-w-xl text-left justify-center md:whitespace-nowrap">
        <span className={title()}>Notification&nbsp;</span>
        <span className={title({ color: "blue" })}>Detail</span>
      </div>

      <Button
        as={Link}
        href={`/${channel}?branchId=${data.branch}`}
        startContent={<MdOutlineArrowBack />}
        variant="bordered"
      >
        Back to Home
      </Button>

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
      <div className="flex gap-2 w-full justify-between">
        {prevData && (
          <Button
            as={Link}
            color="primary"
            href={`/detail/${prevData}`}
            startContent={<MdOutlineArrowBack />}
            variant="solid"
          >
            Previous
          </Button>
        )}
        {nextData && (
          <Button
            as={Link}
            color="primary"
            endContent={<MdOutlineArrowForward />}
            href={`/detail/${nextData}`}
            variant="solid"
          >
            Next
          </Button>
        )}
      </div>
    </section>
  );
}
