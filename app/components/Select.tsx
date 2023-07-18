// assuming you've declared Status like this:

enum Status {
  PENDING = "PENDING",
  TODO = "TODO",
  DONE = "DONE",
  DELETED = "DELETED",
}

enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

type SelectProps = {
  name: "status" | "priority";
};

const enums = {
  status: Object.values(Status),
  priority: Object.values(Priority),
};

export function Select({ name }: SelectProps) {
  const statusOptions = enums[name];
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      <span>{name}:</span>
      <select
        name={name}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {statusOptions.map((status) => {
          return (
            <option key={status} value={status}>
              {status}
            </option>
          );
        })}
      </select>
    </label>
  );
}
