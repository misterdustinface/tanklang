import ohm from 'ohm-js'
import { readFileSync } from 'fs'
import { generateAst } from './ast'
import Context from './ast/context'
import ByteCode from './ast/bytecode'

class CompilationError extends Error {
  constructor(match) {
    super(`Could not compile: ${match.message}`)
    this.match = match
  }
}

export default class Compiler {
  constructor() {
    this.grammarSrc = readFileSync('./src/tank.ohm')
    this.grammar = ohm.grammar(this.grammarSrc)
    this.semantic = this.grammar.createSemantics()
    this.semantic.addOperation('toAst', generateAst)
  }

  generateAst(src) {
    let match = this.grammar.match(src)
    if (match.succeeded()) {
      return this.semantic(match).toAst()
    } else {
      throw new CompilationError(match)
    }
  }

  compile(src) {
    let bytecode = new ByteCode()
    let ast = this.generateAst(src)
    ast.analyze(new Context(null))
    ast.compile(bytecode)
    return bytecode
  }
}
