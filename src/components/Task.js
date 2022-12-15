import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  return (
    <li className="tasks__item">
      <button 
        className={props.isComplete ? 'tasks__item__toggle--completed' : 'tasks__item__toggle'} 
        onClick={() => props.onToggleComplete(props.id)}>
          {props.title}
      </button>
      <button 
        className="tasks__item__remove button"
        onClick = {() => props.onRemoveTask(props.id)}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired
};

export default Task;
