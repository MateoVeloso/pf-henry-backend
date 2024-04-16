import { Router } from "express";
import { mercadoControllers } from "../../controllers/index.js";

const ACCESS_TOKEN =
  "TEST-8325916074213905-041120-4055cd09b453e71a2e63f60b35942659-1756430153";
const router = Router();

router.post("/", mercadoControllers.postMercadoSale);
router.post("/webhook", async function (req, res = response) {
  console.log(req.query);
  const paymentId = req.query.id;
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log(response.ok);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
