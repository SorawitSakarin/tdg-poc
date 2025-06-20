import Image from "next/image";

interface NoFileProps {
  type: "image" | "video";
}

export default function NoFile({ type }: NoFileProps) {
  return (
    <div className="flex flex-col items-center gap-4 justify-center w-full h-full bg-neutral-200 rounded-lg py-24 text-neutral-600">
      <Image alt="no-file" height={180} src="/no-file.svg" width={180} />
      <p className="text-18 leading-24 font-semibold">
        {type === "image"
          ? "ไม่มีรูปภาพของการแจ้งเตือนนี้"
          : "ไม่มีวิดีโอของการแจ้งเตือนนี้"}
      </p>
    </div>
  );
}
