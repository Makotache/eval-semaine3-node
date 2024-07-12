import { Materials, Products, ProductsMaterials, Suppliers, sequelize } from "../model/index.js";
import dotenv from "dotenv";
dotenv.config()



export async function all(req, res)
{
    try
    {
        const suppliers = await Suppliers.findAll();

        res.status(200).json(suppliers);
    }
    catch (error) 
    {
        console.error(error);
        res.status(500);
    }

}

export async function add(req, res)
{
    const { name } = req.body;

    try
    {
        // Ajouter un nouveau produit
        const newSupplier = await Suppliers.create({
            name
        });

        res.status(201).json(newSupplier);
    }
    catch (error) 
    {
        console.error(error);
        res.status(500);
    }

}

export async function update(req, res)
{
    const { id, name } = req.body;

    try
    {
        // Trouver le produit à mettre à jour
        const supplier = await Suppliers.findByPk(id);

        // Mettre à jour le produit avec les nouvelles valeurs
        await supplier.update({
            name
        });

        res.status(201).json(supplier);
    }
    catch (error) 
    {
        console.error(error);
        res.status(500);
    }

}