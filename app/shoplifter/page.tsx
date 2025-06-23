"use client";
import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

import { title } from "@/components/primitives";
import BranchSelection from "@/components/home/BrachSelection";
import FirstLoadSekeleton from "@/components/home/FirstLoadSekeleton";
import DataTable from "@/components/home/DataTable";

interface Props {
  type?: string;
  header?: string;
}
export default function Page({
  type = "shoplifter",
  header = "Fraud Shoplifter",
}: Props) {
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [branchIds, setBranchIds] = useState(new Set([]));
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        branchIds: Array.from(branchIds).join(","),
        type,
        current: current.toString(),
        pageSize: pageSize.toString(),
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v2/notifications/tdg-poc?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        router.push("/not-found");
      }
      const data = await response.json();

      setData(data.data);
      setCurrent(data.pagination.current);
      setTotal(Math.ceil(data.pagination.total / data.pagination.pageSize));
      setPageSize(data.pagination.pageSize);
    };

    fetchData();
  }, [current, branchIds]);

  useEffect(() => {
    const fetchData = async () => {
      setIsFirstLoading(true);
      const params = new URLSearchParams({
        type,
        current: current.toString(),
        pageSize: pageSize.toString(),
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v2/notifications/tdg-poc?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        setIsFirstLoading(false);
        router.push("/not-found");
      }
      const data = await response.json();

      setData(data.data);
      setIsFirstLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-start justify-start gap-8">
      <div className="inline-block max-w-xl text-left justify-center md:whitespace-nowrap">
        <span className={title()}>Notification&nbsp;</span>
        <span className={title({ color: "blue" })}>{header}</span>
      </div>
      <Card className="w-full shadow-lg">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-3 w-full p-2 items-end">
            <BranchSelection setValues={setBranchIds} values={branchIds} />
          </div>
        </CardBody>
      </Card>
      <div className="flex flex-col w-full">
        {isFirstLoading ? (
          <FirstLoadSekeleton />
        ) : (
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col w-full">
              <DataTable data={data} />
            </div>
            {data.length > 0 && total > 0 && (
              <Pagination
                showControls
                initialPage={1}
                page={current}
                total={total}
                onChange={setCurrent}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
