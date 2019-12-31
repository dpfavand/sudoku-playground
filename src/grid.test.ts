import {
  emptyGrid,
  Grid,
  hasDuplicates,
  getCol,
  getRow,
  getSquare,
  squareForCell,
  isValidValue,
  setCellValue,
  hasInvalidValue
} from './grid';
import { Draft } from 'immer';

let baseGrid: Draft<Grid>;

beforeEach(() => {
  baseGrid = [
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ],
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ],
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ],
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ],
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ],
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ],
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ],
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ],
    [
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined },
      { value: undefined, invalid: undefined }
    ]
  ];
});

test('emptyGrid creates an empty Grid', () => {
  expect(emptyGrid).toEqual(baseGrid);
});

test('hasDuplicates() returns true if a set contains duplicates', () => {
  baseGrid[0][0].value = 1;
  baseGrid[0][1].value = 1;
  expect(hasDuplicates(baseGrid[0], 1)).toEqual(true);
});

test('hasDuplicates returns false if a set does not contain duplicates', () => {
  baseGrid[0][0].value = 1;
  expect(hasDuplicates(baseGrid[0], 1)).toEqual(false);
});

test('getCol() returns the set of cells in a column', () => {
  baseGrid[0][2].value = 1;
  baseGrid[1][2].value = 1;
  baseGrid[2][2].value = 1;
  baseGrid[3][2].value = 1;
  baseGrid[4][2].value = 1;
  baseGrid[5][2].value = 1;
  baseGrid[6][2].value = 1;
  baseGrid[7][2].value = 1;
  baseGrid[8][2].value = 1;
  const cellValue = {
    value: 1,
    invalid: undefined
  };
  const expectedSet = [
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue
  ];

  expect(getCol(baseGrid, 2)).toEqual(expectedSet);
});

test('getRow() returns the set of cells in a row', () => {
  baseGrid[2][0].value = 1;
  baseGrid[2][1].value = 1;
  baseGrid[2][2].value = 1;
  baseGrid[2][3].value = 1;
  baseGrid[2][4].value = 1;
  baseGrid[2][5].value = 1;
  baseGrid[2][6].value = 1;
  baseGrid[2][7].value = 1;
  baseGrid[2][8].value = 1;
  const cellValue = {
    value: 1,
    invalid: undefined
  };
  const expectedSet = [
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue
  ];

  expect(getRow(baseGrid, 2)).toEqual(expectedSet);
});

test('getSquare() returns the set of cells in a square', () => {
  baseGrid[0][0].value = 1;
  baseGrid[1][0].value = 1;
  baseGrid[2][0].value = 1;
  baseGrid[0][1].value = 1;
  baseGrid[1][1].value = 1;
  baseGrid[2][1].value = 1;
  baseGrid[0][2].value = 1;
  baseGrid[1][2].value = 1;
  baseGrid[2][2].value = 1;
  const cellValue = {
    value: 1,
    invalid: undefined
  };
  const expectedSet = [
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue,
    cellValue
  ];

  expect(getSquare(baseGrid, 0, 0)).toEqual(expectedSet);
});

test('squareForCell() gets correct square for col+row', () => {
  expect(squareForCell(2, 4)).toEqual([0, 1]);
});

test('isValidValue() finds row with duplicates', () => {
  baseGrid[0][0].value = 1;
  baseGrid[0][5].value = 1;
  expect(isValidValue(baseGrid, 5, 0)).toEqual(false);
});

test('isValidValue() finds col with duplicates', () => {
  baseGrid[0][1].value = 1;
  baseGrid[5][1].value = 1;
  expect(isValidValue(baseGrid, 1, 0)).toEqual(false);
});

test('isValidValue() finds square with duplicates', () => {
  baseGrid[0][1].value = 1;
  baseGrid[1][2].value = 1;
  expect(isValidValue(baseGrid, 1, 0)).toEqual(false);
});

test('isValidValue() allows grid with no duplicates', () => {
  baseGrid[0][1].value = 1;
  expect(isValidValue(baseGrid, 1, 0)).toEqual(true);
});

test('setCellValue() sets a valid cell value', () => {
  const updatedGrid = setCellValue(baseGrid, 1, 1, 5);
  expect(updatedGrid[1][1].value).toEqual(5);
  expect(updatedGrid[1][1].invalid).toEqual(false);
});

test('setCellValue() sets the invalid flag when the cell value is invalid', () => {
  baseGrid[0][0].value = 5;
  const updatedGrid = setCellValue(baseGrid, 1, 1, 5);
  expect(updatedGrid[1][1].value).toEqual(5);
  expect(updatedGrid[1][1].invalid).toEqual(true);
});

test('hasInvalidValue() returns false if no cells are flagged as invalid', () => {
  expect(hasInvalidValue(baseGrid)).toEqual(false);
});

test('hasInvalidValue() returns true if a cell is flagged as invalid', () => {
  baseGrid[5][5].invalid = true;
  expect(hasInvalidValue(baseGrid)).toEqual(true);
});
