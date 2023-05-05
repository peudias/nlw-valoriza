# nlw-valoriza
NodeJS project

- Cadastro de Tags (elogios possíveis)
  > Somente usuário administrador

- Cadastro de elogios
  > ID do usuário receber elogios
  
  > ID do usuário que está enviando elogios
  
  > ID da tag
  
  > Data da criação
  
- Autenticação de usuário
  > Gerar token JWT
  
  > Validar usuário logado nas rotas necessárias
  
  > Listagem de usuários
  
  > Listagem de tags
  
  > Listagem de elogios por usuário
  
# Estrutura do banco de dados

- User
> (Primary-Key) ID (uuid)

> name (varchar)

> email (varchar)

> password (varchar)

> admin (boolean)

> created_at (Date)

> updated_at (Date)

- Tag (descrição dos elogios)
> (Primary-Key) ID (uuid)

> name (varchar)

> created_at (Date)

> updated_at (Date)

- Compliments
> (Primary-Key) ID (uuid)

> (Foreign-Keys) user_sender (uuid)

> (Foreign-Keys) user_receiver (uuid)

> (Foreign-Keys) tag_id (uuid)

> message (varchar)

> created_at (Date)

