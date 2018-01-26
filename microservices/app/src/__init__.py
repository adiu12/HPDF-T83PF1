from wit import Wit
import requests
from flask import Flask, request, redirect, render_template, make_response, abort, jsonify
import json
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


access_token = os.environ.get("ACCESSTOKEN")

client = Wit(access_token = access_token)

app = Flask(__name__)

@app.route("/", methods = ['POST'])
def index():
	
	message_text = request.form['input']

	response = client.message(message_text)
	respList = []
		
	for key, val in response['entities'].items():
		if len(val)>0:
			respList.append({'entityType':key,'entityValue': val[0]['value']})
		
	return json.dumps(respList)


if __name__ == "__main__":
	app.run()