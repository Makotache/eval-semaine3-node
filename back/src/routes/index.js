import express from 'express'
import materialsRoutes from "./materialsRoutes.js";
import productsRoutes from "./productsRoutes.js";
import suppliersRoutes from "./suppliersRoutes.js";
import authRoutes from "./authRoutes.js"
const router = express.Router()

const tmp = (req, res, next) =>
{
    console.log("path :", req.originalUrl);
    console.log("session :", req.session.auth);
    next();
    return;
}

router.use('/materials', tmp, materialsRoutes)
router.use('/products', tmp, productsRoutes)
router.use('/suppliers', tmp, suppliersRoutes)
router.use('/auth', tmp, authRoutes)

export default router;