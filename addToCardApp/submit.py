from flask import Flask, render_template, request, url_for, redirect, flash
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def start():
	return render_template('index.html')

@app.route('/submitted', methods=['GET', 'POST'])
def submitted():
	if request.method == 'POST':
		items = request.form.getlist('itemName')
		if items == []:
			flash('You need to choose one or more items to add it to your card!')
			return render_template('index.html')
		else:
			return render_template('postSubmit.html', items=items)
	else:
		return redirect(url_for('start'))

if __name__=='__main__':
	app.secret_key = 'secret_key'
	app.debug = True
	app.run(host='0.0.0.0', port=5000)