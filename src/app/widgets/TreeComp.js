import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  SelectionState,
  IntegratedSelection,
  TreeDataState,
  CustomTreeData
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn
} from "@devexpress/dx-react-grid-material-ui";

import {
  generateRows,
  defaultColumnValues
} from "./generator";

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

export default () => {
  const [columns, useColumns] = useState([
    { name: "name", title: "Name" },
    { name: "gender", title: "Gender" },
    { name: "city", title: "City" },
    { name: "car", title: "Car" }
  ]);
  const data = generateRows({
    columnValues: {
      id: ({ index }) => index,
      parentId: ({ index, random }) =>
        index > 0 ? Math.trunc((random() * index) / 2) : null,
      ...defaultColumnValues
    
    },
    length: 20
  });
  const [tableColumnExtensions] = useState([
    { columnName: "name", width: 300 }
  ]);
  const [defaultExpandedRowIds] = useState([0]);

  return (
    <Paper>
      <Grid rows={data} columns={columns}>
        <SelectionState />
        <TreeDataState defaultExpandedRowIds={defaultExpandedRowIds} />
        <CustomTreeData getChildRows={getChildRows} />
        <IntegratedSelection />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="name" showSelectionControls showSelectAll />
      </Grid>
    </Paper>
  );
};
