import { handle } from "hono/vercel";
import { Hono,Context } from "hono";

import images from "./images";
import ai from "./ai";
import users from "./users";
import projects from './projects';

import { AuthConfig, initAuthConfig } from '@hono/auth-js';

import authConfig from '@/auth.config';

export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig as any
  };
}

const app = new Hono().basePath("/api");

app.use('*', initAuthConfig(getAuthConfig));


const routes = app
  .route("/images", images)
  .route("/ai", ai)
  .route("/users", users)
  .route('/projects', projects);

export type AppType = typeof routes;
export const GET = handle(app);
export const POST = handle(app);
