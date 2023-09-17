import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def editor():
    return render_template('editor.html')

@app.route('/load', methods=['GET'])
def load_file():
    if os.path.isfile('saved_file.txt'):
        with open('saved_file.txt', 'r') as file:
            content = file.read()
        return jsonify({'content': content})
    else:
        return jsonify({'content': ''})

@app.route('/save', methods=['POST'])
def save_file():
    data = request.get_json()
    content = data['content']
    with open('saved_file.txt', 'w') as file:
        file.write(content)
    return jsonify({'success': True})

@app.route('/delete', methods=['POST'])
def delete_file():
    if os.path.isfile('saved_file.txt'):
        os.remove('saved_file.txt')
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True)
