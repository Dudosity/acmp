#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fileencoding=utf-8
from flask import Flask
from flask import Flask, jsonify
from flask import Flask, request  # import main Flask class and request object
# from flask_restplus import Api, Resource, fields
import tarantool
import time
import hashlib, uuid
from datetime import date, datetime
from flask_cors import CORS
from flask import Response

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
# apps = Api(app = app)
# name_space = apps.namespace('main', description='Main APIs')
server = tarantool.connect("localhost", 3301)
users = server.space('user')
contacts = server.space('contacts')
met_collection = server.space('metric_collection')
met_types = server.space('metric_types')
monitor = server.space('monitor')
m_objects = server.space('monitoring_objects')
r_scripts = server.space('reaction_scripts')
reactions = server.space('reactions')
projects = server.space('projects_structure')
r_persons = server.space('responsible_persons')
main_token = 'test_token'
codes = ['10001', '10002', '10003', '10004', '10005', '10006']


def isuser_noexist(username):
    print(str(users.select(username, index='secondary')))

    try:
        if str(users.select(username, index='secondary')) == '':
            return True
        else:
            return False
    except:
        return 'DB_ERROR'


def has_str(line):
    return hashlib.sha512(line.encode('utf-8')).hexdigest()


@app.route('/')
def main():
    return 'ACMP'


@app.route('/user/add', methods=['GET'])
def add_user():
    username = request.args.get('username')
    password = request.args.get('password')
    email = request.args.get('email')
    if isuser_noexist(username) == True:
        users.insert((hash(time.time()), username, has_str(password), email, str(hash(username))))
        responce = 'Пользователь добавлен'
        print(responce)
        return jsonify({'responce': responce, 'token': main_token}), 200
    else:
        responce = 'Такой логин есть в системе'
        print(responce)
    return jsonify({'responce': responce}), 200


@app.route('/login', methods=['GET'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    if isuser_noexist(username) == True:
        responce = 'No user'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        if str(users.select(username, index='secondary')[0][2]) == has_str(password):
            responce = 'Success login'

        else:
            responce = 'Access denied'
        print(responce)
    return jsonify(responce), 200


@app.route('/contact/add', methods=['get'])
def add_contact():
    email = request.args.get('email')
    address = request.args.get('address')
    phone_number = request.args.get('phone_number')
    token = request.args.get('token')

    if token == main_token:
        contacts.insert((hash(time.time()), email, address, phone_number))
        responce = 'Contact add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/contact/get', methods=['get'])
def get_contact():
    token = request.args.get('token')
    if token == main_token:
        responce = list(contacts.select())
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
        return jsonify(responce), 200


@app.route('/r_person/add', methods=['get'])
def add_rperson():
    name = request.args.get('name')
    role = request.args.get('role')
    type = request.args.get('type')
    monitoring_object_id = request.args.get('monitoring_object_id')
    contact_id = request.args.get('contact_id')
    token = request.args.get('token')

    if token == main_token:
        print(hash(time.time()), name, role, type, contact_id, token)
        r_persons.insert((hash(time.time()), name, role, type, int(contact_id), int(monitoring_object_id)))
        responce = 'Person add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/r_person/get', methods=['get'])
def get_rperson():
    token = request.args.get('token')

    if token == main_token:
        responce = list(r_persons.select())
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/m_types/add', methods=['get'])
def add_m_types():
    name = request.args.get('name')
    format = request.args.get('format')
    description = request.args.get('description')
    token = request.args.get('token')

    if token == main_token:
        print(hash(time.time()), name, format, description)
        met_types.insert((hash(time.time()), name, format, description))
        responce = 'Metric type add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/m_types/get', methods=['get'])
