"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

interface BreadcrumbProps {
  id?: string | null;
}
export default function Breadcrumb({ id }: BreadcrumbProps) {
  if (!id)
    return (
      <Breadcrumbs size="lg" variant="bordered">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
      </Breadcrumbs>
    );

  return (
    <Breadcrumbs size="lg" variant="bordered">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem isDisabled>Detail</BreadcrumbItem>
      <BreadcrumbItem># {id}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
