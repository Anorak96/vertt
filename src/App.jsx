import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import './Utils.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { AuthProvider } from './context/authContext'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import ProductDetail from './pages/Product'
import Cart from './pages/cart'
import Tagpage from './pages/tag'
import Tagspage from './pages/tags'
import CategoryPage from './pages/category'
import CategoriesPage from './pages/categories'
import LoginPage from './pages/login'
import SearchPage from './pages/search'
import PrivateRoute from './utils/privateRoute'
import Checkout from './pages/checkout'
import Profile from './pages/profile.jsx'

function App() {
	return (
		<Router>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path='/' exact Component={Home} />
					<Route path='/api/product/:id' Component={ProductDetail} />
					<Route path='/api/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
					<Route path='/api/tag/:id' Component={Tagpage} />
					<Route path='/api/tag' Component={Tagspage} />
					<Route path='/api/category/:id' Component={CategoryPage} />
					<Route path='/api/categories' Component={CategoriesPage} />
					<Route path='/api/account/login' Component={LoginPage} />
					<Route path='/api/search' Component={SearchPage} />
					<Route path='/api/checkout' Component={Checkout} />
					<Route path='/api/account' Component={Profile} />
				</Routes>
				<Footer />
			</AuthProvider>
		</Router>
	)
}

export default App
