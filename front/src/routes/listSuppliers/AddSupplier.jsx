import { useState } from "react";
import { useAddSupplierMutation, useGetSuppliersQuery } from "../../redux/slices/suppliersApiSlice";

const AddSupplier = () =>
{
    const { data, isLoading, isSuccess/*, error*/ } = useGetSuppliersQuery();
    const [addSupplier] = useAddSupplierMutation();
    const [newSupplier, setNewSupplier] = useState({
        name: ""
    });
    const [error, setError] = useState(false);

    const onChangeHandler = (e) => 
    {
        setNewSupplier({ ...newSupplier, [e.target.id]: e.target.value });
    }

    const onSumbitHandler = async (e) => 
    {
        e.preventDefault();

        if (newSupplier.name != "" && data.filter(existingSupplier => existingSupplier.name == newSupplier.name).length == 0)
        {
            await addSupplier(newSupplier);

            window.location.reload();
        }
        else
        { setError(true); }
    }

    return (
        <form>
            {error && <span className="error">Une erreur est survenue</span>}
            <label htmlFor="name">Nom fournisseur</label>
            <input name="name" id="name" type="text" value={newSupplier.name} onChange={onChangeHandler} />

            <button type="button" onClick={onSumbitHandler}>Ajouter</button>
        </form>

    );
}

export default AddSupplier;