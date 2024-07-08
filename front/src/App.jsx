import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProducts from "./components/routes/listProducts/ListProducts"
import ListSuppliers from "./components/routes/listSuppliers/ListSuppliers"
import { useState } from 'react';
import MiddlewareRoute from "./components/layout/MiddlewareRoute"
import NavBar from './components/NavBar';
import Login from './components/routes/Login';
import Logout from './components/routes/Logout';
import Dashboard from './components/routes/dashboard';
import DetailProducts from './components/routes/DetailProducts';

function App()
{
	const [me] = useMeMutation();
	const [user, setUser] = useState(null);

	useEffect(() => 
	{
		const _me = async () =>
		{
			const me_res = await me();
			console.log("me_res", me_res);
			setUser(me_res.data != undefined ? me_res.data : null);
		}
		_me();
	}, []);

	return (
		<>
			<NavBar user={user} />
			<BrowserRouter>
				<Routes>
					<Route path="" element={<ListProducts />} />
					<Route path="detail/:id" element={<DetailProducts />} />
					<MiddlewareRoute path="login" element={<Login setUser={setUser} />} />
					<MiddlewareRoute path="logout" userLogged={false} element={<Logout />} />
					<MiddlewareRoute path="dashboard" element={<Dashboard />} />
					<MiddlewareRoute path="list-suppliers" element={<ListSuppliers />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
