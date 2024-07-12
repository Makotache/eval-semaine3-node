import { Materials, Products, ProductsMaterials, Suppliers, sequelize } from "../model/index.js";
import dotenv from "dotenv";
dotenv.config()



export async function all(req, res)
{
    try
    {
        const products = await Products.findAll({
            include: {
                model: Materials,
                through: { attributes: [] } // Pour ne pas inclure les champs de la table de jointure
            }
        });

        res.status(200).json(products);
    }
    catch (error) 
    {
        console.error(error);
        res.status(500);
    }

}

export async function add(req, res)
{
    const { name, category, description, count, materials_id } = req.body;

    try
    {
        // Ajouter un nouveau produit
        const newProduct = await Products.create({
            name,
            category,
            description,
            count
        });

        materials_id.forEach(material_id =>
        {
            ProductsMaterials.create({
                product_id: newProduct.id,
                material_id: material_id,
            })
        });

        res.status(201).json(newProduct);
    }
    catch (error) 
    {
        console.error(error);
        res.status(500);
    }

}

export async function update(req, res)
{
    const { id, name, category, description, count } = req.body;

    try
    {

        // Trouver le produit à mettre à jour
        const product = await Products.findByPk(id);

        // Mettre à jour le produit avec les nouvelles valeurs
        await product.update({
            name,
            category,
            description,
            count
        });

        res.status(201).json(product);
    }
    catch (error) 
    {
        console.error(error);
        res.status(500);
    }

}