import { Form } from "@remix-run/react";
import { Select } from "./Select";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 m-4 max-w-md max-h-full text-center overflow-auto">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Add Task</h2>
        <Form method="post">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span>Title:</span>
              <input
                type="text"
                name="title"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-4">
            <Select name="status" />
          </div>
          <div className="mb-6">
            <Select name="priority" />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
