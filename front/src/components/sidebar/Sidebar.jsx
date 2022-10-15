import React from 'react';
import { useEffect } from 'react';
import './sidebar.scss';

const Sidebar = ({ sections, elementSelected, setElementSelected }) => {
  const elementClicked = (component) => {
    setElementSelected(component);
  };

  const isSelected = (section) =>
    elementSelected === section
      ? 'sidebar-section-selected'
      : 'sidebar-section';

  useEffect(() => {
    elementClicked('ActualOrders');
  }, []);

  return (
    <div className='sidebar-container'>
      {sections.length &&
        sections.map((section) => {
          return (
            <span
              key={section.component}
              onClick={() => elementClicked(section.component)}
              component={section.component}
              className={isSelected(section.component)}
            >
              {section.text}
            </span>
          );
        })}
    </div>
  );
};

export default Sidebar;
