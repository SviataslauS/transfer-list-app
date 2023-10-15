import React from 'react';

export const ITEMS_PER_PAGE = 4;

const SkillsList = ({ items, itemsAmount, selectedItems, handleSelect, setPage, currentPage }) => {
    
  return <div className='skillslist'>
    <div className="column">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleSelect(item)} />
              {item.text}
            </label>
          </li>
        ))}
      </ul>
     
    </div>
    <div className="pagination">
          <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage * ITEMS_PER_PAGE >= itemsAmount}
          >
            Next
          </button>
        </div>
    </div>;
}

export default SkillsList;