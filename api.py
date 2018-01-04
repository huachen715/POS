from flask import Flask, request, g
from flask_restful import Resource, Api, reqparse
from sqlalchemy import create_engine
from collections import defaultdict

app = Flask(__name__)
api = Api(app)

db_connect = create_engine('sqlite:///var/POS.sqlite3')

order = {}

@app.route('/validate', methods=['POST'])
def validate():
	request_data = request.get_json(force=True)
	conn = db_connect.connect()
	query = conn.execute("select distinct password from employee_info")
	result = query.cursor.fetchall()
	final_res = []
	for element in result:
		final_res.append(element[0])
	if request_data['password'] in final_res:
		return "", 200, {'Access-Control-Allow-Origin': '*'}
	else:
		return "", 401, {'Access-Control-Allow-Origin': '*'}

@app.route('/menu', methods=['GET'])
def menu():
	conn = db_connect.connect()
	query = conn.execute("select * from menu")
	result = query.cursor.fetchall()
	final_res = defaultdict(list)
	for element in result:
		final_res[element[1]].append({'name': element[0], 'price': element[2]})
	return final_res, 200, {'Access-Control-Allow-Origin': '*'}

if __name__ == '__main__':
    app.run(port=5002)