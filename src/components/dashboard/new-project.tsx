"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { CalendarIcon, CircleDot, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "~/lib/utils";
import { Calendar } from "../ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Priority } from "@prisma/client";
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  lead: z.string().min(3, "Lead must be at least 3 characters long"),
  startdate: z.date(),
  deadline: z.date(),
  priority: z.enum([
    Priority.HIGH,
    Priority.LOW,
    Priority.MEDIUM,
    Priority.CRITICAL,
  ]),
  status: z.string().min(3, "Status must be at least 3 characters long"),
});

function NewProjectButton() {
  const [projectStep, setProjectStep] = useState(0);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      lead: "",
      startdate: undefined,
      deadline: undefined,
      priority: undefined,
      status: "",
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="flex items-center rounded border px-2 py-1"
        >
          create new project <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl sm:rounded">
        <DialogHeader>
          <DialogTitle>Create New Project.</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form action="">
              <div>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        {...field}
                        placeholder="Project Name"
                        className="rounded-none border-none text-3xl font-bold shadow-none outline-none placeholder:text-3xl placeholder:font-bold focus:ring-0 focus-visible:ring-0 md:text-3xl"
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full items-center gap-3 px-3 py-2">
                  <FormField
                    name="deadline"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-6 justify-start px-1 py-0 text-left text-xs font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon size={5} className="h-4 w-4" />
                              {field.value ? (
                                <span>{field.value.toDateString()}</span>
                              ) : (
                                <span>deadline</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              {...field}
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => field.onChange(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="startdate"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-6 justify-start px-1 py-0 text-left text-xs font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon size={5} className="h-4 w-4" />
                              {field.value ? (
                                <span>{field.value.toDateString()}</span>
                              ) : (
                                <span>deadline</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar {...field} mode="single" initialFocus />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lead"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-6 justify-start px-1 py-0 text-left text-xs font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon size={5} className="h-4 w-4" />
                              {field.value ? (
                                <span>{field.value}</span>
                              ) : (
                                <span>lead</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Command>
                              <CommandGroup>
                                <CommandEmpty>No lead</CommandEmpty>
                                <CommandList>
                                  <CommandItem>
                                    <span>Lead 1</span>
                                  </CommandItem>
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="priority"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-6 justify-start px-1 py-0 text-left text-xs font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value === Priority.HIGH ? (
                                <CircleDot
                                  size={5}
                                  className="h-4 w-4 text-red-500"
                                />
                              ) : field.value === Priority.LOW ? (
                                <CircleDot
                                  size={5}
                                  className="h-4 w-4 text-green-500"
                                />
                              ) : field.value === Priority.MEDIUM ? (
                                <CircleDot
                                  size={5}
                                  className="h-4 w-4 text-yellow-500"
                                />
                              ) : field.value === Priority.CRITICAL ? (
                                <CircleDot
                                  size={5}
                                  className="h-4 w-4 text-red-900"
                                />
                              ) : (
                                <CircleDot
                                  size={5}
                                  className="h-4 w-4 text-gray-500"
                                />
                              )}
                              {field.value ? (
                                <span>{field.value}</span>
                              ) : (
                                <span className="">priority</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Command>
                              <CommandGroup>
                                <CommandEmpty>No priority</CommandEmpty>
                                <CommandList>
                                  {Object.values(Priority).map((priority) => (
                                    <CommandItem
                                      key={priority}
                                      onSelect={() => field.onChange(priority)}
                                    >
                                      {priority}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="deadline"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-6 justify-start px-1 py-0 text-left text-xs font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon size={5} className="h-4 w-4" />
                              {field.value ? (
                                <span>{field.value.toDateString()}</span>
                              ) : (
                                <span>deadline</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar {...field} mode="single" initialFocus />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Textarea
                        {...field}
                        placeholder="Project Name"
                        rows={20}
                        className="rounded-none border-none text-xl shadow-none outline-none placeholder:text-xl focus:ring-0 focus-visible:ring-0 md:text-xl"
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewProjectButton;