def get_m_types():
    token = request.args.get('token')

    if token == main_token:
        responce = list(met_types.select())
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/m_collection/add', methods=['get'])
def add_m_collection():
    name = request.args.get('name')
    value = request.args.get('value')
    metric_type_id = request.args.get('metric_type_id')
    monitoring_object_id = request.args.get('monitoring_object_id')
    monitor_id = request.args.get('monitor_id')
    token = request.args.get('token')

    if token == main_token:
        met_collection.insert(
            (hash(time.time()), name, value, str(datetime.now()), int(metric_type_id), int(monitoring_object_id),
             int(monitor_id)))
        responce = 'Metric collection add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/m_collection/get', methods=['get'])
def get_m_collection():
    monitor_id = request.args.get('monitor_id')
    token = request.args.get('token')

    if token == main_token:
        responce = list(met_collection.select(int(monitor_id), index='secondary'))
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/monitor/add', methods=['get'])
def add_monitor():
    name = request.args.get('name')
    monitoring_object_id = request.args.get('monitoring_object_id')
    token = request.args.get('token')

    if token == main_token:
        monitor.insert((hash(time.time()), name, str(datetime.now()), int(monitoring_object_id)))
        responce = 'Monitor add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/monitor/get', methods=['get'])
def get_monitor():
    monitoring_object_id = request.args.get('monitoring_object_id')
    token = request.args.get('token')

    if token == main_token:
        responce = list(monitor.select(int(monitoring_object_id), index='secondary'))
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/monitoring_o/add', methods=['get'])
def add_monitoring_o():
    name = request.args.get('name')
    type = request.args.get('type')
    address = request.args.get('address')
    system = request.args.get('system')
    status = request.args.get('status')
    token = request.args.get('token')

    if token == main_token:
        m_objects.insert((hash(time.time()), name, type, address, system, str(date.today()),status))
        responce = 'Monitoring object add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/monitoring_o/get', methods=['get'])
def get_monitoring_o():
    token = request.args.get('token')

    if token == main_token:
        responce = list(m_objects.select())
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/r_script/add', methods=['get'])
def add_r_script():
    name = request.args.get('name')
    condition = request.args.get('condition')
    reaction = request.args.get('reaction')
    monitoring_object_id = request.args.get('monitoring_object_id')
    token = request.args.get('token')

    if token == main_token:
        r_scripts.insert((hash(time.time()), name, condition, reaction, int(monitoring_object_id)))
        responce = 'Reaction script add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/r_script/get', methods=['get'])
def get_r_script():
    monitoring_object_id = request.args.get('monitoring_object_id')
    token = request.args.get('token')

    if token == main_token:
        responce = list(r_scripts.select(int(monitoring_object_id), index='secondary'))
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/reaction/add', methods=['get'])
def add_reaction():
    status = request.args.get('status')
    reaction_details = request.args.get('reaction_details')
    reaction_script_id = request.args.get('reaction_script_id')
    token = request.args.get('token')

    if token == main_token:
        r_scripts.insert(
            (hash(time.time()), status, str(datetime.now()), str(reaction_details), int(reaction_script_id)))
        responce = 'Monitoring object add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/reaction/get', methods=['get'])
def get_reaction():
    reaction_script_id = request.args.get('reaction_script_id')
    token = request.args.get('token')

    if token == main_token:
        responce = list(r_scripts.select(int(reaction_script_id), index='secondary'))
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/project/add', methods=['get'])
def add_project():
    name = request.args.get('name')
    description = request.args.get('description')
    monitoring_object_id = request.args.get('monitoring_object_id')
    token = request.args.get('token')

    if token == main_token:
        projects.insert((hash(time.time()), name, description, int(monitoring_object_id) ))

        responce = 'Project add'
        print(responce)
        return jsonify({'responce': responce}), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


@app.route('/project/get', methods=['get'])
def get_project():
    token = request.args.get('token')

    if token == main_token:
        responce = list(projects.select())
        print(responce)
        return jsonify(responce), 200
    else:
        responce = 'Access denied'
    return jsonify(responce), 200


if __name__ == '__main__':
    app.run()
