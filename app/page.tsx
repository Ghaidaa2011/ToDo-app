import { getUserTodoListAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import TodoTable from "@/components/TodosTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();
  const todos = await getUserTodoListAction({ userId });
  return (
    <main className="container">
      <div className="mx-auto flex w-full lg:w-3/4 flex-col justify-center space-y-4">
        <AddTodoForm userId={userId} />
        <TodoTable todos={todos} />
      </div>
    </main>
  );
}
