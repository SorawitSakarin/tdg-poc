"use client";

import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import DeleteModal from "@/components/modals/DeleteModal";
import EditModal from "@/components/modals/EditModal";
import {
  LogicNode,
  evaluateConditionTree,
} from "@/components/config-notification/EvaluateConditionTree";
import { title } from "@/components/primitives";
import CreateModal from "@/components/modals/CreateModal";

interface Config {
  id: string;
  title: string;
  type: string;
  priority: number;
  conditions: LogicNode;
  isActive: boolean;
}
export default function Home() {
  const [data, setData] = useState<Config[]>();
  const [selectedData, setSelectedData] = useState<Config>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v2/notifications/configs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );
      const data = await response.json();

      setData(data);
    };

    fetchData();
  }, []);

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onOpenChange: onOpenChangeCreate,
  } = useDisclosure();

  const deleteHandler = async (id: string) => {
    setSelectedData(data?.find((item) => item.id == id));
    onOpenDelete();
  };

  const editHandler = async (id: string) => {
    setSelectedData(data?.find((item) => item.id == id));
    onOpenEdit();
  };

  const renderCell = useCallback(
    (item: any, columnKey: string) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "conditions":
          return evaluateConditionTree(item.conditions);
        case "isActive":
          return item.isActive ? (
            <Chip color="success" variant="solid">
              Active
            </Chip>
          ) : (
            <Chip color="danger" variant="solid">
              Inactive
            </Chip>
          );
        case "actions":
          return (
            <div className="flex gap-2">
              <Button
                color="primary"
                size="sm"
                variant="solid"
                onPress={() => editHandler(item.id)}
              >
                Edit
              </Button>
              <Button
                color="danger"
                size="sm"
                variant="solid"
                onPress={() => deleteHandler(item.id)}
              >
                Delete
              </Button>
            </div>
          );
        case "type":
        case "priority":
        default:
          return <p>{cellValue}</p>;
      }
    },
    [data]
  );

  const columns = [
    { name: "", uid: "actions" },
    { name: "Active", uid: "isActive" },
    { name: "Priority", uid: "priority" },
    { name: "Title", uid: "title" },
    { name: "Type", uid: "type" },
    { name: "Conditions", uid: "conditions" },
  ];

  return (
    <section className="flex flex-col items-start justify-start gap-8">
      <div className="inline-block max-w-xl text-left justify-center md:whitespace-nowrap">
        <span className={title()}>Notification&nbsp;</span>
        <span className={title({ color: "blue" })}>Configs</span>
      </div>
      {data && (
        <Table aria-label="Data table" shadow="sm">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          {data.length === 0 ? (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          ) : (
            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.id} className="p-2 ">
                  {(columnKey) => (
                    <TableCell className="whitespace-nowrap">
                      {renderCell(item, columnKey.toString())}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      )}

      <Button
        color="primary"
        endContent={<FaPlus />}
        variant="shadow"
        onPress={onOpenCreate}
      >
        New Config
      </Button>

      {/*Delete Modal */}
      <DeleteModal
        isOpenDelete={isOpenDelete}
        selectedData={selectedData}
        onOpenChangeDelete={onOpenChangeDelete}
      />

      {/*Edit Modal */}
      <EditModal
        isOpenEdit={isOpenEdit}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        onOpenChangeEdit={onOpenChangeEdit}
      />

      {/*Create Modal */}
      <CreateModal
        isOpenCreate={isOpenCreate}
        onOpenChangeCreate={onOpenChangeCreate}
      />
    </section>
  );
}
