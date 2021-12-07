import { h, render, Component } from "preact";
import FileRow from "./filerow";
import "./style.css";
import Button from "../../button";
import classNames from "classnames";
import memoize from "lodash/memoize";

function initCap(str) {
  const chars = str.split("");
  chars[0] = chars[0].toUpperCase();
  return chars.join("");
}

function parseSortType(value) {
  const num = parseInt(value, 10);
  if (!isNaN(num)) return num;
  return value;
}

function sort(items = [], sortKey, sortDirection) {
  return Object.entries(items).sort(([keya, a], [keyb, b]) => {
    let propA = parseSortType(a[sortKey]);
    let propB = parseSortType(b[sortKey]);

    if (propA === propB) return 0;
    const direction = sortDirection ? 1 : -1;
    return propA > propB ? direction : 0 - direction;
  });
}
const sortMemoized = memoize(sort, (items, sortKey, sortDirection) => {
  if (!items || !items.length) return "null";
  return [items[0].path, sortKey, sortDirection].join();
});

class DetailsView extends Component {
  constructor({
    items,
    defaultSort: [sortKey = "label", sortDirection = false] = []
  }) {
    super();
    this.state = {
      sortKey,
      sortDirection
    };
  }
  selectItem(item) {
    this.props.onSelect && this.props.onSelect(item);
    this.setState({ selected: item.key });
  }
  render({
    items = [],
    columns = [],
    onClick,
    solidColor,
    direction = "row",
    mode = "explorer",
    header = true,
    shouldSort = true
  }) {
    const { sortKey, sortDirection } = this.state;
    const onSort = newSortKey => {
      return () =>
        this.setState({
          sortKey: newSortKey,
          sortDirection: newSortKey === sortKey ? !sortDirection : true
        });
    };

    const sortedItems = shouldSort
      ? sortMemoized(items, sortKey, sortDirection)
      : Object.entries(items || []);

    return (
      <div class={`ui95-file-icons-details`}>
        <table className="ui95-file-icons-details__table">
          {header && (
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
          )}
          <tbody>
            {sortedItems.map(([filename, item], index) => (
              <FileRow
                {...item}
                selected={item.selected || this.state.selected === index}
                onSelect={e => this.selectItem(e)}
                onClick={() => onClick(item)}
                columns={columns}
              />
            ))}
          </tbody>
        </table>
        {header && (
          <div
            className="ui95-file-icons-details__decorative"
            aria-hidden="true"
          >
            <Button />
          </div>
        )}
      </div>
    );
  }
}

export default DetailsView;
