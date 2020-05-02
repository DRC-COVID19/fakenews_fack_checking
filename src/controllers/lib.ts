import { Request, Response } from "express";
import qs from "qs";

const {
  Types: { ObjectId },
} = require("mongoose");

export default function createAPIController(Model: any) {
  const findModelItemsAndCount = async (
    filterArgs: Object,
    start: any,
    end: any,
    select: string
  ) => {
    const itemList = await Model.find(filterArgs)
      .sort({
        updatedAt: "desc",
        createdAt: "desc",
      })
      .skip(parseInt(start))
      .limit(parseInt(end) - parseInt(start))
      .select(select)
      .exec();
    const totalCount = await Model.countDocuments(filterArgs);
    return {
      items: itemList.map((item: any) => ({
        ...item?.toObject(),
        id: item._id,
      })),
      totalCount,
    };
  };

  const findOneAndSetCount = async (id: string, res: Response) => {
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
      const { query } = req;
      const start = query._start as string;
      const end = query._end as string;
      const select = query.select as string;
      const filterArgs = qs.parse(query.args as string);
      try {
        const { items, totalCount } = await findModelItemsAndCount(
          filterArgs,
          start,
          end,
          select
        );
        res.set("x-total-count", totalCount.toString());
        res.send(items);
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
          res.send(await findOneAndSetCount(id, res));
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
        await Model.create(
          {
            ...req.body,
            createdAt: now,
            updatedAt: now,
          },
          function (err: any, createdItem: any) {
            if (err) return console.log(err);
            // saved!
            res.send(createdItem);
          }
        );
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
    findModelItemsAndCount
  };
}
