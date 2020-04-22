import express from "express";

export default function createAPIRouter(controller: any) {
  const router = express.Router();
  router.get("/", controller.getItems);
  router.get("/:id", controller.getOneItem);
  router.put("/:id", controller.putItem);
  router.post("/", controller.postItem);
  router.delete("/:id", controller.deleteItem);
  return router;
}
