import { useState, memo, useCallback, useRef } from "react";
import { VariableSizeList as List, areEqual } from "react-window";
import { useReactWindowSettings } from "../../hooks";
import "./index.css";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "indigo",
  "lightblue",
  "indigo",
  "indianred",
];

const getRandomHeight = () => 25 + Math.round(Math.random() * 75);

const initialSettings = {
  width: 500,
  height: 400,
  itemCount: 1000,
  layout: "vertical",
  direction: "ltr",
  className: "List",
  useIsScrolling: true,
  overscanCount: 1,
};

const Row = memo(({ index, style, isScrolling, data }) => {
  const datum = data[index];

  return (
    <div className="Item" style={{ ...style, backgroundColor: datum.color }}>
      {isScrolling ? "Scrolling" : `The ItemSize is ${style.height} px.`}
    </div>
  );
}, areEqual);

export default function VariableSizeListDemo() {
  const [settings, SettingsJsx] = useReactWindowSettings(initialSettings);
  const [data, setData] = useState(() =>
    new Array(1000).fill(true).map(() => ({
      color: colors[Math.floor(Math.random() * colors.length)],
      height: getRandomHeight(),
    }))
  );

  const listRef = useRef();

  const handleItemsRendered = useCallback(
    ({
      overscanStartIndex,
      overscanStopIndex,
      visibleStartIndex,
      visibleStopIndex,
    }) => {
      console.log({
        overscanStartIndex,
        overscanStopIndex,
        visibleStartIndex,
        visibleStopIndex,
      });
    },
    []
  );

  const handleScroll = useCallback(
    ({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) => {
      console.log({ scrollDirection, scrollOffset, scrollUpdateWasRequested });
    },
    []
  );

  const handleClick = useCallback(() => {
    setData((preData) =>
      preData.map((item) => ({ ...item, height: getRandomHeight() }))
    );
    listRef.current.resetAfterIndex(0);
  }, []);

  return (
    <>
      <div className="container">
        <div id="box">
          <List
            {...settings}
            itemSize={(index) => data[index].height}
            itemData={data}
            onScroll={handleScroll}
            onItemsRendered={handleItemsRendered}
            ref={listRef}
          >
            {Row}
          </List>
          <button onClick={handleClick}>resize items</button>
        </div>
      </div>

      {SettingsJsx}
    </>
  );
}
