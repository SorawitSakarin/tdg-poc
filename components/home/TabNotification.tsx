"use client";
import { Tabs, Tab, Spinner } from "@heroui/react";
import { TbMeat } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
import { RiAlertLine } from "react-icons/ri";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface TabNotificationProps {
  setType: (type: string) => void;
  type: string;
  isLoading: boolean;
}

export default function TabNotification({
  setType,
  type,
  isLoading,
}: TabNotificationProps) {
  const searchParams = useSearchParams();

  const channel = searchParams.get("channel");

  useEffect(() => {
    if (!channel) setType("shoplifter");
    if (channel === "unusualPickingBehavior") setType("shoplifter");
    if (channel === "insufficientFreshFood") setType("freshfood");
    if (channel === "unusualSafeOpening") setType("cashroom");
  }, [channel]);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        fullWidth
        aria-label="Options"
        color="primary"
        selectedKey={type}
        variant="bordered"
        onSelectionChange={(key) => setType(key.toString())}
      >
        <Tab
          key="shoplifter"
          title={
            <div className="flex items-center space-x-2">
              {isLoading ? (
                <Spinner color="default" size="sm" />
              ) : (
                <RiAlertLine />
              )}
              <span>Shoplifter</span>
            </div>
          }
          onChange={() => setType("shoplifter")}
        />
        <Tab
          key="freshfood"
          title={
            <div className="flex items-center space-x-2">
              {isLoading ? <Spinner color="default" size="sm" /> : <TbMeat />}
              <span>Fresh Food</span>
            </div>
          }
          onChange={() => setType("freshfood")}
        />
        <Tab
          key="cashroom"
          title={
            <div className="flex items-center space-x-2">
              {isLoading ? (
                <Spinner color="default" size="sm" />
              ) : (
                <BsCashCoin />
              )}
              <span>Cash Room</span>
            </div>
          }
          onChange={() => setType("cashroom")}
        />
      </Tabs>
    </div>
  );
}
