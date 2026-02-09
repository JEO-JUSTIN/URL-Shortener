import mysql.connector

class connection:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host="localhost",
            user="jeo",
            password="1234",
            database="url"
        )
        self.cursor = self.conn.cursor()
    def get_url(self, id):
        self.cursor.execute("SELECT url FROM urls WHERE id = %s", (id,))
        return self.cursor.fetchone()[0]
    def insert(self, url):
        self.cursor.execute("INSERT INTO urls VALUES (NULL,%s)", (url,))
        self.conn.commit()
        inserted_id = self.cursor.lastrowid
        return inserted_id
    def close_connection(self):
        self.conn.close()
