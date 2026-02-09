import connection
from flask import Flask, render_template, request
import Shorter
app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        url = request.form["url"]
        conn = connection.connection()
        id=conn.insert(url)
        conn.close_connection()
        h = Shorter.Shorter()
        encoded = h.encode(str(id))
        return render_template("index.html", encoded=encoded)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)