import { Readable, Writable } from 'stream';

// fonte de dados
const readable = Readable({
  read() {
    this.push('Hello World 1')
    this.push('Hello World 2')
    this.push('Hello World 3')
    this.push('Hello World 4')

    // informa que os dados acabaram
    this.push(null)
  }
})

// saída de dados
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log(chunk.toString())
    cb()
  }
})

readable
  // writable é sempre a saída -> imprimir, salvar ou ignorar
  .pipe(writable)
  // .pipe(process.stdout)