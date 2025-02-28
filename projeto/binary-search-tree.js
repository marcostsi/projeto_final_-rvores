export class Node {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }

  toString() {
    // Valor do nó
    let texto = String(this.value)

    // .toString() das subárvores
    const left = this.left?.toString().split('\n')
    const right = this.right?.toString().split('\n')

    // Se não tiver esquerda nem direita não exibe a árvore, apenas o valor
    if (this.left || this.right) {
      texto += '\n'

      // Se houver esquerda, constrói a árvore do node da esquerda
      if (this.left) {
        // Adiciona as barrinhas verticais │ e espaços à esquerda de cada linha
        for (let i = 1; i < left.length; i++) {
          left[i] = '│   ' + left[i]
        }
        // Adiciona a conexão ├── à esquerda da primeira linha da subárvore
        texto += '├── ' + left.join('\n') + '\n'
      } else {
        // Adiciona a conexão ├ caso não exista subárvore
        texto += '├\n'
      }
      
      // Se houver direita, constrói a árvore do node da direita
      if (this.right) {
        // Adiciona espaços à esquerda de cada linha
        for (let i = 1; i < right.length; i++) {
          right[i] = '    ' + right[i]
        }
        // Adiciona a conexão └── à esquerda da primeira linha da subárvore
        texto += '└── ' + right.join('\n')
      } else {
        // Adiciona a conexão └ caso não exista subárvore
        texto += '└'
      }
    }

    return texto
  }
}

export class BinarySearchTree {
  constructor(root = null) {
    this.root = root
  }

  // Insere um nó na árvore (current é a árvore atual)
  // Pode ser necessário chamar recursivamente para acessar as sub-árvores
  insert(node, current = this.root) {
    // Se o nó da raiz for nulo, o nó ficará na raiz
    if (this.root === null) {
      this.root = node
    }

    // Se o nó raiz não for nulo
    else {
      // Se o valor do novo nó for menor que o valor do nó atual, ele ficará à esquerda
      if (node.value < current.value) {
        // Se o nó da esquerda for nulo, insere ele aqui
        if (current.left === null) {
          current.left = node
        }

        // Se o nó da esquerda não for nulo, procura o nó no nível mais abaixo para inserir
        else {
          this.insert(node, current.left)
        }
      } else {
        // Se o nó da direita for nulo, insere ele aqui
        if (current.right === null) {
          current.right = node
        }

        // Se o nó da direita não for nulo, procura o nó no nível mais abaixo para inserir
        else {
          this.insert(node, current.right)
        }
      }
    }
  }

  // Apaga um nó da árvore, para fazer isso, chama a função recursiva removeNode que retorna a árvore atualizada
  remove(value) {
    this.root = this.removeNode(value)
  }

  // Função recursiva que retorna a árvore com o nó removido
  removeNode(value, current = this.root) {
    // Se o nó atual for nulo, a árvore está vazia
    if (current === null) {
      return null
    }

    // Se os dados a serem excluídos são menores que os dados atuais, percorre à esquerda
    if (value < current.value) {
      // Substitui a parte esquerda da árvore pelo resultado da função recursiva
      current.left = this.removeNode(value, current.left)
      return current
    }

    // Se os dados a serem excluídos são maiores que os dados atuais, percorre à direita
    else if (value > current.value) {
      // Substitui a parte direita da árvore pelo resultado da função recursiva
      current.right = this.removeNode(value, current.right)
      return current
    }

    // Se o nó NÃO CONTÉM FILHOS, deleta ele
    // Retornando null, a função recursiva vai substituir o nó por null
    if (current.left === null && current.right === null) {
      return null
    }

    // Se o nó CONTÉM UM FILHO, deleta o nó e retorna o filho
    // Retornando o filho, a função recursiva vai substituir o nó pelo filho
    if (current.left === null) {
      return current.right
    } else if (current.right === null) {
      return current.left
    }

    // Se o nó contém DOIS FILHOS, substitui o valor do nó pelo valor do sucessor
    // O sucessor é o nó com o menor valor, mas ainda sim maior que o nó a ser deletado
    // Procura o nó com o menor valor na árvore da direita (pois a árvore esquerda só contém valores menores)
    const minNode = this.findMinNode(current.right)

    // Substitui o valor do nó atual pelo valor do sucessor
    current.value = minNode.value

    // Procura e deleta o sucessor da árvore da direita
    current.right = this.removeNode(minNode.value, current.right)

    return current
  }

  // Procura o nó com o menor valor na árvore, navegando nas subárvores da esquerda
  findMinNode(node) {
    // Se não houver nó à esquerda, este é o nó com o menor valor
    if (node.left === null) {
      return node
    }

    // Se houver nó à esquerda, procura o nó com o menor valor na árvore da esquerda
    else {
      return this.findMinNode(node.left)
    }
  }

  // Procura um valor na árvore recursivamente
  search(value, current = this.root) {
    // Se o nó atual for nulo, o valor não existe na árvore
    if (current === null) {
      return null
    }

    // Se o valor for menor que o valor do nó atual, procura à esquerda
    if (value < current.value) {
      return this.search(value, current.left)
    }

    // Se o valor for maior que o valor do nó atual, procura à direita
    else if (value > current.value) {
      return this.search(value, current.right)
    }

    // Se o valor for igual ao valor do nó atual, o valor é o nó atual
    else {
      return current
    }
  }

  toString() {
    if (this.root) {
      return this.root.toString()
    } else {
      return '(Árvore vazia)'
    }
  }
}

const bst = new BinarySearchTree()
console.log(bst.toString())

bst.insert(new Node(25))
console.log("\n# Inserindo 25")
console.log(bst.toString())

bst.insert(new Node(20))
console.log("\n# Inserindo 20")
console.log(bst.toString())

bst.insert(new Node(36))
console.log("\n# Inserindo 36")
console.log(bst.toString())

bst.insert(new Node(10))
console.log("\n# Inserindo 10")
console.log(bst.toString())

bst.insert(new Node(22))
console.log("\n# Inserindo 22")
console.log(bst.toString())

bst.insert(new Node(30))
console.log("\n# Inserindo 30")
console.log(bst.toString())

bst.insert(new Node(40))
console.log("\n# Inserindo 40")
console.log(bst.toString())

bst.insert(new Node(5))
console.log("\n# Inserindo 5")
console.log(bst.toString())

bst.insert(new Node(12))
console.log("\n# Inserindo 12")
console.log(bst.toString())

bst.insert(new Node(28))
console.log("\n# Inserindo 28")
console.log(bst.toString())

bst.insert(new Node(38))
console.log("\n# Inserindo 38")
console.log(bst.toString())

bst.insert(new Node(48))
console.log("\n# Inserindo 48")
console.log(bst.toString())

bst.insert(new Node(1))
console.log("\n# Inserindo 1")
console.log(bst.toString())

bst.insert(new Node(8))
console.log("\n# Inserindo 8")
console.log(bst.toString())

bst.insert(new Node(15))
console.log("\n# Inserindo 15")
console.log(bst.toString())

bst.insert(new Node(45))
console.log("\n# Inserindo 45")
console.log(bst.toString())

bst.insert(new Node(50))
console.log("\n# Inserindo 50")
console.log(bst.toString())
