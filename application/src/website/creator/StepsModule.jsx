import { React, useState } from 'react'
import './stepsmodule.css'

function StepsModule({ elements, selected, setSelected, dependencies }) {
  return (
    <div className='stepsmodule'>
      <div className='stm-widebar' />
      <div className='stm-container'>
        {elements && elements.map((element, index) => {
          if (element.title && element.selector) {
            const dependencyMet = element.require
              ? dependencies.find(dep => dep.id === element.require && dep.is)
              : true; // Set to true when no dependency is required

            const handleClick = () => {
              if (dependencyMet) {
                setSelected(element.selector);
              }
            };

            if (element.selector === selected) {
              return (
                <div className={`stm-element-selected ${dependencyMet ? 'clickable' : ''}`} onClick={handleClick}>
                  {index + 1}
                  <div className='stm-element-title'>
                    {element.title}
                  </div>
                </div>
              );
            } else {
              return (
                <div title={element.title} className={`stm-element ${dependencyMet ? 'clickable' : ''}`} onClick={handleClick}>
                  {index + 1}
                </div>
              );
            }
          }
          return null; // Handle cases where element.title or element.selector is missing
        })}
      </div>
    </div>
  );
}



export default StepsModule