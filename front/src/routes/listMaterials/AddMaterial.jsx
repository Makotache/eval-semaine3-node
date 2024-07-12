import { useState } from "react";
import { useAddMaterialMutation, useGetMaterialsQuery } from "../../redux/slices/materialsApiSlice";
import { useGetSuppliersQuery } from "../../redux/slices/suppliersApiSlice";
import { useNavigate } from "react-router-dom";

const AddMaterial = () =>
{
    const naviation = useNavigate();
    const { data } = useGetMaterialsQuery();
    const { data: dataSuppliers, isLoading, isSuccess/*, error*/ } = useGetSuppliersQuery();
    const [addMaterial] = useAddMaterialMutation();
    const [newMaterial, setNewMaterial] = useState({
        name: "",
        description: "",
        supplier_id: ""
    });
    const [error, setError] = useState(false);

    const onChangeHandler = (e) => 
    {
        setNewMaterial({ ...newMaterial, [e.target.id]: e.target.value });
    }

    const onSumbitHandler = async (e) => 
    {
        if (newMaterial.name != "" && newMaterial.supplier_id != "" && data.filter(existingMaterial => existingMaterial.name == newMaterial.name).length == 0)
        {
            await addMaterial(newMaterial);
            window.location.reload();
        }
        else
        { setError(true); }
    }

    return (
        <>

            <form>
                {error && <span className="error">Une erreur est survenue</span>}
                <label htmlFor="name">Nom matériau</label>
                <input name="name" id="name" type="text" value={newMaterial.name} onChange={onChangeHandler} />

                <label htmlFor="description">Description</label>
                <input name="description" id="description" type="text" value={newMaterial.description} onChange={onChangeHandler} />


                <select name="supplier_id" id="supplier_id" value={newMaterial.supplier_id} onChange={onChangeHandler}>
                    <option value="">--Choisir un fournisseur--</option>
                    {!isLoading && isSuccess && dataSuppliers.map(supplier =>
                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                    )}
                </select>

                <button type="button" onClick={onSumbitHandler}>Ajouter</button>
            </form>
        </>
    );
}

export default AddMaterial;