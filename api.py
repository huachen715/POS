from flask import Flask, request
from flask_restful import Resource, Api, reqparse
# from sqlalchemy import create_engine
from json import dumps
from flask.ext.jsonpify import jsonify
import os
import sqlite3
from flask import g

app = Flask(__name__)
api = Api(app)


# DATABASE = '/var/POS.sqlite3'

# def get_db():
#     db = getattr(g, '_database', None)
#     if db is None:
#         db = g._database = sqlite3.connect(DATABASE)
#     return db

# @app.teardown_appcontext
# def close_connection(exception):
#     db = getattr(g, '_database', None)
#     if db is not None:
#         db.close()

class test1(Resource):
	def get(self):
		return {'test': 1}

class test2(Resource):
	def get(self):
		return {'test': 2}

class test(Resource):
	def get(self, id):
		result = {'test': id}
		return jsonify(result)

class validate(Resource):
	def post(self):
		request_data = request.get_json(force=True)
		print request_data['password']
		if request_data['password'] == '1111':
			return "", 200, {'Access-Control-Allow-Origin': '*'}
		else:
			return "", 401, {'Access-Control-Allow-Origin': '*'}

class menu(Resource):
	def get(self):
		# this is fake menu, change to database later
		# data = {}
		catalog= ['entree', 'appetizer', 'drink', 'sushi']
		# data['catalog'] = catalog
		return {'catalog': catalog}, 200, {'Access-Control-Allow-Origin': '*'}

class menu_item(Resource):
	def get(self, catalog):
		if catalog == 'drink':
			return {"apple juice": 20.00, "orange juice": 100.00}, 200, {'Access-Control-Allow-Origin': '*'} 
		elif catalog == 'entree':
			return {"white rice": 10.50, "brown rice": 99.99}, 200, {'Access-Control-Allow-Origin': '*'} 
		elif catalog == 'appetizer':
			return {"fried chicken": 5.55, "fries": 9.99, "fried chicken1": 5.55, "fried chicken2": 5.55, "fried chicken3": 5.55, "fried4 chicken": 5.55, "fr5ied chicken": 5.55, "fried6 chicken": 5.55, "frie7d chicken": 5.55, "frie8d chicken": 5.55, "fried 9chicken": 5.55}, 200, {'Access-Control-Allow-Origin': '*'} 
		elif catalog == 'sushi':
			return {"california roll": 8.88, "ann arbor roll": 9999999.00}, 200, {'Access-Control-Allow-Origin': '*'} 


api.add_resource(test1, '/test1')
api.add_resource(test2, '/test2')
api.add_resource(test, '/test/<id>')
api.add_resource(validate, '/validate')
api.add_resource(menu, '/menu')
api.add_resource(menu_item, '/menu/<string:catalog>')

if __name__ == '__main__':
	# cur = get_db().cursor()
	# cur.execute('SELECT * FROM menu')
	# print cur.fetchone()
	app.run(port=5002)