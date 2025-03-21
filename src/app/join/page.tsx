"use client";
import { useSession } from "next-auth/react";
import React, { useActionState } from "react";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createOrganisation } from "../actions/organisation";

function CreateOrganisation() {
  const { data: session } = useSession();
  const [message, formAction, isPending] = useActionState(
    createOrganisation,
    undefined,
  );

  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center">
      <div className="absolute left-10 top-10">
        <Logo />
      </div>
      <div className="absolute right-10 top-10 text-sm">
        <span className="text-xs text-muted-foreground">Logged in as: </span>
        <p>{session?.user.email}</p>
      </div>
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-center text-3xl font-medium">
          Create Organisation
        </h1>

        <form
          action={formAction}
          className="w-full max-w-md space-y-3 rounded-lg border p-6 shadow-md"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={message?.fieldData?.name}
              className={`${message?.error?.name ? "border-red-500" : ""}`}
            />
            {message?.error?.name && (
              <span className="text-xs text-red-500">
                {message?.error?.name}
              </span>
            )}
          </div>

          <Button disabled={isPending} className="w-full">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateOrganisation;
