from flask import Flask, request
from flask_restful import Resource, Api, reqparse
# from sqlalchemy import create_engine
from json import dumps
from flask.ext.jsonpify import jsonify

app = Flask(__name__)
api = Api(app)

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
		

api.add_resource(test1, '/test1')
api.add_resource(test2, '/test2')
api.add_resource(test, '/test/<id>')
api.add_resource(validate, '/validate')

if __name__ == '__main__':
	app.run(port=5002)