import React from 'react';

const Controls = (props) => {
    const { 
        handleTransferToRight,
        selectedLeftItems,
        handleTransferToLeft,
        selectedRightItems,
        handleTransferAllToRight,
        handleTransferAllToLeft,
        itemsLeft,
        itemsRight
    } = props;

    return <div className="controls">
        <button onClick={handleTransferAllToLeft} disabled={itemsRight?.length === 0}>
            {'<<'}
        </button>
        <button
            onClick={handleTransferToLeft}
            disabled={selectedRightItems?.length === 0}
        >
            {'<'}
        </button>
        <button
            onClick={handleTransferToRight}
            disabled={selectedLeftItems?.length === 0}
        >
            {'>'}
        </button>
        <button onClick={handleTransferAllToRight} disabled={itemsLeft?.length === 0}>
            {'>>'}
        </button>
    </div>;
}
export default Controls;
