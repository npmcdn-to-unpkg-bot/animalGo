from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/map/')
@app.route('/map/<name>')
def hello(name=None):
    return render_template('google_maps2.html', user=name)

if __name__ == '__main__':
    app.run()
