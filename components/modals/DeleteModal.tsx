"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Code,
} from "@heroui/react";
import { useState } from "react";

import { evaluateConditionTree } from "../config-notification/EvaluateConditionTree";

interface DeleteModalProps {
  isOpenDelete: boolean;
  onOpenChangeDelete: (isOpen: boolean) => void;
  selectedData: any;
}

export default function DeleteModal({
  isOpenDelete,
  onOpenChangeDelete,
  selectedData,
}: DeleteModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>();

  const deleteConfirm = async (id: string | null) => {
    if (!id) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v2/notifications/configs/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      const err = await response.json();

      setErrorMessage(err.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <Modal
      isOpen={isOpenDelete && !!selectedData}
      scrollBehavior="outside"
      size="5xl"
      onOpenChange={onOpenChangeDelete}
      className="overflow-x-auto"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Config Id: {selectedData?.id}
            </ModalHeader>
            <ModalBody>
              <p>Title: {selectedData?.title}</p>
              <p>Type: {selectedData?.type}</p>
              <p>Conditions:</p>
              <Code>
                <pre>{JSON.stringify(selectedData?.conditions, null, 2)}</pre>
              </Code>
              {evaluateConditionTree(selectedData?.conditions)}
            </ModalBody>
            <ModalFooter className="flex items-center gap-2 ">
              {errorMessage && (
                <h4 className="text-red-500 text-center">{errorMessage}</h4>
              )}
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => deleteConfirm(selectedData?.id || null)}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
