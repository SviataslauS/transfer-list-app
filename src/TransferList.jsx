import React, { useState } from 'react';
import SkillsList, { ITEMS_PER_PAGE } from './SkillsList';
import Controls from './Controls';
import './TransferList.scss';

const initColumn1Items = [
    { id: 1, text: 'JS' },
    { id: 2, text: 'HTML' },
    { id: 3, text: 'CSS' },
    { id: 4, text: 'TS' },
    { id: 5, text: 'React' },
    { id: 6, text: 'Angular' },
    { id: 7, text: 'Vue' },
    { id: 8, text: 'Svelte' },
];
const initColumn2Items = [
    { id: 9, text: 'Node.js' },
];
const buildHandleSelect = (item) => (prevSelected) => {
  if (prevSelected.includes(item)) {
    return prevSelected.filter((selected) => selected !== item);
  }
  return [...prevSelected, item];
};

const TransferList = () => {
  const [itemsLeft, setItemsLeft] = useState(initColumn1Items);
  const [itemsRight, setItemsRight] = useState(initColumn2Items);

  const [selectedLeftItems, setSelectedLeftItems] = useState([]);
  const [selectedRightItems, setSelectedRightItems] = useState([]);
  const [pageLeft, setPageLeft] = useState(1);
  const [pageRight, setPageRight] = useState(1);

  const paginatedItemsLeft = itemsLeft.slice((pageLeft - 1) * ITEMS_PER_PAGE, pageLeft * ITEMS_PER_PAGE);
  const paginatedItemsRight = itemsRight.slice((pageRight - 1) * ITEMS_PER_PAGE, pageRight * ITEMS_PER_PAGE);

  const handleSelectLeft = (item) => {
    setSelectedLeftItems(buildHandleSelect(item));
  };
  const handleSelectRight = (item) => {
    setSelectedRightItems(buildHandleSelect(item));
  };

  const handleTransferToRight = () => {
    setItemsRight((prevItems) => [...prevItems, ...selectedLeftItems]);
    setItemsLeft((prevItems) =>
      prevItems.filter((item) => !selectedLeftItems.includes(item))
    );
    setSelectedLeftItems([]);
  };

  const handleTransferToLeft = () => {
    setItemsLeft((prevItems) => [...prevItems, ...selectedRightItems]);
    setItemsRight((prevItems) =>
      prevItems.filter((item) => !selectedRightItems.includes(item))
    );
    setSelectedRightItems([]);
  };

  const handleTransferAllToRight = () => {
    setItemsRight([...itemsRight, ...itemsLeft]);
    setItemsLeft([]);
    setSelectedLeftItems([]);
  };

  const handleTransferAllToLeft = () => {
    setItemsLeft([...itemsLeft, ...itemsRight]);
    setItemsRight([]);
    setSelectedRightItems([]);
  };
  const controlsProps = { 
    selectedLeftItems,
    selectedRightItems,
    handleTransferToLeft,
    handleTransferToRight,
    handleTransferAllToLeft,
    handleTransferAllToRight,
    itemsLeft,
    itemsRight
  };

  return (
    <div className="transfer-list">
      <SkillsList
        items={paginatedItemsLeft}
        selectedItems={selectedLeftItems}
        handleSelect={handleSelectLeft}
        setPage={setPageLeft}
        currentPage={pageLeft}
        itemsAmount={itemsLeft?.length}
      />
      <Controls {...controlsProps}/>
      <SkillsList
        items={paginatedItemsRight}
        selectedItems={selectedRightItems}
        handleSelect={handleSelectRight}
        setPage={setPageRight}
        currentPage={pageRight}
        itemsAmount={itemsRight?.length}
      />
    </div>
  );
};

export default TransferList;
