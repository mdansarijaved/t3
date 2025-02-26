import { db } from "~/server/db";

await db.user.deleteMany({
  where: {
    referralToken: "something",
  },
});
