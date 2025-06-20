"use client";
import {
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import NoFile from "./NoFile";

export default function ImageHandler({ imageUrl }: { imageUrl: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!imageUrl) return <NoFile type="image" />;

  return (
    <>
      <Image
        alt="Fraud Image"
        className="object-contain cursor-pointer"
        src={imageUrl}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} size="full" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="w-full h-full flex items-center justify-center">
                <Image
                  alt="Fraud Image"
                  className="object-contain"
                  src={imageUrl}
                  onClick={onClose}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="bordered" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
