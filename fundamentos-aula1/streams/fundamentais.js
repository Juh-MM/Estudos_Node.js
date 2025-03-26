//process.stdin.pipe(process.stdout)

import{ Readable, Writable, Transform } from 'node:stream'

//tream de leitura
class OneToHundredStreams extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
                //push para fornecer info para quem chama
                //null para parar quando chegar no 100
            } else {
                //se não chegou fica informando o i
                const buf = Buffer.from(String(i))
                //dentro de streams não pode trabalhar usando numeros, string, bulean etc
                //buffer = formato específico para streams
                //buff não aceitar numero
                this.push(buf)
            }
    }, 1000)
    }
}

//stream de tranformação 
class InverseNumberStream{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

//stream de escrita
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}


new OneToHundredStreams()
    .pipe(new InverseNumberStream ())
    .pipe(new MultiplyByTenStream ());


