import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verifyAuth } from "@hono/auth-js";

import {
  projects as projectsSchema,
  projectsInsertSchema,
  projects,
} from "@/db/schema";
import { db } from "@/db/drizzle";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

const app = new Hono()
.get(
    "/",
    verifyAuth(),
    async(c)=>{
        return c.json({succesS:true})
    }
)
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data?.length === 0) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      projectsInsertSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { name, json, width, height } = c.req.valid("json");

      console.log(name, json, width, height);
      

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const creationDate = new Date();

      const data = await db
        .insert(projectsSchema)
        .values({
          name,
          json,
          width,
          height,
          userId: auth.token.id,
          createdAt: creationDate,
          updatedAt: creationDate,
        })
        .returning();

      console.log(data);

      if (!data.length) {
        return c.json({ error: "Something went wrong" }, 500);
      }

      return c.json({ data: data[0] });
    }
  );

export default app;
