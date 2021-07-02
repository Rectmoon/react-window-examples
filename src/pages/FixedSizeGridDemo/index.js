import { memo, useCallback } from "react";
import { FixedSizeGrid as Grid, areEqual } from "react-window";
import { useReactWindowSettings } from "../../hooks";
import "./index.css";

const initialSettings = {
  width: 500,
  height: 400,
  layout: "vertical",
  direction: "ltr",
  className: "Grid",
  useIsScrolling: true,
  overscanCount: 1,
  columnCount: 1000,
  rowCount: 1000,
  columnWidth: 100,
  rowHeight: 50,
};

const Cell = memo(
  ({ columnIndex, rowIndex, style }) => (
    <div
      className={
        columnIndex % 2
          ? rowIndex % 2 === 0
            ? "GridItemOdd"
            : "GridItemEven"
          : rowIndex % 2
          ? "GridItemOdd"
          : "GridItemEven"
      }
      style={style}
    >
      r{rowIndex}, c{columnIndex}
    </div>
  ),
  areEqual
);

export default function FixedSizeGridDemo() {
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
          <Grid
            {...state}
            onScroll={handleScroll}
            onItemsRendered={handleItemsRendered}
          >
            {Cell}
          </Grid>
        </div>
      </div>

      {SettingsJsx}
    </>
  );
}
