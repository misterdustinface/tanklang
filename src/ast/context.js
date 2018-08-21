class Variable {
  constructor(name, type, id) {
    this.name = name
    this.type = type
    this.id = id
  }
}

export default class Context {
  constructor(parent) {
    this.parent = parent
    this.symbolTable = Object.create(null)
    this.uuid = 0
  }

  nextUUID() {
    if (this.parent == null) {
      this.uuid++
      return this.uuid
    } else {
      return this.parent.nextUUID()
    }
  }

  createChildContext() {
    return new Context(this)
  }

  variableMustNotBeAlreadyDeclared(name) {
    if (this.symbolTable[name]) {
      throw `Variable ${name} already declared`
    }
  }

  variableMustBeDeclared(name) {
    if (!this.symbolTable[name]) {
      throw `Variable ${name} not defined`
    }
  }

  addVariable(name, type) {
    this.symbolTable[name] = new Variable(name, type, this.nextUUID())
    return this.symbolTable[name]
  }

  lookupVariable(name) {
    const variable = this.symbolTable[name]
    if (variable) {
      return variable
    } else if (!this.parent) {
      throw `Variable ${name} not found`
    }
    return this.parent.lookupVariable(name)
  }
}
