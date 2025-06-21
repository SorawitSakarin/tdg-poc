"use client";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { LuMapPin } from "react-icons/lu";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { TbMeat } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
import { RiAlertLine } from "react-icons/ri";

import ImageHandler from "@/components/detail/ImageHandler";
import NoFile from "@/components/detail/NoFile";

interface CardDetailProps {
  title: string;
  type: string;
  detectedAt: string;
  camera: string;
  branch: string;
  mediaUrl: string;
  imageUrl: string;
  id: string;
}
export default function CardDetail({
  title,
  type,
  detectedAt,
  camera,
  branch,
  mediaUrl,
  imageUrl,
  id,
}: CardDetailProps) {
  return (
    <Card className="border-none p-2 w-full" radius="lg">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          {type === "unusualPickingBehavior" ? (
            <RiAlertLine />
          ) : type === "insufficientFreshFood" ? (
            <TbMeat />
          ) : (
            <BsCashCoin />
          )}
          <h4 className="font-bold text-large">{title}</h4>
        </div>
        <p className="text-tiny uppercase font-bold">{detectedAt}</p>
        <div className="flex flex-row md:h-8 items-center md:space-x-4 text-small flex-wrap">
          <div className="w-full md:w-auto"># {id}</div>
          <Divider className="hidden md:block" orientation="vertical" />
          <div className="flex w-full md:w-auto items-center gap-1">
            <LuMapPin />
            {branch}
          </div>
          <Divider className="hidden md:block" orientation="vertical" />
          <div className="flex w-full md:w-auto items-center gap-1">
            <TbDeviceComputerCamera />
            {camera}
          </div>
        </div>
      </CardHeader>
      <CardBody className="w-full">
        <div className="w-full flex flex-col md:flex-row gap-2">
          <div className="w-full flex items-center justify-center">
            <ImageHandler imageUrl={imageUrl} />
          </div>
          <div className="w-full flex items-center justify-center">
            {mediaUrl ? (
              <video autoPlay controls loop muted height="auto" width="100%">
                <source src={mediaUrl} type="video/mp4" />
              </video>
            ) : (
              <NoFile type="video" />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
