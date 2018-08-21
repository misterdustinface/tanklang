import { expect } from 'chai'
import Compiler from '../../src/compiler'
import Opcode from '../../src/opcodes'
import { readFileSync } from 'fs'

describe('Compiler', function () {

  describe('assign multiple variables', function() {
    it('generate bytecode', function () {
      let compiler = new Compiler()
      let bytecode = compiler.compile(readFileSync('./test/factories/multiassign.tank'))
      expect(bytecode.toArray()).to.deep.eq([
        Opcode.Push, 0, 
        Opcode.Store, 1, 
        Opcode.Push, 77, 
        Opcode.Store, 1,
        Opcode.Push, 0, 
        Opcode.Store, 2, 
        Opcode.Push, 0, 
        Opcode.Store, 3, 
        Opcode.Push, 1, 
        Opcode.Store, 3, 
        Opcode.Halt
      ])
    })
  })

  describe('let a : number = 3', function() {
    it('generate bytecode', function () {
      let compiler = new Compiler()
      let bytecode = compiler.compile('let a : number = 3')
      expect(bytecode.toArray()).to.deep.eq([
        Opcode.Push, 0, 
        Opcode.Store, 1, 
        Opcode.Push, 3, 
        Opcode.Store, 1, 
        Opcode.Halt
      ])
    })

    it('generate ast', function () {
      let compiler = new Compiler()
      let ast = compiler.generateAst('let a : number = 3')
      expect(ast).to.deep.eq({
        block: {
          statements: [
            {
              nodes: [
                {
                  name: 'a',
                  type: 'number'
                },
                {
                  name: 'a',
                  value: '3'
                }
              ]
            }
          ]
        }
      })
    })
  })

})
