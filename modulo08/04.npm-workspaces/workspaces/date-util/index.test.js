import { deepStrictEqual } from 'assert';
import DateUtil from './index.js';

{
  const format = 'dd-M-Y';
  const expected = {
    error: `the format ${format} is not available yet`,
  }
  const date = new Date(1990, 2, 1);
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const expected = '01-12-1990';
  const format = 'dd-mm-yyyy';
  const date = new Date('1990-12-01');
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

{
  const expected = '22/06/1995';
  const format = 'dd/mm/yyyy';
  const date = new Date('1995-06-22');
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}