import { Request, Response } from "express";

export default {
  async showVerificationRequest(req: Request, res: Response) {
    return res.render("pages/news/request-factcheck-form", {
      title: "Faire vérifier une information",
      description:
        "Soumettre une information afin qu'elle puisse etre vérifié par un fact checker",
      url: "",
      image: null,
    });
  },
};
