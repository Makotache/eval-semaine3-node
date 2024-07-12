import { useSelector } from "react-redux";
import { useGetMaterialsQuery } from "../../redux/slices/materialsApiSlice";
import { useGetSuppliersQuery } from "../../redux/slices/suppliersApiSlice";
import AddMaterial from "./AddMaterial";

const ListMaterials = () =>
{
    const isLogged = useSelector(store => store.auth.isLogging);

    const { data, isLoading, isSuccess/*, error*/ } = useGetMaterialsQuery();
    const { data: dataSuppliers, isLoading: isLoadingSuppliers, isSuccess: isSuccessSuppliers/*, error*/ } = useGetSuppliersQuery();

    return (
        <>
            <h1>Matériaux</h1>
            {isLogged && <AddMaterial />}

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Fournisseur</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && isSuccess &&
                        data.map((material) =>
                            <tr key={material.id}>
                                <td>{material.name}</td>
                                <td>{!isLoadingSuppliers && isSuccessSuppliers && dataSuppliers.filter(supplier => supplier.id == material.supplier_id)[0].name}</td>
                                <td>{material.description}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default ListMaterials;