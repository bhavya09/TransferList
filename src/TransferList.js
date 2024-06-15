import "./TransferList.css";
import { data } from "./data";
import { useState } from "react";

const TransferList = () => {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState([]);

  const checkedList = (list, id, checked) => {
    return list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !checked,
        };
      }
      return item;
    });
  };

  const handleClick = (id, checked, direction) => {
    if (direction === "LEFT") {
      let copyList = [...leftItems];
      copyList = checkedList(copyList, id, checked);
      setLeftItems(copyList);
    } else if (direction === "RIGHT") {
      let copyList = [...rightItems];
      copyList = checkedList(copyList, id, checked);
      setRightItems(copyList);
    }
  };

  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
  };

  const handleTransferBtn = (direction) => {
    if (direction === "LEFT_TO_RIGHT") {
      if (leftItems.length) {
        let copyItems = [...leftItems];
        const checkList = copyItems.filter((item) => item.checked);
        const uncheckedList = copyItems.filter((item) => !item.checked);
        setRightItems(resetItems([...rightItems, ...checkList]));
        setLeftItems(uncheckedList);
      }
    } else if (direction === "RIGHT_TO_LEFT") {
      if (rightItems.length) {
        let copyItems = [...rightItems];
        const checkList = copyItems.filter((item) => item.checked);
        const uncheckedList = copyItems.filter((item) => !item.checked);
        setLeftItems(resetItems([...leftItems, ...checkList]));
        setRightItems(uncheckedList);
      }
    }
  };

  return (
    <div className="container">
      <div className="box">
        {leftItems.map(({ title, id, checked }) => (
          <div
            onClick={() => handleClick(id, checked, "LEFT")}
            className={`item ${checked && "checked"}`}
            id={id}
            key={id}
          >
            {title}
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={() => handleTransferBtn("LEFT_TO_RIGHT")}>Left</button>
        <button onClick={() => handleTransferBtn("RIGHT_TO_LEFT")}>
          Right
        </button>
      </div>

      <div className="box">
        {rightItems.map(({ title, id, checked }) => (
          <div
            onClick={() => handleClick(id, checked, "RIGHT")}
            className={`item ${checked && "checked"}`}
            id={id}
            key={id}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferList;
