import { supabase } from '../../supabaseClient'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-blue-400 text-white w-screen navbar-top">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <a className="text-2xl font-bold font-heading" href="#">
          Zapatos.com
        </a>
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li><Link to="/" className="hover:text-blue-200">Productos</Link></li>
          <li><Link to="/Customers" className="hover:text-blue-200">Clientes</Link></li>
          <li><Link to="/Orders" className="hover:text-blue-200">Ordenes de compra</Link></li>
        </ul>
        <div className="hidden xl:flex items-center space-x-5 items-center">
          <a className="flex items-center hover:text-blue-200" href="#" onClick={() => supabase.auth.signOut()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          </a>
        </div>
      </div>
      <a className="xl:hidden flex mr-6 items-center" href="#" onClick={() => supabase.auth.signOut()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
      <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </a>
    </nav>
    );
}
export default Navbar;