import React from 'react';
import { useHistory } from 'react-router-dom';

function NavBar() {
  const history = useHistory();
  const { name, role } = JSON.parse(localStorage.getItem('user'));

  const goTo = (endpoint) => {
    history.push(endpoint);
  };

  const roleButton = {
    administrator:
  <button
    data-testid="customer_products__element-navbar-link-orders"
    type="button"
    onClick={ () => goTo('/administrator/management') }
  >
    GERENCIAR USUÁRIOS
  </button>,
    seller:
  <button
    data-testid="customer_products__element-navbar-link-orders"
    type="button"
    onClick={ () => goTo('/seller/orders') }
  >
    PEDIDOS
  </button>,
    customer:
  <span>
    <button
      data-testid="customer_products__element-navbar-link-products"
      type="button"
      onClick={ () => goTo('/customer/products') }
    >
      PRODUTOS
    </button>
    <button
      data-testid="customer_products__element-navbar-link-orders"
      type="button"
      onClick={ () => goTo('/customer/orders') }
    >
      MEUS PEDIDOS
    </button>
  </span>,
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    goTo('/login');
  };

  return (
    <header>
      <nav>
        { roleButton[role] }
        <span data-testid="customer_products__element-navbar-user-full-name">
          { name }
        </span>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ logout }
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
