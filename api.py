from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from sqlalchemy import create_engine
from collections import defaultdict

app = Flask(__name__)
api = Api(app)

db_connect = create_engine('sqlite:///var/POS.sqlite3')

order = {}

login = {}

@app.route('/validate', methods=['POST'])
def validate():
	request_data = request.get_json(force=True)
	conn = db_connect.connect()
	query = conn.execute("select distinct password from employee_info")
	result = query.cursor.fetchall()
	final_res = []
	for element in result:
		final_res.append(element[0])
	# correct password
	if request_data['password'] in final_res:
		# Table is occupied
		if request_data['table_number'] in login:
			print '111'
			# password belongs to server
			if request_data['password'] == login[request_data['table_number']]:
				return "", 200, {'Access-Control-Allow-Origin': '*'}
			else:
				return "", 403, {'Access-Control-Allow-Origin': '*'}
		else:
			login[request_data['table_number']] = request_data['password']
			return "", 200, {'Access-Control-Allow-Origin': '*'}
	# wrong password
	else:
		print 'wrong password'
		return "", 401, {'Access-Control-Allow-Origin': '*'}


@app.route('/menu', methods=['GET', 'POST'])
def menu():
	if request.method == 'GET':
		conn = db_connect.connect()
		query = conn.execute("select * from menu")
		result = query.cursor.fetchall()
		final_res = defaultdict(list)
		for element in result:
			final_res[element[1]].append({'name': element[0], 'price': element[2]})
		return jsonify(**final_res), 200, {'Access-Control-Allow-Origin': '*'}
	else:
		print request.get_json(force=True)
		return "", 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/check', methods=['POST'])
def check():
	request_data = request.get_json(force=True)
	login.pop(request_data['table_number'])
	print request_data
	return "", 200, {'Access-Control-Allow-Origin': '*'}


if __name__ == '__main__':
    app.run(port=5002)