import { memo, useRef } from 'react'
import { VariableSizeGrid as Grid, areEqual } from 'react-window'
import { useReactWindowSettings } from '../../hooks'
import './index.css'

const initialSettings = {
  width: 500,
  height: 400,
  itemCount: 1000,
  layout: 'vertical',
  direction: 'ltr',
  className: 'Grid',
  useIsScrolling: true,
  overscanCount: 1
}

const Cell = memo(
  ({ columnIndex, rowIndex, style, isScrolling }) => (
    <div
      className={
        columnIndex % 2
          ? rowIndex % 2 === 0
            ? 'GridItemOdd'
            : 'GridItemEven'
          : rowIndex % 2
          ? 'GridItemOdd'
          : 'GridItemEven'
      }
      style={style}
    >
      {isScrolling ? 'Scrolling' : `r${rowIndex}, c${columnIndex}`}
    </div>
  ),
  areEqual
)

const columnWidths = new Array(1000)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50))

const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50))

export default function VariableSizeGridDemo () {
  const [settings, SettingsJsx] = useReactWindowSettings(initialSettings)
  const listRef = useRef()

  return (
    <>
      <div className='container'>
        <div id='box'>
          <Grid
            {...settings}
            ref={listRef}
            columnCount={1000}
            rowCount={1000}
            columnWidth={index => columnWidths[index]}
            rowHeight={index => rowHeights[index]}
          >
            {Cell}
          </Grid>
        </div>
      </div>

      {SettingsJsx}
    </>
  )
}
