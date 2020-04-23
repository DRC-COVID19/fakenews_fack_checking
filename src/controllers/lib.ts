import { Request, Response } from "express";
const {
  Types: { ObjectId },
} = require("mongoose");

export default function createAPIController(Model: any) {
  const findModelItemsAndSetCount = async (
    start: string,
    end: string,
    req: Request,
    res: Response
  ) => {
    const keyword: string = req.query.keyword as string;
    const filterArgs = keyword
      ? {
          $or: [
            { title: new RegExp(keyword, "i") },
            { content: new RegExp(keyword, "i") },
          ],
        }
      : {};

    const itemList = await Model.find(filterArgs)
      .sort({
        updatedAt: "desc",
        createdAt: "desc",
      })
      .skip(parseInt(start))
      .limit(parseInt(end) - parseInt(start));

    const totalCount = await Model.countDocuments({});
    res.set("x-total-count", totalCount.toString());
    return itemList.map((item: any) => ({
      ...item?.toObject(),
      id: item._id,
    }));
  };

  const findOneNewsAndSetCount = async (id: string, res: Response) => {
    res.set("x-total-count", "1");
    const item = await Model.findById(id);
    return {
      ...item?.toObject(),
      id: item?._id,
    };
  };

  return {
    getItems: async (req: Request, res: Response) => {
      res.header("Access-Control-Expose-Headers", "X-Total-Count");
      const query = req.query;
      const start = query._start as string;
      const end = query._end as string;
      const name = query.name as string;
      try {
        res.send(await findModelItemsAndSetCount(start, end, req, res));
      } catch (err) {
        return res.status(404).send("Error while getting Model");
      }
    },
    getOneItem: async (req: Request, res: Response) => {
      res.header("Access-Control-Expose-Headers", "X-Total-Count");
      const {
        params: { id },
      } = req;
      try {
        if (ObjectId.isValid(id)) {
          res.send(await findOneNewsAndSetCount(id, res));
        }
      } catch (err) {
        return res.status(404).send("Error while getting Model Item");
      }
    },
    putItem: async (req: Request, res: Response) => {
      const editedItem = await Model.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          updatedAt: Date.now(),
        },
        {
          new: true,
        }
      );
      if (!editedItem) return res.status(400).send("Invalid Id");
      res.send(editedItem);
    },
    postItem: async (req: Request, res: Response) => {
      try {
        const now = Date.now();
        let createdItem = new Model({
          ...req.body,
          createdAt: now,
          updatedAt: now,
        });
        createdItem = await createdItem.save();
        res.send(createdItem);
      } catch (error) {
        res.send("Error while creating Model item");
      }
    },
    deleteItem: async (req: Request, res: Response) => {
      try {
        const deleteItem = await Model.findByIdAndRemove(req.params.id);
        if (!deleteItem) return res.status(404).send("Model ID does not exist");
        res.send(deleteItem);
      } catch (error) {
        res.send("Error while deleting Model item");
      }
    },
  };
}
