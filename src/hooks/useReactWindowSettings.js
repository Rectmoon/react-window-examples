import { useState, useCallback } from "react";

export default function useReactWindowSettings(initialSettings) {
  const [state, setState] = useState(initialSettings);
  const handleChange = useCallback(
    (k, v) => {
      setState({ ...state, [k]: v });
    },
    [state]
  );

  return [
    state,
    <div className="settings">
      {Object.entries(state).map(([k, v]) => {
        const isNumber = typeof initialSettings[k] === "number";
        const isBoolean = typeof initialSettings[k] === "boolean";

        return (
          <>
            <label htmlFor={k}>{k}</label>

            {k === "layout" ? (
              <select
                name="layout"
                id={k}
                onChange={(e) => handleChange(k, e.target.value)}
              >
                <option value="vertical">vertical</option>
                <option value="horizontal">horizontal</option>
              </select>
            ) : k === "direction" ? (
              <select
                name="direction"
                id={k}
                onChange={(e) => handleChange(k, e.target.value)}
              >
                <option value="ltr">ltr</option>
                <option value="rtl">rtl</option>
              </select>
            ) : isBoolean ? (
              <input
                type="checkbox"
                checked={v}
                onChange={(e) => handleChange(k, e.target.checked)}
              />
            ) : (
              <input
                type={isNumber ? "number" : "text"}
                id={k}
                value={v}
                onChange={(e) =>
                  handleChange(k, isNumber ? +e.target.value : e.target.value)
                }
              />
            )}
          </>
        );
      })}
    </div>,
  ];
}
