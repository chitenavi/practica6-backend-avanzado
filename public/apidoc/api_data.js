define({ "api": [
  {
    "type": "delete",
    "url": "/api/v1/adverts/:id",
    "title": "5.Delete an advert",
    "name": "DeleteAdvert",
    "group": "Adverts",
    "description": "<p>Delete one advert by id param</p>",
    "parameter": {
      "fields": {
        "Parameter": [
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
    "title": "2.Find an advert",
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
    "title": "1.List all adverts",
    "name": "GetAllAdverts",
    "group": "Adverts",
    "description": "<p>Get all the ads, and you can filter according to the arguments described</p>",
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
    "title": "6.Find all exist tags",
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
    "title": "3.Create an advert",
    "name": "PostAdvert",
    "group": "Adverts",
    "description": "<p>Create one advert, content in the body (form-data)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
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
    "title": "4.Update an advert",
    "name": "PutAdvert",
    "group": "Adverts",
    "description": "<p>Update one advert by id param</p>",
    "parameter": {
      "fields": {
        "Parameter": [
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
  }
] });
