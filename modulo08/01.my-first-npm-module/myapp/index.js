// para importar do diretório use o comando abaixo
// node --experimental-specifier-resolution=node index.js
// import FluentSQLBuilder from './../fluentsql-jest-tdd-yt';
import FluentSQLBuilder from '@gabrielvrl/fluentsql';

import database from './database/data.json' assert { type: 'json' };

// groupBy não existe mais
// const result = FluentSQLBuilder.for(database).where({ registered: /^(2020|2019)/ }).select(['name']).limit(3).groupCount('name').build();
const result = FluentSQLBuilder.for(database).where({ registered: /^(2020|2019)/ }).select(['name']).limit(3).countBy('name').build();

console.log({ result })