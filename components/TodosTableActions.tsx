"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { deleteTodoAction } from "@/actions/todo.actions";
import { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import { ITodo } from "@/interfaces";

const TodosTableActions = ({ todo }: { todo: ITodo }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <EditTodoForm todo={todo} />

      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction({ id: todo.id as string });
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : <TrashIcon size={16} />}
      </Button>
    </>
  );
};
export default TodosTableActions;
