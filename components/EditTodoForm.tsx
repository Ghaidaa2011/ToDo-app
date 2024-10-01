"use client";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { todoFormSchema, todoFormValues } from "@/validations";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import Spinner from "./Spinner";
import { ITodo } from "@/interfaces";
import { updateTodoAction } from "@/actions/todo.actions";
const EditTodoForm = ({ todo }: { todo: ITodo }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // This can come from your database or API.
  const defaultValues: Partial<todoFormValues> = {
    title: todo.title,
    body: todo.body as string,
    completed: todo.completed,
  };
  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = async (updatedTodo: todoFormValues) => {
    setLoading(true);
    await updateTodoAction({
      id: todo.id,
      title: updatedTodo.title,
      body: updatedTodo.body as string,
      completed: updatedTodo.completed,
    });
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="ml-auto">
        <Button size={"icon"}>
          <Pen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit this ToDo</DialogTitle>
        </DialogHeader>
        <div className=" py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Go to the GYM" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can write a short Description about your next todo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="mr-1">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Completed</FormLabel>
                    <FormDescription>
                      Your to-do item will be uncompleted by default unless you
                      checked it
                    </FormDescription>
                    <FormMessage />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner />
                    Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditTodoForm;
