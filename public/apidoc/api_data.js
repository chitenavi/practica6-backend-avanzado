define({ "api": [
  {
    "type": "delete",
    "url": "/api/v1/adverts/:id",
    "title": "5.Delete an advert (requires auth token)",
    "name": "DeleteAdvert",
    "group": "Adverts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Advert id</p>"
          }
        ]
      }
    },
    "description": "<p>Delete one advert by id param</p>",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Cast to ObjectId failed for value \\\"5f5a1e9e30fd0ba17c4110cbe\\\" at path \\\"_id\\\" for model \\\"Advert\\\"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/advertController.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "get",
    "url": "/api/v1/adverts/:id",
    "title": "2.Find an advert (requires auth token)",
    "name": "GetAdvert",
    "group": "Adverts",
    "description": "<p>Get one advert by id param</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/api/v1/adverts/5f59fc8f53bab60f7d995367",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Advert id</p>"
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
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.advert",
            "description": "<p>Advert data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"results\": 8,\n  \"data\": {\n      \"advert\": {\n          \"sale\": true,\n          \"tags\": [\n              \"lifestyle\",\n              \"motor\"\n            ],\n          \"_id\": \"5f59fc8f53bab60f7d995367\",\n          \"name\": \"Bicicleta\",\n          \"price\": 230.15,\n          \"tinyDescription\": \"Ut enim ad minim veniam, quis nostrud exercitation ullamco...\",\n          \"description\": \"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\",\n          \"image\": \"bici.jpg\",\n          \"__v\": 0\n      }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Cast to ObjectId failed for value \\\"5f5s9fc8f53bab60f7d995367\\\" at path \\\"_id\\\" for model \\\"Advert\\\"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/advertController.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "get",
    "url": "/api/v1/adverts",
    "title": "1.List all adverts (requires auth token)",
    "name": "GetAllAdverts",
    "group": "Adverts",
    "description": "<p>Get all the ads, and you can filter according to the arguments described</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/api/v1/adverts",
        "type": "json"
      },
      {
        "title": "Filter usage:",
        "content": "By name:\ncurl -i http://localhost/api/v1/adverts?name=ipho\nBy price:\ncurl -i http://localhost/api/v1/adverts?price=100-500\nBy sale (on sale:true or to buy:false):\ncurl -i http://localhost/api/v1/adverts?sale=false\nBy tag:\ncurl -i http://localhost/api/v1/adverts?tags=work,mobile\nSort by price:\ncurl -i http://localhost/api/v1/adverts?sort=price\nLimit obtained fields:\ncurl -i http://localhost/api/v1/adverts?fields=name,price\nPaginate:\ncurl -i http://localhost/api/v1/adverts?start=1&limit=4",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "results",
            "description": "<p>Number of adverts</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.adverts",
            "description": "<p>Adverts's list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"results\": 8,\n  \"data\": {\n  \"adverts\": [\n       {\n           \"sale\": true,\n           \"tags\": [\n               \"lifestyle\",\n               \"motor\"\n           ],\n           \"_id\": \"5f59fc8f53bab60f7d995367\",\n           \"name\": \"Bicicleta\",\n           \"price\": 230.15,\n           \"tinyDescription\": \"Ut enim ad minim veniam, quis nostrud exercitation ullamco...\",\n           \"description\": \"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\",\n           \"image\": \"bici.jpg\"\n       }, ...\n     ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/advertController.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "get",
    "url": "/api/v1/adverts/tags/",
    "title": "6.Find all exist tags (requires auth token)",
    "name": "GetAllTags",
    "group": "Adverts",
    "description": "<p>Get all exist tags in th DB</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/api/v1/adverts/tags",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
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
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "data.tags",
            "description": "<p>Adverts tags list in DB</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"data\": {\n  \"tags\": [\n       \"lifestyle\",\n       \"mobile\",\n       \"motor\",\n       \"work\"\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/advertController.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "post",
    "url": "/api/v1/adverts/",
    "title": "3.Create an advert (requires auth token)",
    "name": "PostAdvert",
    "group": "Adverts",
    "description": "<p>Create one advert, content in the body (form-data)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "image",
            "description": "<p>Advert file image (jpg/png)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Advert name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Advert price</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Advert description</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "sale",
            "description": "<p>Advert type (to sale:true, to buy: false)</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Advert tags (work, mobile, lifestyle, motor)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"image\": \"telefono.jpg\",\n  \"name\": \"Telefono movil\",\n  \"price\": 234,\n  \"description\": \"ddfkedkfekfekfkekfekkek\",\n  \"sale\": \"false\",\n  \"tags\": \"mobile\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.advert",
            "description": "<p>Advert data created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"results\": 8,\n  \"data\": {\n      \"advert\": {\n          \"sale\": true,\n          \"tags\": [\n              \"lifestyle\",\n              \"motor\"\n            ],\n          \"createdAt\": \"2020-09-10T12:39:49.460Z\",\n          \"_id\": \"5f5a1e9e30f0ba17c4110cbe\",\n          \"name\": \"Telefono movil\",\n          \"price\": 234,\n          \"description\": \"ddfkedkfekfekfkekfekkek\",\n          \"tinyDescription\": \"ddfkedkfekfekfkekfekkek...\",\n          \"image\": \"image_1599741598878_20200812_115221.jpg\",\n          \"__v\": 0\n      }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"status\": \"fail\",\n  \"code\": 422,\n  \"message\": \"\\n- name: Product must have a name\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/advertController.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "put",
    "url": "/api/v1/adverts/:id",
    "title": "4.Update an advert (requires auth token)",
    "name": "PutAdvert",
    "group": "Adverts",
    "description": "<p>Update one advert by id param</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Advert id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Advert name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Advert price</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"Telefono movil actualizado\",\n  \"price\": 154,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.advert",
            "description": "<p>Advert data updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"results\": 8,\n  \"data\": {\n      \"advert\": {\n          \"sale\": true,\n          \"tags\": [\n              \"lifestyle\",\n              \"motor\"\n            ],\n          \"createdAt\": \"2020-09-10T12:39:49.460Z\",\n          \"_id\": \"5f5a1e9e30f0ba17c4110cbe\",\n          \"name\": \"Telefono movil actualizado\",\n          \"price\": 154,\n          \"description\": \"ddfkedkfekfekfkekfekkek\",\n          \"tinyDescription\": \"ddfkedkfekfekfkekfekkek...\",\n          \"image\": \"image_1599741598878_20200812_115221.jpg\",\n          \"__v\": 0\n      }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"status\": \"fail\",\n  \"code\": 422,\n  \"message\": \"Validation failed: price: An advert must have a price\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/advertController.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "post",
    "url": "/api/v1/users/authenticate",
    "title": "1.Authenticate user API",
    "name": "Authenticate",
    "group": "Users",
    "description": "<p>Authenticate user in API. Content in body, return token JWT</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
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
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "\nHTTP/1.1 200 OK\n   {\n     \"status\": \"success\",\n     \"token\": \"eyJhbGciOiJzI1NsInR5cCI6IkpXVCJ9.eyJpZCIVmYTcwYjVhYWMzMzA5MWU0YjUxIjo4xWN7tJgLrvNha58f6Y7UJKL7_HFkkGpY\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"fail\",\n  \"code\": 401,\n  \"message\": \"User not registered!!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/api/v1/users/:id",
    "title": "5.Delete user API (requires auth token)",
    "name": "DeleteUserById",
    "group": "Users",
    "description": "<p>Delete user by ID. Only Admins. Require Auth token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error: Invalid id",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Cast to ObjectId failed for value \\\"5fa73747d7d93d9be3e5f3\\\" at path \\\"_id\\\" for model \\\"User\\\"\"\n}",
          "type": "json"
        },
        {
          "title": "Error: No token",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"fail\",\n  \"code\": 401,\n  \"message\": \"No token provided\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/v1/users",
    "title": "2.List all users (requires auth token)",
    "name": "GetAllUsers",
    "group": "Users",
    "description": "<p>Get all the users in DB. Only admins. Require Auth token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
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
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "results",
            "description": "<p>Number of users</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.users",
            "description": "<p>Users's list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "\nHTTP/1.1 200 OK\n   {\n     \"status\": \"success\",\n     \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n     \"results\": 2,\n     \"data\": {\n     \"users\": [\n          {\n              \"rol\": \"USER\",\n              \"avatar\": \"avatar-default.png\",\n              \"_id\": \"5fa70b5aac33091e4b51d809\",\n              \"username\": \"devnodepopuser\",\n              \"email\": \"user@example.com\",\n              \"__v\": 0,\n              \"createdAt\": \"2020-11-07T21:02:18.809Z\",\n              \"updatedAt\": \"2020-11-07T21:02:18.809Z\"\n          }, ...\n        ]\n     }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"fail\",\n  \"code\": 401,\n  \"message\": \"No token provided\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:id",
    "title": "3.Get a user data (requires auth token)",
    "name": "GetUserById",
    "group": "Users",
    "description": "<p>Get one user by id param. Only admins. Require auth</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
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
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.user",
            "description": "<p>User data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"status\": \"success\",\n    \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n    \"results\": 8,\n    \"data\": {\n        \"user\": {\n         \"rol\": \"USER\",\n         \"avatar\": \"avatar-default.png\",\n         \"_id\": \"5fa70b5aac33091e4b51d809\",\n         \"username\": \"devnodepopuser\",\n         \"email\": \"user@example.com\",\n         \"__v\": 0,\n         \"createdAt\": \"2020-11-07T21:02:18.809Z\",\n+           \"updatedAt\": \"2020-11-07T21:02:18.809Z\"\n+          }\n     }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"fail\",\n  \"code\": 401,\n  \"message\": \"No token provided\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/v1/users/",
    "title": "4.Create a new user (requires auth token)",
    "name": "Signup",
    "group": "Users",
    "description": "<p>Create a new user in DB. Only admins can create admin users. Require Auth token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>User avatar. Default user-avatar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rol",
            "description": "<p>User rol. ADMIN or USER. Default USER</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"username\": \"paco\",\n  \"email\": \"prueba@hola.com\",\n  \"password\": 1234\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.user",
            "description": "<p>New user created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "\nHTTP/1.1 201 OK\n   {\n     \"status\": \"success\",\n     \"token\": \"eyJhbGciOiJzI1NsInR5cCI6IkpXVCJ9.eyJpZCIVmYTcwYjVhYWMzMzA5MWU0YjUxIjo4xWN7tJgLrvNha58f6Y7UJKL7_HFkkGpY\"\n     \"data\": {\n        \"user\": { ... }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 422 Unauthorized\n{\n  \"status\": \"fail\",\n  \"code\": 422,\n  \"message\": \"User validation failed: username: Please add a username\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/controllers/userController.js",
    "groupTitle": "Users"
  }
] });
