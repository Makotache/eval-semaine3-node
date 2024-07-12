import { useState } from "react";
import { useAddProductMutation, useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import { useGetMaterialsQuery } from "../../redux/slices/materialsApiSlice";

const AddProduct = () =>
{
    const { data /*, error*/ } = useGetProductsQuery();
    const { data: dataMaterials, isLoading: isLoadingMaterials, isSuccess: isSuccessMaterials/*, error*/ } = useGetMaterialsQuery();

    const [addProduct] = useAddProductMutation();
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        description: "",
        count: "1",
        materials_id: []
    });
    const [error, setError] = useState(false);

    const onChangeHandler = (e) => 
    {
        if (e.target.id != "material")
        {
            setNewProduct({ ...newProduct, [e.target.id]: e.target.value });
        }
        else
        {
            const tmp = { ...newProduct };
            if (tmp.materials_id.includes(e.target.value))
            { return; }

            tmp.materials_id.push(parseInt(e.target.value))
            setNewProduct(tmp);
        }
    }

    const onSumbitHandler = async (e) => 
    {
        e.preventDefault();

        if (newProduct.name != "" && newProduct.materials_id.length > 0 && data.filter(existingProduct => existingProduct.name == newProduct.name).length == 0)
        {
            await addProduct(newProduct);
            window.location.reload();
        }
        else
        { setError(true); }
    }

    return (
        <form>
            {error && <span className="error">Une erreur est survenue</span>}
            <label htmlFor="name">Nom produit</label>
            <input name="name" id="name" type="text" value={newProduct.name} onChange={onChangeHandler} />

            <select name="category" id="category" value={newProduct.category} onChange={onChangeHandler}>
                <option value="">--Choisir une catégorie--</option>
                <option value="cupboard">Armoire</option>
                <option value="shelf">Etagère</option>
            </select>

            {newProduct.materials_id.length > 0 &&
                <span>Matériaux choisis : {dataMaterials.filter(material => newProduct.materials_id.includes(material.id)).map(material => material.name + " ")}</span>
            }

            <select name="material" id="material" onChange={onChangeHandler}>
                <option value="">--Choisir un matériau--</option>
                {!isLoadingMaterials && isSuccessMaterials && dataMaterials.filter(material => !newProduct.materials_id.includes(material.id)).map(material =>
                    <option key={material.id} value={material.id}>{material.name}</option>
                )}
            </select>



            <label htmlFor="description">Description</label>
            <input name="description" id="description" type="text" value={newProduct.description} onChange={onChangeHandler} />

            <label htmlFor="count">Quantité</label>
            <input name="count" id="count" type="number" min="1" value={newProduct.count} onChange={onChangeHandler} />

            <button type="button" onClick={onSumbitHandler}>OK</button>
        </form>

    );
}

export default AddProduct;