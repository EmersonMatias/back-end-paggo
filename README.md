# Teste Tecnico Paggo - Back End

### Índice

1. [Instalação](#instalação)
2. [Como Usar](#como-usar)

## Instalação
Para instalar e configurar o projeto localmente, siga estas etapas:
1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone o repositório do projeto:
```bash
git https://github.com/EmersonMatias/front-end-paggo
```
3. Navegue até o diretório do projeto:
```bash
cd back-end-paggo
```
4. Instale as dependências do projeto usando o npm:
```bash
cd npm i
```
## Como Usar

### Variáveis de Ambiente
Após instalar o projeto e suas dependências, precisamos configurar as variáveis de ambiente:

* Variáveis de ambiente da AWS, que podemos encontrar na parte de credênciais de segurança na seção chave de acesso.

* Região do bucket criado na AWS.

* Copiar do bucket a baseURL e adicionar na variável de ambiente.

* URL de conexão externa com o banco postgresql
### Iniciando o projeto

* Para iniciar o servidor de desenvolvimento:
```bash
npm run start:dev
```

* Para construir o projeto para produção:
```bash
npm run build
```

* Para formatar a sintaxe do código:
```bash
npm run lint
```