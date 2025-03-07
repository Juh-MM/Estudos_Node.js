//process.stdin.pipe(process.stdout)

import{ Readable } from 'node:stream'

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

new OneToHundredStreams().pipe(process.stdout)
//enquanto lê vai informando no terminal
