import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const user_id = process.env.NEXT_PUBLIC_EMAILJS_PK;

  if (service_id && template_id && user_id) {
    console.log("sendingemail");

    const template_params = {
      from_name: "hello",
      message: "hello",
      reply_to: "world",
    };

    var data = {
      service_id,
      template_id,
      user_id,
      template_params,
    };
    // only work on a browser not here
    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        console.log("res", res);
      })
      .catch((err) => console.log("err", err));
  }

  res.status(200).end(JSON.stringify({ message: "Send Mail" }));
}
