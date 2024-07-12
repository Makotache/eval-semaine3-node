import { Materials, Products, ProductsMaterials, Suppliers, sequelize } from "../model/index.js";
import dotenv from "dotenv";
dotenv.config()



export async function all(req, res)
{
	try
	{
		const materials = await Materials.findAll();

		res.status(200).json(materials);
	}
	catch (error) 
	{
		console.error(error);
		res.status(500);
	}

}

export async function statistics(req, res)
{
	try
	{
		//nombre total d'utilisation des materiaux
		//nombre de matériaux utilisé par les produits

		const products_materials = (await ProductsMaterials.findAll()).map(dataResult => dataResult.toJSON());
		const materials = (await Materials.findAll()).map(dataResult => dataResult.toJSON());
		const products = (await Products.findAll()).map(dataResult => dataResult.toJSON());

		//pour chaque "types" de produit
		const byProductsTypes_totalMaterialsUsed = [];
		materials.forEach(material =>
		{
			byProductsTypes_totalMaterialsUsed.push({
				name: material.name,
				count: products_materials.filter(product_material => product_material.material_id == material.id).length
			});
		})


		const byProductsTypes_countMaterialsUsedByProduct = []
		products.forEach(product => 
		{
			const countMaterial = products_materials.filter(product_material => product_material.product_id == product.id).length;
			const index_countMatProd = byProductsTypes_countMaterialsUsedByProduct.findIndex(countMatProd => countMatProd.countMaterial == countMaterial);

			if (index_countMatProd == -1)
			{ byProductsTypes_countMaterialsUsedByProduct.push({ countMaterial, countProduct: 1 }); }
			else
			{ byProductsTypes_countMaterialsUsedByProduct[index_countMatProd].countProduct++; }
		})


		//pour chaque produits
		const forEachProducts_totalMaterialsUsed = [];
		materials.forEach(material =>
		{
			let count = 0;
			products_materials.forEach(product_material =>
			{
				if (product_material.material_id == material.id)
				{
					count += products.filter(product => product.id == product_material.product_id)[0].count;
				}
			});

			forEachProducts_totalMaterialsUsed.push({
				name: material.name,
				count: count
			});
		})


		const forEachProducts_countMaterialsUsedByProduct = []
		products.forEach(product => 
		{
			const countMaterial = products_materials.filter(product_material => product_material.product_id == product.id).length;
			const index_countMatProd = forEachProducts_countMaterialsUsedByProduct.findIndex(countMatProd => countMatProd.countMaterial == countMaterial);

			if (index_countMatProd == -1)
			{ forEachProducts_countMaterialsUsedByProduct.push({ countMaterial, countProduct: product.count }); }
			else
			{ forEachProducts_countMaterialsUsedByProduct[index_countMatProd].countProduct += product.count; }
		})

		const result = {
			//pour chaque "types" de produit
			byProductsTypes_totalMaterialsUsed,// []{name, count} 
			byProductsTypes_countMaterialsUsedByProduct,// []{countMaterial, countProduct}
			//pour chaque produits
			forEachProducts_totalMaterialsUsed,// []{name, count} 
			forEachProducts_countMaterialsUsedByProduct// []{countMaterial, countProduct}
		}


		res.status(200).json(result);
	}
	catch (error) 
	{
		console.error(error);
		res.status(500);
	}

}



export async function add(req, res)
{
	const { name, description, supplier_id } = req.body;

	try
	{

		// Ajouter un nouveau produit
		const newMaterial = await Materials.create({
			name,
			description,
			supplier_id
		});

		res.status(201).json(newMaterial);
	}
	catch (error) 
	{
		console.error(error);
		res.status(500);
	}

}

export async function update(req, res)
{
	const { id, name, description, supplier_id } = req.body;

	try
	{

		// Trouver le produit à mettre à jour
		const material = await Materials.findByPk(id);

		// Mettre à jour le produit avec les nouvelles valeurs
		await material.update({
			name,
			description,
			supplier_id
		});

		res.status(201).json(material);
	}
	catch (error) 
	{
		console.error(error);
		res.status(500);
	}

}