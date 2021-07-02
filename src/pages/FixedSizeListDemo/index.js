import { memo, useCallback } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
import { useReactWindowSettings } from "../../hooks";
import "./index.css";

const initialSettings = {
  width: 500,
  height: 400,
  itemCount: 1000,
  itemSize: 35,
  layout: "vertical",
  direction: "ltr",
  className: "List",
  useIsScrolling: true,
  overscanCount: 1,
};

const Row = memo(
  ({ index, style, isScrolling }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      {isScrolling ? "Scrolling" : `Row ${index}`}
    </div>
  ),
  areEqual
);

export default function FixedSizeListDemo() {
  const [state, SettingsJsx] = useReactWindowSettings(initialSettings);
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
      console.log({
        scrollDirection,
        scrollOffset,
        scrollUpdateWasRequested,
      });
    },
    []
  );

  return (
    <>
      <div className="container">
        <div id="box">
          <List
            {...state}
            onScroll={handleScroll}
            onItemsRendered={handleItemsRendered}
          >
            {Row}
          </List>
        </div>
      </div>

      {SettingsJsx}
    </>
  );
}
