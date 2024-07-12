import { useSelector } from "react-redux";
import { useGetProductsQuery, useUpdateProductMutation } from "../../redux/slices/productsApiSlice";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";

const ListProducts = () =>
{
    const navigate = useNavigate();
    const isLogged = useSelector(store => store.auth.isLogging);

    const { data, isLoading, isSuccess/*, error*/ } = useGetProductsQuery();

    const [update] = useUpdateProductMutation();

    const addButton = (product) =>
    {
        update({ ...product, count: product.count + 1 })
        window.location.reload();

    }

    return (
        <>
            <h1>Produits</h1>
            {isLogged && <AddProduct />}
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Catérogie</th>
                        <th>Description</th>
                        <th>Quantité</th>
                        <th>Matériaux</th>
                        {isLogged && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && isSuccess &&
                        data.map((product) =>
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.category == "shelf" ? "Etagère" : "Armoire"}</td>
                                <td>{product.description}</td>
                                <td>{product.count}</td>
                                <td onClick={() => navigate("/list-materials")}>{product.Materials.map(material => material.name + " ")}</td>
                                {isLogged && <td><button className="addButton" onClick={() => addButton(product)}>+</button></td>}
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default ListProducts;