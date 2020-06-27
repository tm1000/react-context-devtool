import React, { useState } from "react";

import ButtonGroup from "Components/ButtonGroup";
import Tabs from "Components/Tabs";
import JsonTree from "Components/JsonTree";
import JsonEditor from "Components/JsonEditor";
import DiffView from "Components/DiffView";

import "./index.scss";

const Views = [
  {
    text: "State",
    icon: (
      <svg
        class="button-icon"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
        />
        <path
          fillRule="evenodd"
          d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"
        />
      </svg>
    ),
    value: "state",
  },
  {
    text: "Diff",
    icon: (
      <svg
        class="button-icon"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
        />
        <path
          fillRule="evenodd"
          d="M5.5 10.5A.5.5 0 0 1 6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zM8 4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4A.5.5 0 0 1 8 4z"
        />
        <path
          fillRule="evenodd"
          d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    ),
    value: "diff",
  },
];

const SubViews = {
  state: [
    {
      text: "Tree",
      value: "tree",
    },
    {
      text: "Raw",
      value: "raw",
    },
  ],
  diff: [
    {
      text: "Raw",
      value: "raw",
    }
  ]
};

const DataViews = {
  state: {
    tree: JsonTree,
    raw: JsonEditor,
  },
  diff: {
    raw: DiffView,
  }
};

const ContextView = ({ debugData }) => {
  const [selectedView, setView] = useState("state");
  const [selectedSubview, setSubView] = useState("tree");

  const View = DataViews[selectedView][selectedSubview];

  const onChangeView = view => {
    if (view === "diff") {
      setSubView("raw");
    } else {
      setSubView("tree");
    }
    setView(view);
  }

  return (
    <div className="context-view">
      <div className="view-header">
        <Tabs
          selected={selectedSubview}
          onChange={setSubView}
          items={SubViews[selectedView]}
        />
        <ButtonGroup
          className="view-selector"
          selected={selectedView}
          onChange={onChangeView}
          buttons={Views}
        />
      </div>
      <div className="data-view">
        <View data={debugData?.newValue?.value || {}} oldData={debugData?.oldValue?.value || {}} />
      </div>
    </div>
  );
};

export default ContextView;