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
    select: string,
    sort: Object = {
      updatedAt: "desc",
      createdAt: "desc",
    }
  ) => {
    const itemList = await Model.find(filterArgs)
      .sort(sort)
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

  const cleanRaId = (args: any) => {
    if (args.id) {
      const { id, ...rest } = args;
      return {
        ...rest,
        _id: id?.length ? { $in: id } : id,
      };
    }
    return args;
  };

  return {
    getItems: async (req: Request, res: Response) => {
      res.header("Access-Control-Expose-Headers", "X-Total-Count");
      const { query } = req;
      const { _start, _end, _sort, _order, select, ...args } = query;
      const sort = { [_sort as string]: _order };

      try {
        const { items, totalCount } = await findModelItemsAndCount(
          cleanRaId(args),
          _start,
          _end,
          select as string,
          sort
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
    findModelItemsAndCount,
  };
}
