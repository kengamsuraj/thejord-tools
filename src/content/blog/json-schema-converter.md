---
title: "JSON Schema Converter: Genera Schemi di Validazione Automaticamente"
date: "2025-11-17"
excerpt: "Converti JSON in JSON Schema con un click. Rileva automaticamente tipi e formati, genera schemi Draft 2020-12 o Draft 07, e documenta le tue API in modo professionale."
author: "THEJORD Team"
tags: ["tools", "json", "api", "validation", "openapi"]
---

# JSON Schema Converter: Genera Schemi di Validazione Automaticamente

La documentazione e validazione delle API è fondamentale, ma creare JSON Schema manualmente è tedioso e soggetto a errori. Oggi presentiamo il nostro **JSON Schema Converter** 📋 - uno strumento che genera automaticamente JSON Schema dai tuoi dati JSON.

## Cos'è JSON Schema?

JSON Schema è lo standard de facto per descrivere e validare strutture JSON. È usato in:

- **OpenAPI/Swagger** - Documentazione API REST
- **API Gateway** - Validazione richieste/risposte
- **Form Generation** - Generazione automatica di UI
- **Data Validation** - Librerie come Ajv, JSON Schema Validator
- **IDE Autocomplete** - IntelliSense e code completion

### Esempio Pratico

**JSON di input**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "active": true
}
```

**JSON Schema generato**:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "integer" },
    "active": { "type": "boolean" }
  },
  "additionalProperties": false
}
```

Nota come il converter ha:
- ✅ Rilevato tutti i tipi correttamente
- ✅ Identificato l'email e aggiunto `"format": "email"`
- ✅ Distinto `integer` da `number`
- ✅ Impostato `additionalProperties: false` per maggiore sicurezza

## Feature Principali

### 🎯 Auto-Detection Intelligente

Il converter analizza i tuoi dati e rileva automaticamente:

#### Tipi Primitivi
- **string** - Testo
- **number** - Numeri decimali (3.14, 2.5)
- **integer** - Numeri interi (42, 100)
- **boolean** - true/false
- **null** - Valori nulli

#### Tipi Complessi
- **object** - Oggetti nested con proprietà
- **array** - Array con inferenza del tipo degli elementi

### 📧 Format Detection

Quando abilitato, il converter rileva automaticamente formati comuni:

| Formato | Esempio | Uso |
|---------|---------|-----|
| `email` | user@example.com | Validazione email |
| `uri` | https://example.com | URL/URI |
| `uuid` | 550e8400-e29b-41d4-a716-446655440000 | Identificatori univoci |
| `date-time` | 2025-11-17T15:30:00Z | Timestamp ISO 8601 |
| `date` | 2025-11-17 | Solo data |
| `time` | 15:30:00 | Solo ora |
| `ipv4` | 192.168.1.1 | Indirizzo IPv4 |
| `ipv6` | 2001:0db8::1 | Indirizzo IPv6 |

**Esempio con format detection**:
```json
{
  "user": {
    "email": "admin@example.com",
    "website": "https://example.com",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created": "2025-11-17T15:30:00Z",
    "ip": "192.168.1.1"
  }
}
```

**Schema generato**:
```json
{
  "type": "object",
  "properties": {
    "user": {
      "type": "object",
      "properties": {
        "email": { "type": "string", "format": "email" },
        "website": { "type": "string", "format": "uri" },
        "id": { "type": "string", "format": "uuid" },
        "created": { "type": "string", "format": "date-time" },
        "ip": { "type": "string", "format": "ipv4" }
      }
    }
  }
}
```

### ⚙️ Opzioni Configurabili

#### Schema Title
Dai un nome al tuo schema per migliore documentazione:
```json
{
  "$schema": "...",
  "title": "User Profile Schema",
  "type": "object",
  ...
}
```

#### Make All Fields Required
Rendi tutti i campi obbligatori automaticamente:
```json
{
  "type": "object",
  "properties": { ... },
  "required": ["name", "email", "age"]
}
```

I campi `null` vengono esclusi dalla lista `required`.

#### Schema Version
Scegli tra:
- **Draft 2020-12** (Latest) - Supporto completo delle feature più recenti
- **Draft 07** - Compatibilità con tool più vecchi

### 🔄 Supporto Nested Objects

Gestione completa di strutture complesse:

