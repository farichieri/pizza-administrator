import React, { useState } from 'react';
import ActualOrders from '../../components/actual-orders/ActualOrders';
import Nav from '../../components/navbar/Nav';
import './dashboard.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Products from '../../components/products/Products';
import Reports from '../../components/reports/Reports';
import Employees from '../../components/employees/Employees';

const Dashboard = () => {
  const sections = [
    {
      text: 'Ordenes',
      component: 'ActualOrders',
      // Icon: TransactionsIcon,
      // path: '/orders',
      // itemType: 'button'
    },
    {
      text: 'Productos',
      component: 'Products',
      // Icon: TransactionsIcon,
      // path: '/orders',
      // itemType: 'button'
    },
    {
      text: 'Reportes',
      component: 'Reports',
      // Icon: TransactionsIcon,
      // path: '/orders',
      // itemType: 'button'
    },
    {
      text: 'Empleados',
      component: 'Employees',
      // Icon: TransactionsIcon,
      // path: '/orders',
      // itemType: 'button'
    },
  ];

  const isSelected = (component) => {
    return elementSelected === component ? 'show-element' : 'element';
  };

  const [elementSelected, setElementSelected] = useState('');

  return (
    <div className='dashboard'>
      <Nav />
      <div className='dashboard-container'>
        <Sidebar
          sections={sections}
          elementSelected={elementSelected}
          setElementSelected={setElementSelected}
        />
        <div className='dashboard-elements'>
          <div className={isSelected('ActualOrders')}>
            <ActualOrders />
          </div>
          <div className={isSelected('Products')}>
            <Products />
          </div>
          <div className={isSelected('Reports')}>
            <Reports />
          </div>
          <div className={isSelected('Employees')}>
            <Employees />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
