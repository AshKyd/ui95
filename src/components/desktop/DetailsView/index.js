import { h, render, Component } from "preact";
import FileRow from "./filerow";
import "./style.less";
import Button from "../../button";
import classNames from "classnames";

function initCap(str) {
  const chars = str.split("");
  chars[0] = chars[0].toUpperCase();
  return chars.join("");
}

function sort(items = {}, sortKey, sortDirection) {
  return Object.entries(items).sort(([keya, a], [keyb, b]) => {
    const propA = a[sortKey];
    const propB = b[sortKey];

    console.log({ propA, propB });
    if (propA === propB) return 0;
    const direction = sortDirection ? 1 : -1;
    return propA > propB ? direction : 0 - direction;
  });
}

class FileIcons extends Component {
  constructor({ items }) {
    super();
    this.state = {
      sortKey: "label",
      sortDirection: true
    };
  }
  selectItem(item) {
    this.props.onSelect && this.props.onSelect(item);
    this.setState({ selected: item.key });
  }
  render({
    items,
    columns,
    onClick,
    solidColor,
    direction = "row",
    mode = "explorer"
  }) {
    const { sortKey, sortDirection } = this.state;
    const onSort = newSortKey => {
      return () =>
        this.setState({
          sortKey: newSortKey,
          sortDirection: newSortKey === sortKey ? !sortDirection : true
        });
    };
    return (
      <div class={`ui95-file-icons-details`}>
        <table>
          <thead>
            <tr>
              <th colspan="2" className="ui95-file-icons-details__head">
                <Button onClick={onSort("label")}>Name</Button>
              </th>
              {columns.map(column => (
                <th className="ui95-file-icons-details__head" key={column}>
                  <Button onClick={onSort(column)}>{initCap(column)}</Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sort(items, sortKey, sortDirection).map(
              ([filename, item], index) => (
                <FileRow
                  {...item}
                  selected={item.selected || this.state.selected === index}
                  onSelect={e => this.selectItem(e)}
                  onClick={() => onClick(item)}
                  columns={columns}
                />
              )
            )}
          </tbody>
        </table>
        <div className="ui95-file-icons-details__decorative" aria-hidden="true">
          <Button />
        </div>
      </div>
    );
  }
}

export default FileIcons;
