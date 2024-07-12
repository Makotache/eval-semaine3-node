import './App.css';
import "./styles/general.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProducts from "./routes/listProducts/ListProducts";
import ListSuppliers from "./routes/listSuppliers/ListSuppliers";
import NavBar from './components/NavBar';
import Login from './routes/Login';
import Logout from './routes/Logout';
import Dashboard from './routes/Dashboard';
import NotFound from './components/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import NotAuthorize from './components/NotAuthorize';
import { useEffect, useState } from 'react';
import { init } from './redux/slices/authSlice';
import ListMaterials from './routes/listMaterials/ListMaterial';
import { me } from './services/auth';

function App()
{
	const dispatch = useDispatch()

	const [update, setUpdate] = useState(false)
	const updateNavBar = () =>
	{
		setUpdate(!update);
	}

	useEffect(() =>
	{
		const getMe = async () =>
		{
			const res = await me();
			console.log("data => ", res);
			dispatch(init(res.data));
		}
		getMe();

	}, [update])

	const MiddlewareRoute = (path, element, needToBeLogged = true) =>
	{
		const logged = useSelector(store => store.auth.isLogging);

		return (
			<Route path={path} element={(needToBeLogged ? (logged ? element : <NotAuthorize />) : element)} />
		);
	}

	return (
		<>
			<NavBar />
			<hr />
			<BrowserRouter>
				<Routes>
					<Route path="" element={<ListProducts />} />
					<Route path="list-suppliers" element={<ListSuppliers />} />
					<Route path="list-materials" element={<ListMaterials />} />
					{MiddlewareRoute("login", <Login updateNavBar={updateNavBar} />, false)}
					{MiddlewareRoute("logout", <Logout updateNavBar={updateNavBar} />)}
					{MiddlewareRoute("dashboard", <Dashboard />)}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
