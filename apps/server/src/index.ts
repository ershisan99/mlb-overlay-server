import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";
import { auth } from "./lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as http from "node:http";
import { Server } from 'socket.io';

const app = new Hono();

app.use(logger());
app.use("/*", cors({
  origin: process.env.CORS_ORIGIN || "",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));


app.use("/trpc/*", trpcServer({
  router: appRouter,
  createContext: (_opts, context) => {
    return createContext({ context });
  },
}));



app.get("/", (c) => {
  return c.text("OK");
});

app.post("/", async (c) => {
  const data = await c.req.json();
  console.log('post received', 'body: ', data);
  
  io.emit('event', data);
  
  return c.text("OK");
});
const httpServer = http.createServer();
const io = new Server(httpServer,{  cors: {
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }});

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log('message received', data);
  });
});

httpServer.listen(4000, () => {
  console.log('ws listening on *:4000');
});

export default app;
