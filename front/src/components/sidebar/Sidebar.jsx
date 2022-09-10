import React from 'react';
import { useState } from 'react';
import './sidebar.scss';

const Sidebar = ({ sections, elementSelected, setElementSelected }) => {
  const [selected, setSelected] = useState(false);

  const elementClicked = (component) => {
    setElementSelected(component);
  };

  const isSelected = (section) =>
    elementSelected === section
      ? 'sidebar-section-selected'
      : 'sidebar-section';

  return (
    <div className='sidebar-container'>
      {sections.length &&
        sections.map((section) => {
          return (
            <span
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
