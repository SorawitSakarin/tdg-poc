"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Code,
  Textarea,
  Input,
  Switch,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { evaluateConditionTree } from "../config-notification/EvaluateConditionTree";

interface EditModalProps {
  isOpenEdit: boolean;
  onOpenChangeEdit: (isOpen: boolean) => void;
  selectedData: any;
  setSelectedData: (data: any) => void;
}

export default function EditModal({
  isOpenEdit,
  onOpenChangeEdit,
  selectedData,
  setSelectedData,
}: EditModalProps) {
  const [updatedConditions, setUpdatedConditions] = useState<string>(
    JSON.stringify(selectedData?.conditions) || ""
  );
  const [errorMessage, setErrorMessage] = useState<string>();

  const updateHandler = async () => {
    const payload = {
      title: selectedData?.title,
      type: selectedData?.type,
      priority: Number(selectedData?.priority),
      conditions: JSON.parse(updatedConditions),
      isActive: selectedData?.isActive,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v2/notifications/configs/${selectedData?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const err = await response.json();

      setErrorMessage(err.message);
    } else {
      onOpenChangeEdit(false);
      window.location.reload();
    }
  };

  const tryParseJSON = (str: string): any => {
    try {
      const parsed = JSON.parse(str);
      // Ensure it's an object or array, not just a number or string

      if (typeof parsed === "object" && parsed !== null) {
        return parsed;
      }
    } catch {
      // If error, return the original string
    }

    return str;
  };

  useEffect(() => {
    setUpdatedConditions(JSON.stringify(selectedData?.conditions));
  }, [selectedData]);

  return (
    <Modal
      isOpen={isOpenEdit && !!selectedData}
      scrollBehavior="outside"
      size="5xl"
      onOpenChange={onOpenChangeEdit}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Config Id: {selectedData?.id}
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Switch
                color="success"
                isSelected={selectedData?.isActive}
                onValueChange={(value) =>
                  setSelectedData({ ...selectedData, isActive: value })
                }
              >
                Active
              </Switch>
              <Input
                label="Title"
                placeholder="Enter your title"
                value={selectedData?.title}
                variant="underlined"
                onValueChange={(value) =>
                  setSelectedData({ ...selectedData, title: value })
                }
              />
              <Input
                label="Type"
                placeholder="Enter your type"
                value={selectedData?.type}
                variant="underlined"
                onValueChange={(value) =>
                  setSelectedData({ ...selectedData, type: value })
                }
              />
              <Input
                label="Priority"
                placeholder="Enter your priority"
                value={selectedData?.priority}
                variant="underlined"
                onValueChange={(value) =>
                  setSelectedData({ ...selectedData, priority: value })
                }
              />
              {/* {evaluateConditionTree(tryParseJSON(updatedConditions))} */}
              <div className="flex flex-row gap-2">
                <div className="w-1/2 min-h-[50vh]">
                  <Textarea
                    label="Conditions"
                    placeholder="Enter your conditions"
                    size="lg"
                    value={updatedConditions}
                    variant="underlined"
                    onValueChange={(value) => setUpdatedConditions(value)}
                  />
                </div>
                <Code className="w-1/2 ">
                  <pre>
                    {JSON.stringify(tryParseJSON(updatedConditions), null, 2)}
                  </pre>
                </Code>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center gap-2 ">
              {errorMessage && (
                <h4 className="text-red-500 text-center">{errorMessage}</h4>
              )}
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={updateHandler}>
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
