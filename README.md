# Dev coffe API - HTTP native

API REST em memória para gerenciamento de fila de pedidos de uma cafeteria. Desenvolvida como atividade 1 da AP2 da disciplina de Desenvolvimento backend

## Exemplos de Requisições (cURL)

- **Criar Pedido (POST /orders):**

    ```bash
    curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"client": "Thiago", "item": "Expresso Grande"}'

    ```

- **Listar Pedidos (GET /orders):**

    ```bash
    curl http://localhost:3000/orders

    ```

- **Filtrar Pedidos (GET /orders?status=pendente):**

```bash
curl http://localhost:3000/orders?status=pendente
```

- **Buscar Pedido por ID (GET /orders/1):**

```bash
curl http://localhost:3000/orders/1
```

- **Atualizar Status (PATCH /orders/1/status):**

```bash
curl -X PATCH http://localhost:3000/orders/1/status -H "Content-Type: application/json" -d '{"status": "pronto"}'
```

- **Deletar Pedido (DELETE /orders/1):**

```bash
curl -X DELETE http://localhost:3000/orders/1
```

## Testes de Validação da atividade

- **Proteção contra JSON Malformado:**

```bash
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"client": "Thiago", "item": '
```

- **Validação de Campos:**

```bash
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"client": "Cliente Sem Item"}'
```

- **Validação da regra de negócio: Teste para status não listado**

```bash
curl -X PATCH http://localhost:3000/orders/1/status -H "Content-Type: application/json" -d '{"status": "entregue"}'
```

- **IDs inexistentes:**

```bash
curl http://localhost:3000/orders/999
```

- **Fallback para rotas inexistentes:**

```bash
curl http://localhost:3000/rota-invalida
```

- **Verificação dos Headers:**

```bash
curl -i http://localhost:3000/orders

```