```json
{
  "user": {
    "profile": {
      "name": "John",
      "contacts": {
        "email": "john@example.com",
        "phone": "+1234567890"
      }
    },
    "permissions": ["read", "write"],
    "metadata": {
      "created": "2025-11-17T10:00:00Z",
      "updated": "2025-11-17T15:30:00Z"
    }
  }
}
```

Il converter genera correttamente tutti i livelli di nesting con i rispettivi schemi.

### 📦 Array Support

Inferenza automatica del tipo degli elementi:

```json
{
  "tags": ["typescript", "react", "vite"],
  "scores": [95, 87, 92],
  "users": [
    { "name": "Alice", "age": 30 },
    { "name": "Bob", "age": 25 }
  ]
}
```

**Schema generato**:
```json
{
  "type": "object",
  "properties": {
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    },
    "scores": {
      "type": "array",
      "items": { "type": "integer" }
    },
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "age": { "type": "integer" }
        }
      }
    }
  }
}
```

## Casi d'Uso Reali

### 1. Documentazione API con OpenAPI

Genera rapidamente schemi per le tue specifiche OpenAPI:

```yaml
openapi: 3.0.0
paths:
  /users:
    post:
      requestBody:
        content:
          application/json:
            schema:
              # Incolla qui lo schema generato
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
                  format: email
```

### 2. Validazione con Ajv

Usa lo schema per validare dati in runtime:

```typescript
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)

const schema = {
  // Schema generato dal converter
}

const validate = ajv.compile(schema)

const data = { name: "John", email: "john@example.com" }

if (validate(data)) {
  console.log('✅ Dati validi')
} else {
  console.log('❌ Errori:', validate.errors)
}
```

### 3. Form Generation

Librerie come `react-jsonschema-form` possono generare form automaticamente:

```tsx
import Form from '@rjsf/core'

const schema = {
  // Schema generato
}

function MyForm() {
  return (
    <Form
      schema={schema}
      onSubmit={({ formData }) => console.log(formData)}
    />
  )
}
```

### 4. TypeScript Interface Generation

Usa tool come `json-schema-to-typescript` per generare types:

```bash
npm install -g json-schema-to-typescript

# Genera TypeScript types dallo schema
json-schema-to-typescript schema.json > types.ts
```

**Output**:
```typescript
export interface UserProfile {
  name: string
  email: string
  age: number
  active: boolean
}
```

### 5. Database Schema Design

Usa JSON Schema come base per definire strutture database (MongoDB, PostgreSQL JSONB, ecc.):

```javascript
// MongoDB Schema Validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      // Schema generato dal converter
    }
  }
})
```

## Workflow Consigliato

### 1. Prototipazione Rapida

```
Dati di esempio → JSON Schema Converter → Schema base → Refinement manuale
```

1. Crea un esempio rappresentativo dei tuoi dati
2. Genera lo schema con il converter
3. Aggiungi constraints aggiuntivi (min/max, pattern, enum, ecc.)

### 2. API-First Development

```
Request/Response examples → Schema → OpenAPI Spec → Code Generation
```

1. Definisci esempi di richieste/risposte
2. Genera schemi per ciascuno
3. Integra in OpenAPI specification
4. Genera client/server code

### 3. Documentation-Driven

```
JSON data → Schema → Auto-generated docs → Published API docs
```

Usa tool come Redoc o Swagger UI per pubblicare documentazione generata dagli schemi.

## Best Practices

### 1. Usa Dati Rappresentativi

Fornisci un esempio completo con tutti i campi possibili:

```json
// ❌ Incompleto
{
  "name": "John"
}

// ✅ Completo
{
  "name": "John",
  "email": "john@example.com",
  "age": 30,
  "active": true,
  "roles": ["user", "admin"],
  "metadata": {
    "created": "2025-11-17T10:00:00Z"
  }
}
```

### 2. Controlla i Formati Rilevati

Verifica sempre che i format rilevati siano corretti:
- Un codice potrebbe sembrare UUID ma non esserlo
- Una stringa potrebbe matchare il pattern email per caso

### 3. Aggiungi Constraints Manualmente

Lo schema generato è una base. Aggiungi:
- `minLength` / `maxLength` per stringhe
- `minimum` / `maximum` per numeri
- `pattern` per regex validation
- `enum` per valori predefiniti

