const buf = Buffer.from("hello")

console.log(buf) // Hexadecimal
// <Buffer 68 65 6c 6c 6f>

// Hexadecimal = 16 bits
// Alternativas de representação do hexadecimal: 0123456789ABCDEF <- 16

console.log(buf.toJSON()) // converte para Decimal
// { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }