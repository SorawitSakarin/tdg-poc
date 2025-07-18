export interface LogicNode {
  logic?: "AND" | "OR"; // default AND
  conditions: (LogicNode | SingleCondition)[];
}

export interface SingleCondition {
  field: string;
  operator:
    | "="
    | "!="
    | "!=="
    | ">="
    | "<="
    | ">"
    | "<"
    | "in"
    | "not in"
    | "like"
    | "isTimeSameOrAfter"
    | "isTimeSameOrBefore";
  value: any;
}

export const evaluateConditionTree = (node: LogicNode | SingleCondition) => {
  if ("conditions" in node) {
    const logic = node?.logic ?? "AND";

    if (logic === "AND") {
      return (
        <div
          key={Math.random()}
          className="flex flex-row gap-2 border border-[#000] rounded p-2 w-fit"
        >
          {node.conditions.map((c, index) => {
            return (
              <div key={Math.random()} className="flex gap-2 items-center">
                {evaluateConditionTree(c)}
                {index < node.conditions.length - 1 && (
                  <p className="text-center">{logic}</p>
                )}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div
          key={Math.random()}
          className="flex flex-col gap-2 border border-[#000] rounded p-2 w-fit"
        >
          {node.conditions.map((c, index) => {
            return (
              <div key={Math.random()} className="flex flex-col gap-2 ">
                {evaluateConditionTree(c)}
                {index < node.conditions.length - 1 && (
                  <p className="text-center">{logic}</p>
                )}
              </div>
            );
          })}
        </div>
      );
    }
  }

  return OperatorComponent(node);
};

const OperatorComponent = ({ field, operator, value }: SingleCondition) => {
  return (
    <div
      key={Math.random()}
      className="flex gap-2 p-2 bg-[#f1f1f1] rounded w-fit"
    >
      <div className="flex items-center border rounded border-[#000] p-2">
        <p>{field}</p>
      </div>
      <div className="flex items-center border rounded border-[#000] p-2">
        <p>{operator}</p>
      </div>
      <div className="flex items-center border rounded border-[#000] p-2">
        <p>{Array.isArray(value) ? value.join(", ") : value}</p>
      </div>
    </div>
  );
};
