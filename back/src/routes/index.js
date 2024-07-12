import express from 'express'
import materialsRoutes from "./materialsRoutes.js";
import productsRoutes from "./productsRoutes.js";
import suppliersRoutes from "./suppliersRoutes.js";

const router = express.Router()

const tmp = (req, res, next) =>
{
    console.log(req.originalUrl);
    next();
    return;
}

router.use('/materials', tmp, materialsRoutes)
router.use('/products', tmp, productsRoutes)
router.use('/suppliers', tmp, suppliersRoutes)

export default router;