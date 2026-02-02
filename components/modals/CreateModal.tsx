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

interface CreateModalProps {
  isOpenCreate: boolean;
  onOpenChangeCreate: (isOpen: boolean) => void;
}

export default function CreateModal({
  isOpenCreate,
  onOpenChangeCreate,
}: CreateModalProps) {
  const [updatedConditions, setUpdatedConditions] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createdData, setCreatedData] = useState({
    title: "",
    type: "",
    priority: 0,
    conditions: {},
    isActive: false,
  });

  const createHandler = async () => {
    const payload = {
      title: createdData?.title,
      type: createdData?.type,
      priority: Number(createdData?.priority),
      conditions: JSON.parse(updatedConditions),
      isActive: createdData?.isActive,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v2/notifications/configs`,
      {
        method: "POST",
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
      onOpenChangeCreate(false);
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

  // useEffect(() => {
  //   setUpdatedConditions(JSON.stringify(createdData?.conditions));
  // }, [createdData]);

  return (
    <Modal
      isOpen={isOpenCreate}
      scrollBehavior="outside"
      size="5xl"
      onOpenChange={onOpenChangeCreate}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Config
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Switch
                color="success"
                isSelected={createdData.isActive}
                onValueChange={(value) =>
                  setCreatedData({ ...createdData, isActive: value })
                }
              >
                Active
              </Switch>
              <Input
                label="Title"
                placeholder="Enter your title"
                value={createdData.title}
                variant="underlined"
                onValueChange={(value) =>
                  setCreatedData({ ...createdData, title: value })
                }
              />
              <Input
                label="Type"
                placeholder="Enter your type"
                value={createdData.type}
                variant="underlined"
                onValueChange={(value) =>
                  setCreatedData({ ...createdData, type: value })
                }
              />
              <Input
                label="Priority"
                placeholder="Enter your priority"
                type="number"
                value={String(createdData.priority)}
                variant="underlined"
                onValueChange={(value) =>
                  setCreatedData({ ...createdData, priority: Number(value) })
                }
              />
              {/* {evaluateConditionTree(tryParseJSON(updatedConditions))} */}
              <div className="flex flex-row gap-2">
                <div className="w-1/2">
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
              <Button color="primary" onPress={createHandler}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
