import { Select, SelectItem } from "@heroui/react";

export const branches = [
  { key: "12", label: "แมคโครลาดพร้าว" },
  { key: "13", label: "โลตัสนวมินทร์" },
  { key: "14", label: "โลตัสบางนาตราด" },
];

export default function BranchSelection({
  values,
  setValues,
}: {
  values: Set<string>;
  setValues: any;
}) {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues(new Set(e.target.value.split(",")));
  };

  return (
    <Select
      label="สาขา"
      placeholder="กรุณาเลือกสาขา"
      selectedKeys={values}
      selectionMode="multiple"
      size="md"
      onChange={handleSelectionChange}
    >
      {branches.map((branch) => (
        <SelectItem key={branch.key}>{branch.label}</SelectItem>
      ))}
    </Select>
  );
}
