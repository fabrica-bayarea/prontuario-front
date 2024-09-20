# Contribuindo com o Projeto
Aqui você encontrará um guia para fazer suas contribuições, como criar seus commits e branches. É importante estar atento a essas convenções, é com elas que iremos manter um histórico claro e conciso do nosso código.

### Nomenclatura de branches

O nome de uma branch git deve ser estruturado da seguinte forma:

tipo/referência-issue/descrição

**Tipos**:

- `fix` é para correção de bugs
- `feat` é para adicionar, refatorar ou remover uma funcionalidade
- `chore` é para gerenciar o processo de build, dependências, workflows de CI e outras ferramentas e bibliotecas auxiliares
- `doc` é para trabalhar na documentação

**Referência**:

O tipo da branch pode ser seguido por uma referência à Issue na qual você está trabalhando. Se não houver referência, apenas adicione 'no-ref'.

**Descrição**:

- use nomes descritivos que reflitam o propósito ou a funcionalidade da branch
- use letras minúsculas e hífens

A referência é seguida por uma descrição que resume o propósito específico desta branch e deve ser mantida curta e em kebab-case.

**Exemplos**:

```
git checkout -b fix/no-ref/corrigir-estrutura-de-rotas
git checkout -b feature/issue-14/criar-interface-do-usuario
git checkout -b chore/issue-5/adicionar-workflow-ci
```

### Mensagens de commit

A Conventional Commits specification é uma convenção leve sobre as mensagens de commit. Ela fornece um conjunto fácil de regras para criar um histórico de commits explícito, o que facilita a criação de ferramentas automatizadas, como geradores de changelog. Esta convenção se alinha com o [SemVer](http://semver.org/), descrevendo as funcionalidades, correções e mudanças feitas nas mensagens de commit.

A mensagem de commit deve ser estruturada da seguinte forma:

tipo(escopo opcional): descrição

**Tipos**:

- `fix` corrige um bug no código
- `feat` introduz uma nova funcionalidade ao código
- `refactor` é para melhorias na estrutura, legibilidade ou manutenibilidade do código
- `style` é para mudanças que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula faltando, etc)
- `chore` é para mudanças em elementos essenciais do projeto
- `doc` é para mudanças apenas na documentação

**Escopo**:
Um escopo pode ser fornecido no tipo do commit para fornecer informações contextuais adicionais e é colocado entre parênteses.

**Descrição**:

- use verbos imperativos que descrevam a ação realizada ('adicionar,' 'corrigir,' 'atualizar,' 'remover')
- a descrição não deve conter letras maiúsculas
- sem ponto (.) no final

**Exemplos**:

```
git commit -m "fix(API): corrigir códigos de status incorretos"
git commit -m "feat: adicionar validação de campo"
git commit -m "chore!: abandonar suporte para Node 6"
```

Consulte os documentos de commits convencionais [Conventional Commits docs](https://www.conventionalcommits.org/en/) para mais detalhes.
