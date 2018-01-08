from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from sqlalchemy import create_engine
from collections import defaultdict

app = Flask(__name__)
api = Api(app)

db_connect = create_engine('sqlite:///var/POS.sqlite3')

order = {}

login = {}

@app.route('/validate_table_login', methods=['POST'])
def validate_table_login():
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
			# password belongs to server
			if request_data['password'] == login[request_data['table_number']] or request_data['table_number'] not in order:
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

@app.route('/validate_delete', methods=['POST'])
def validate_delete():
	request_data = request.get_json(force=True)
	print request_data['password']
	if request_data['password'] == '8888':
		return "", 200, {'Access-Control-Allow-Origin': '*'}
	else:
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
		request_data = request.get_json(force=True)
		order[request_data['table_number']] = request_data['order']
		print request.get_json(force=True)
		return "", 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/check', methods=['POST'])
def check():
	request_data = request.get_json(force=True)
	login.pop(request_data['table_number'])
	print request_data['order']
	return "", 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/employee', methods=['GET'])
def get_employee():
	conn = db_connect.connect()
	query = conn.execute('select * from employee_info')
	result = query.cursor.fetchall()
	final_res = []
	for element in result:
		final_res.append({'first_name': element[0], 'last_name': element[1], 'dob': element[2], 'ssn': element[3], 'password': element[4]})
	return jsonify(final_res), 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/modify_employee', methods=['POST'])
def modify_employee():
	conn = db_connect.connect()
	if request.method == 'POST':
		request_data = request.get_json(force=True)
		if 'key' not in request_data:
			query = conn.execute('insert into employee_info(first_name, last_name, DOB, SSN, PASSWORD) values (?,?,?,?,?)', (
				request_data['first_name'], request_data['last_name'], request_data['dob'], request_data['ssn'], request_data['password']))
		else:
			conn.execute('update employee_info set first_name = ?, last_name = ?, DOB = ?, SSN = ?, PASSWORD = ? where password = ?', (
				request_data['first_name'], request_data['last_name'], request_data['dob'], request_data['ssn'], request_data['password'], request_data['key']))
		return "", 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/delete_employee', methods=['POST'])
def delete_employee():
	conn = db_connect.connect()
	request_data = request.get_json(force=True)
	conn.execute('delete from employee_info where password = ?', request_data['password'])
	return "", 200, {'Access-Control-Allow-Origin': '*'}



if __name__ == '__main__':
    app.run(port=5002)