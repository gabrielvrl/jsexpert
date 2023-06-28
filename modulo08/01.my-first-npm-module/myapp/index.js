// para importar do diretório use o comando abaixo
// node --experimental-specifier-resolution=node index.js
// import FluentSQLBuilder from './../fluentsql-jest-tdd-yt';
import FluentSQLBuilder from '@gabrielvrl/fluentsql';

import database from './database/data.json' assert { type: 'json' };


const result = FluentSQLBuilder.for(database).where({ registered: /^(2020|2019)/ }).select(['name']).limit(3).build();

console.log({ result })