```json
{
  "type": "string",
  "format": "email",
  "minLength": 5,
  "maxLength": 100,
  "pattern": "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
}
```

### 4. Versiona i Tuoi Schemi

Aggiungi versioning quando cambi gli schemi:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/user-profile/v2.json",
  "title": "User Profile Schema",
  "version": "2.0.0",
  ...
}
```

### 5. Usa `additionalProperties`

Il converter imposta `additionalProperties: false` per sicurezza. Valuta se:
- Mantenerlo `false` per validazione strict
- Impostarlo `true` per flessibilità
- Definire uno schema specifico per proprietà aggiuntive

## Integrazione con Tool Popolari

### VS Code JSON Schema Validation

Configura VS Code per validare JSON con il tuo schema:

```json
// settings.json
{
  "json.schemas": [
    {
      "fileMatch": ["user-profile.json"],
      "url": "./schemas/user-profile.schema.json"
    }
  ]
}
```

### Postman Schema Validation

Usa lo schema per validare risposte API in Postman:

```javascript
// Test script
pm.test("Response matches schema", function() {
  const schema = {
    // Schema generato
  }
  pm.response.to.have.jsonSchema(schema)
})
```

### Jest Testing

Valida dati nei test:

```typescript
import Ajv from 'ajv'

const ajv = new Ajv()
const schema = { /* schema */ }
const validate = ajv.compile(schema)

test('API response is valid', async () => {
  const response = await fetch('/api/users/1')
  const data = await response.json()

  expect(validate(data)).toBe(true)
})
```

## Limitazioni e Considerazioni

### 1. Inferenza Basata su Esempi

Lo schema generato si basa sull'esempio fornito. Se il tuo JSON ha:
```json
{ "age": 30 }
```

Lo schema sarà `"type": "integer"`, ma se in futuro `age` potrebbe essere `null`, dovrai aggiungere manualmente:
```json
{ "type": ["integer", "null"] }
```

### 2. Array Eterogenei

Se l'array contiene tipi misti, il converter usa il primo elemento:
```json
{
  "items": [1, "two", true]  // ❌ Difficile da gestire
}
```

Meglio usare array omogenei:
```json
{
  "numbers": [1, 2, 3],
  "strings": ["one", "two"]
}
```

### 3. Riferimenti Circolari

Strutture con riferimenti circolari vengono rilevate e marcate:
```json
{
  "description": "Circular reference detected"
}
```

Dovrai gestirle manualmente con `$ref`.

## Prossime Feature

Stiamo lavorando su:

- 🔄 **AVRO Schema Support** - Conversione JSON → AVRO per Kafka/Confluent
- 🎨 **Schema Refinement UI** - Editor visuale per aggiungere constraints
- 📊 **Batch Conversion** - Converti multipli JSON contemporaneamente
- 🔗 **Schema Merging** - Combina schemi da più esempi
- 📝 **TypeScript Generation** - Genera types direttamente dallo schema
- 💾 **Schema Library** - Salva e riusa schemi comuni

## Privacy e Open Source

Come tutti i nostri tool:
- ✅ **100% client-side** - I tuoi dati JSON non lasciano mai il browser
- ✅ **Zero tracking** - Nessuna analytics sui dati processati
- ✅ **Open source** - Codice pubblico su GitHub
- ✅ **Offline-ready** - Funziona anche senza connessione

## Prova Subito

Il **JSON Schema Converter** è disponibile gratuitamente:

👉 **[thejord.it/json-schema](https://thejord.it/json-schema)**

## Risorse Utili

- 📘 [JSON Schema Specification](https://json-schema.org/)
- 🛠️ [Ajv JSON Schema Validator](https://ajv.js.org/)
- 📖 [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)
- 🔧 [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript)

## Feedback

Hai suggerimenti? Trova un bug? Vuoi una feature?

- 📧 [admin@thejord.it](mailto:admin@thejord.it)
- 🐛 [GitHub Issues](https://github.com/thejord-it/thejord-tools/issues)
- 💡 Contribuisci al progetto open source!

---

**Conclusione**: Documentare e validare le tue API non è mai stato così facile. Il JSON Schema Converter ti fa risparmiare ore di lavoro manuale generando schemi accurati e pronti all'uso. Provalo oggi!

🚀 **[Genera il tuo primo schema →](https://thejord.it/json-schema)**
