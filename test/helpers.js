import { VirtualMachine } from '../src/virtual_machine'
import Compiler from '../src/compiler'
import { readFileSync } from 'fs'

const cache = {}

export function withVM(instructions, callback) {
  return function(done) {
    let vm = new VirtualMachine(instructions)
    callback(vm)
    done()
  }
}

export function loadAndcompile(path, callback) {
  return function(done) {
    let compiler = new Compiler()
    let bytecode = compiler.compile(cache[path] || readFileSync(path))
    let program = bytecode.toProgram()
    let vm = new VirtualMachine(program)
    
    vm.run()
    callback(vm, bytecode.toArray())
    done()
  }
}

export function compile(content, callback) {
  return function(done) {
    let compiler = new Compiler()
    let bytecode = compiler.compile(content)
    let program = bytecode.toProgram()
    let vm = new VirtualMachine(program)
    vm.run()
    callback(vm, bytecode.toArray())
    done()
  }
}
