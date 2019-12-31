import { produce, Draft } from 'immer';

export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type squareIndex = 0 | 1 | 2;

export type Set<T> = readonly [T, T, T, T, T, T, T, T, T];

export type Cell = {
  readonly value: number | undefined;
  readonly invalid: boolean | undefined;
};

export type ValueSet = Set<Cell>;

export type Grid = Set<ValueSet>;

export const emptyGrid = produce<[], [], Grid>([], () => {
  const cell: Cell = {
    value: undefined,
    invalid: undefined
  };

  const row: ValueSet = [cell, cell, cell, cell, cell, cell, cell, cell, cell];

  const grid: Grid = [row, row, row, row, row, row, row, row, row];

  return grid;
});

export function hasDuplicates(
  row: ValueSet,
  searchValue: number | undefined
): boolean {
  const searchValueCount = row
    .map(cell => cell.value)
    .filter(value => value !== undefined)
    .filter(value => value === searchValue).length;

  return searchValueCount > 1 ? true : false;
}

export function getCol(grid: Grid, col: Index): ValueSet {
  // this is silly - should recognize this as a ValueSet
  return (grid.map(row => row[col]) as unknown) as ValueSet;
}

export function getRow(grid: Grid, row: Index): ValueSet {
  return grid[row];
}

export function getSquare(
  grid: Grid,
  col: squareIndex,
  row: squareIndex
): ValueSet {
  const subCells = [0, 1, 2];
  return (subCells
    .map(squareRow =>
      subCells.map(squareCol => grid[row * 3 + squareRow][col * 3 + squareCol])
    ) // again, casting to unknown to ValueSet is silllyyy
    .flat() as unknown) as ValueSet;
}

export function squareForCell(
  col: Index,
  row: Index
): [squareIndex, squareIndex] {
  const squareCol = Math.floor(col / 3) as squareIndex;
  const squareRow = Math.floor(row / 3) as squareIndex;
  return [squareCol, squareRow];
}

export function isValidValue(grid: Grid, colIndex: Index, rowIndex: Index) {
  const value = grid[rowIndex][colIndex].value;
  const col = getCol(grid, colIndex);
  const row = getRow(grid, rowIndex);
  const cellSquare = squareForCell(colIndex, rowIndex);
  const square = getSquare(grid, ...cellSquare);
  const causesDuplicates = [col, row, square].map(values =>
    hasDuplicates(values, value)
  );
  return !causesDuplicates.includes(true);
}

export function hasInvalidValue(grid: Grid): boolean {
  return grid
    .flat<Cell>()
    .map((cell: Cell) => cell.invalid)
    .includes(true);
}

export const setCellValue = produce(
  (
    base: Draft<Grid>,
    colIndex: Index,
    rowIndex: Index,
    value: number | undefined
  ) => {
    base[rowIndex][colIndex].value = value;
    base[rowIndex][colIndex].invalid = !isValidValue(base, colIndex, rowIndex);
  }
);

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export function seedGrid(cellsToFill: number, grid: Grid = emptyGrid): Grid {
  const row = getRandomIntInclusive(0, 8) as Index;
  const col = getRandomIntInclusive(0, 8) as Index;

  // don't overwrite existing value, so try again!
  if (grid[row][col].value) return seedGrid(cellsToFill, grid);

  const value = getRandomIntInclusive(1, 9);
  const newGrid = setCellValue(grid, col, row, value);

  // if the new value would be invalid, try again!
  if (hasInvalidValue(newGrid)) return seedGrid(cellsToFill, grid);

  // more cells to fill? go around again!
  if (cellsToFill > 1) return seedGrid(cellsToFill - 1, newGrid);

  // done? return!
  return newGrid;
}
