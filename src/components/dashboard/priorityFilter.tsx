import { CheckIcon, ListFilter } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/utils";

const options = [
  {
    label: "Low",
    value: "low",
    icon: <div className="h-2 w-2 rounded-full bg-green-500"></div>,
  },
  {
    label: "Medium",
    value: "medium",
    icon: <div className="h-2 w-2 rounded-full bg-yellow-500"></div>,
  },
  {
    label: "High",
    value: "high",
    icon: <div className="h-2 w-2 rounded-full bg-red-500"></div>,
  },
  {
    label: "Critical",
    value: "critical",
    icon: <div className="h-2 w-2 rounded-full bg-red-700"></div>,
  },
];

function PriorityFilter() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>Priority</div>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-center gap-1">
              <ListFilter />
              <Separator orientation="vertical" className="h-7" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[120px] p-0">
            <Command className="">
              <CommandList className="rounded-none">
                <CommandEmpty>No results</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className="cursor-pointer gap-1"
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>

                        <span>{option.label}</span>
                        {option.icon && (
                          <div className="ml-auto">{option.icon}</div>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default PriorityFilter;
