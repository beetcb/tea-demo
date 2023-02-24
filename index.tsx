/* eslint-disable */
const { useState } = React;
const { Table } = TeaComponent;

const { columnsResizable, sortable, pageable } = Table.addons;

const records = [
  { name: "Mario", age: 48, stage: "teenager", marriage: 0 },
  { name: "Luigi", age: 38, stage: "youth", marriage: 0 },
  { name: "Koopa", age: 28, stage: "youth", marriage: 1 },
  { name: "Yoshi", age: 18, stage: "youth", marriage: 0 },
  { name: "Link", age: 8, stage: "middle-aged", marriage: 2 },
  { name: "Zelda", age: 58, stage: "middle-aged", marriage: 1 },
  { name: "Wario", age: 68, stage: "elder", marriage: 3 },
  { name: "Pikachu", age: 78, stage: "elder", marriage: 4 }
];
const MARRIAGE_TEXT = ["未婚", "已婚", "离异", "再婚", "丧偶"];
const STAGE_TEXT = {
  teenager: "少年",
  youth: "青年",
  "middle-aged": "中年",
  elder: "老年"
};

const defaultColumns = [
  { key: "name", header: "姓名", width: 300 },
  { key: "age", header: "年龄" },
  {
    key: "stage",
    header: "年龄段",
    render: (x) => STAGE_TEXT[x.stage]
  },
  {
    key: "marriage",
    header: "婚姻状态",
    render: (x) => MARRIAGE_TEXT[x.marriage],
    fixed: "right"
  }
];

function TableAddonExample() {
  const [sorts, setSorts] = useState([]);

  const [columns, setColumns] = useState(defaultColumns);
  return (
    <Table
      records={[...records].sort(sortable.comparer(sorts))}
      recordKey="name"
      rowDisabled={(record) => record.name === "张三"}
      columns={columns}
      addons={[
        columnsResizable({
          onResizeEnd: (columns) => {
            setColumns(columns);
          },
          minWidth: 100,
          maxWidth: 1000
        }),
        sortable({
          columns: ["name"],
          value: sorts,
          onChange: (value) => setSorts(value)
        }),
        pageable()
      ]}
    />
  );
}

ReactDOM.render(<TableAddonExample />, root);
