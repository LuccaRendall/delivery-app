import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import cartContext from '../../context/cartContext';

function ProductsPreview({ propsProducts, propsPageName }) {
  const { removeProduct } = useContext(cartContext);
  const { location: { pathname } } = useHistory();

  const removeColumn = <th>Remover Item</th>;

  const removeButton = (product, index) => (
    <td>
      <button
        type="button"
        data-testid={ `${propsPageName}__element-order-table-remove-${index}` }
        onClick={ () => removeProduct(product) }
      >
        Remover
      </button>
    </td>
  );

  return (
    <section className="sale-card">
      <table className="sale-card-products-list">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descricão</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
            {pathname.includes('checkout') && removeColumn}
          </tr>
        </thead>

        <tbody>
          {propsProducts.length
            && propsProducts.map((product, index) => (
              <tr key={ product.id }>
                <td
                  data-testid={
                    `${propsPageName}__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `${propsPageName}__element-order-table
                  -name-${index}` }
                >
                  {product.name}
                </td>
                <td
                  style={ { display: 'flex', justifyContent: 'center' } }
                  data-testid={
                    `${propsPageName}__element-order-table-quantity-${index}`
                  }
                >
                  {product.SaleProduct.quantity}
                </td>
                <td
                  data-testid={
                    `${propsPageName}__element-order-table-unit-price-${index}`
                  }
                >
                  {`${product.price}`}
                </td>
                <td
                  data-testid={
                    `${propsPageName}__element-order-table-sub-total-${index}`
                  }
                >
                  {`${(
                    parseFloat(product.SaleProduct.quantity)
                    * parseFloat(product.price)
                  ).toFixed(2).replace('.', ',')}`}
                </td>
                {pathname.includes('checkout') && removeButton(product, index)}
              </tr>
            ))}
        </tbody>
      </table>

      <div className="sale-card-total-price">
        <p data-testid={ `${propsPageName}__element-order-total-price` }>
          {`${propsProducts
            .reduce((acc, cur) => {
              acc += parseFloat(cur.SaleProduct.quantity) * parseFloat(cur.price);
              return acc;
            }, 0)
            .toFixed(2).replace('.', ',')}`}
        </p>
      </div>
    </section>
  );
}

ProductsPreview.propTypes = {
  propsProducts: propTypes.arrayOf(propTypes.shape()).isRequired,
  propsPageName: propTypes.string.isRequired,
};

export default ProductsPreview;
