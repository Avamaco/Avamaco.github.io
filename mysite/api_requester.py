import requests

do_usuniecia = {"obrazki": [2, 5, 7]}

r = requests.post("http://127.0.0.1:8000/images/del", json=do_usuniecia)
print(r.json())

# import sqlite3
# tag_id = 1
#
# con = sqlite3.connect("db.sqlite3")
# cur = con.cursor()
# res = cur.execute("SELECT id, nazwa FROM obrazki_obrazek")
# obrazek_names = dict(res.fetchall())
# res = cur.execute("SELECT * FROM obrazki_obrazek_tags")
# obrazek_tags = res.fetchall()
# # res = cur.execute("SELECT sql FROM sqlite_master WHERE tbl_name = 'obrazki_obrazek_tags' AND type = 'table'")
# res = cur.execute(f"SELECT obrazek_id FROM obrazki_obrazek_tags WHERE obrazektag_id = {tag_id}")
# print([obrazek_names[o[0]] for o in res.fetchall()])
# con.close()
#
#

