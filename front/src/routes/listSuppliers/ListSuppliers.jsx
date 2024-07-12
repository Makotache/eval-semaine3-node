import { useSelector } from "react-redux";
import { useGetMaterialsQuery } from "../../redux/slices/materialsApiSlice";
import { useGetSuppliersQuery } from "../../redux/slices/suppliersApiSlice";
import AddSupplier from "./AddSupplier";

const ListSuppliers = () =>
{
    const isLogged = useSelector(store => store.auth.isLogging);

    const { data, isLoading, isSuccess/*, error*/ } = useGetSuppliersQuery();
    const { data: dataMaterials, isLoading: isLoadingMaterials, isSuccess: isSuccessMaterials/*, error*/ } = useGetMaterialsQuery();

    return (
        <>
            <h1>Fournisseur</h1>
            {isLogged && <AddSupplier />}
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Matériaux</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && isSuccess &&
                        data.map((supplier) =>
                            <tr key={supplier.id}>
                                <td>{supplier.name}</td>
                                <td>{!isLoadingMaterials && isSuccessMaterials && dataMaterials.filter(material => material.supplier_id == supplier.id).map(material => material.name + " ")}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default ListSuppliers;