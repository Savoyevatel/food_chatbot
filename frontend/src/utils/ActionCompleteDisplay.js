const ActionCompleteDisplay = ({ actionComplete }) => {
    if (!actionComplete) return null;
  
    return (
      <div className="action-complete-display">
        <h3>Order Complete!</h3>
        <ul>
          {Object.entries(actionComplete).map(([item, quantity]) => (
            <li key={item}>{item}: {quantity}</li>
          ))}
        </ul>
      </div>
    );
  };