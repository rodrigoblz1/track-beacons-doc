define({ "api": [
  {
    "type": "get",
    "url": "/maps/scanners/",
    "title": "Recupera os scanners de um mapa",
    "name": "GetMapScanners",
    "group": "Map",
    "version": "0.0.1",
    "description": "<p>O sistema sabe qual o mapa vinculado ao usuário que está requisitando.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>(application/json).</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Json Web Token para autenticação.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "_",
            "description": "<p>Lista contendo as informações dos scanners do mapa.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"location\": {\n            \"coordinates\": [\n                -38.488529920578,\n                -3.875927731764339\n            ],\n            \"type\": \"Point\"\n        },\n        \"_id\": \"5b08447558ac712a847ead4c\",\n        \"deviceId\": \"1\",\n        \"mapName\": \"alphaville\",\n        \"level\": 0,\n        \"__v\": 0\n    },\n    {\n        \"location\": {\n            \"coordinates\": [\n                -38.48674252820342,\n                -3.875671528347301\n            ],\n            \"type\": \"Point\"\n        },\n        \"_id\": \"5b08447958ac712a847ead4d\",\n        \"deviceId\": \"2\",\n        \"mapName\": \"alphaville\",\n        \"level\": 0,\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Erro no servidor.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 Server Error\n{\n   \"message\": \"Falha no sistema, tente novamente mais tarde\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/maps.js",
    "groupTitle": "Map"
  },
  {
    "type": "post",
    "url": "/maps/",
    "title": "Registra um novo mapa",
    "name": "RegisterMap",
    "group": "Map",
    "version": "0.0.1",
    "description": "<p>Requer usuário administrador autenticado.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>(application/json).</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Json Web Token para autenticação.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Informação contida na parte de trás do aparelho físico.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "latLngCenter",
            "description": "<p>Latitude e longitude (consecutivamente) do centro do mapa do usuário.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Informações referentes ao resultado da operação.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Mapa cadastrado com sucesso!'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>O cadastro não pode ser processado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Mapa não encontrado\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/maps.js",
    "groupTitle": "Map"
  },
  {
    "type": "get",
    "url": "/routes/(:tagsAddresses)*",
    "title": "Estado atual da rota pra uma ou várias tags",
    "name": "GetRoute",
    "group": "Route",
    "version": "0.0.2",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Json Web Token para autenticação.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tagsAddresses",
            "description": "<p>Lista de tagAddress no formato tagA/tagB/tagC...</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Lista com o objeto de rastreio de cada tag solicitada.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "routes.scannersIds",
            "description": "<p>Ids dos scanners que definem uma possível rota para a tag (na ordem).</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "routes.passedOrder",
            "description": "<p>Ids dos scanners que a tag passou próximo (na ordem).</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "routes.finished",
            "description": "<p>Se a tag já chegou no seu scanner de destino.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "routes.trackedThing",
            "description": "<p>Nome ou descrição do que está sendo rastreado.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "notFoundRoutes",
            "description": "<p>Lista com as tags as quais não foram encontradas rotas relacionadas.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"routes\": [\n        {\n            \"scannersIds\": [\n                \"ABC\",\n                \"DCE\",\n                \"FGH\"\n            ],\n            \"passedOrder\": [\n                \"ABC\",\n                \"DCE\",\n                \"EJF\"\n            ],\n            \"finished\": false,\n            \"_id\": \"5b0d8629b3b8c807f2817bf4\",\n            \"tagAddress\": \"CB77828A3F3D\",\n            \"__v\": 0,\n            \"trackedThing\": \"Guarda-roupa\",\n            \"timeCreated\": \"2018-05-29T17:21:59.146Z\",\n            \"duration\": 317,\n            \"timeRemaining\": 120\n        }\n    ],\n    \"notFoundRoutes\": [\n        \"F47EB16EA1C4\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Erro no servidor.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 Server Error\n{\n   \"message\": \"Houve um erro no sistema, tente novamente mais tarde!'\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/routes.js",
    "groupTitle": "Route"
  },
  {
    "type": "post",
    "url": "/routes/",
    "title": "Registra uma nova rota",
    "name": "RegisterRoute",
    "group": "Route",
    "version": "0.0.1",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>(application/json).</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Json Web Token para autenticação.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "tagsAddresses",
            "description": "<p>Lista com o identificador das tags que seguirão a rota.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trackedThing",
            "description": "<p>Nome/descrição do que será rastreado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "start",
            "description": "<p>Longitude e latitude do ponto de início.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "end",
            "description": "<p>Longitude e latitude do ponto de destino.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "scannersFound",
            "description": "<p>Lista de scanners encontrados na rota do usuário.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "routeGeometry",
            "description": "<p>Lista de pontos (longitude e latitude) que compõem a geometria da rota no mapa.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"scannersFound\": [\n        {\n            \"location\": {\n                \"coordinates\": [\n                    -38.488529920578,\n                    -3.875927731764339\n                ],\n                \"type\": \"Point\"\n            },\n            \"_id\": \"5b08447558ac712a847ead4c\",\n            \"deviceId\": \"1\",\n            \"mapName\": \"alphaville\",\n            \"level\": 0,\n            \"__v\": 0\n        },\n        {\n            \"location\": {\n                \"coordinates\": [\n                    -38.48674252820342,\n                    -3.875671528347301\n                ],\n                \"type\": \"Point\"\n            },\n            \"_id\": \"5b08447958ac712a847ead4d\",\n            \"deviceId\": \"2\",\n            \"mapName\": \"alphaville\",\n            \"level\": 0,\n            \"__v\": 0\n        }\n    ],\n    \"routeGeometry\": {\n        \"coordinates\": [\n            [\n                -38.48851,\n                -3.875965\n            ],\n            [\n                -38.488529,\n                -3.875929\n            ],\n            [\n                -38.487499,\n                -3.875907\n            ]\n        ],\n        \"type\": \"LineString\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>O cadastro não pode ser processado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Um ou mais scanners não foram encontrados!\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/routes.js",
    "groupTitle": "Route"
  },
  {
    "type": "delete",
    "url": "/scanners/:deviceId",
    "title": "Deleta um scanner do mapa",
    "name": "DeleteScanner",
    "group": "Scanner",
    "version": "0.0.1",
    "description": "<p>Requer usuário administrador autenticado.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Json Web Token para autenticação.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Informações referentes ao resultado da operação.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Scanner removido com sucesso!'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>A remoção não pode ser processada.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Scanner não encontrado!\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/scanners.js",
    "groupTitle": "Scanner"
  },
  {
    "type": "post",
    "url": "/scanners/",
    "title": "Registra um novo scanner",
    "name": "RegisterScanner",
    "group": "Scanner",
    "version": "0.0.1",
    "description": "<p>Requer usuário administrador autenticado.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude do local do scanner.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude do local do scanner.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>Informação contida na parte de trás do aparelho físico.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>Andar do scanner (0 é o térreo).</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>(application/json).</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Json Web Token para autenticação.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Informações referentes ao resultado da operação.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Scanner cadastrado com sucesso!'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>O cadastro não pode ser processado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Mapa não encontrado\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/scanners.js",
    "groupTitle": "Scanner"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login de um usuário",
    "name": "Login",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nome de usuário.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>(application/json).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do usuário do sistema.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nome de usuário, apelido utilizado como identificador .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token JWT utilizado para autenticação.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mapName",
            "description": "<p>Nome do mapa vinculado ao usuário.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "latLngCenter",
            "description": "<p>Latitude e longitude (consecutivamente) do centro do mapa do usuário.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"name\": \"Rodrigo\",\n    \"username\": \"rod\",\n    \"token\": \"JWT ...\",\n    \"mapName\": \"alphaville\",\n    \"latLngCenter\": [\n        -3.8794345,\n        -38.4858449\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Username ou senha incorretos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"O username ou a senha não estão corretos.\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/register",
    "title": "Registro de um usuário",
    "name": "RegisterUser",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome completo.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha contendo de 4 a 20 caracteres.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email único do usuário.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nome de usuário.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>Data de nascimento obedescendo o formato DD/MM/YYYY.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Telefone do usuário.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>(application/json).</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Json Web Token para autenticação.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Informações referentes ao resultado da operação.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Usuário cadastrado com sucesso.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntity",
            "description": "<p>O cadastro não pode ser processado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 422 Unprocessable Entity\n{\n    \"message\": \"Usuário não pode ser cadastrado.\",\n    \"errors\": [\n        \"Data de nascimento inválida\",\n        \"Nome de usuário já cadastrado\",\n        \"Email inválido\",\n        \"Senha deve conter 4 a 20 caracteres\",\n        \"Nome não informado\"\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/users.js",
    "groupTitle": "User"
  }
] });
