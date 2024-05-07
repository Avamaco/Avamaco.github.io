from fastapi import FastAPI
import sqlite3

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/tags")
def get_tags():
    con = sqlite3.connect("db.sqlite3")
    cur = con.cursor()
    res = cur.execute("SELECT * FROM obrazki_obrazektag")
    tag_names = dict(res.fetchall())
    res = cur.execute("SELECT * FROM obrazki_obrazek_tags")
    tag_occurences = [tup[2] for tup in res.fetchall()]
    result_list = [(tag_names[key], tag_occurences.count(key)) for key in tag_names.keys()]
    con.close()
    return {"results": result_list}


@app.get("/images")
def get_obrazki():
    con = sqlite3.connect("db.sqlite3")
    cur = con.cursor()
    res = cur.execute("SELECT * FROM obrazki_obrazektag")
    tag_names = dict(res.fetchall())
    res = cur.execute("SELECT id, nazwa FROM obrazki_obrazek")
    obrazek_names = dict(res.fetchall())
    res = cur.execute("SELECT * FROM obrazki_obrazek_tags")
    obrazek_tags = res.fetchall()
    con.close()
    result = []
    for key in obrazek_names.keys():
        filtered = filter(lambda x: x[1] == key, obrazek_tags)
        result.append((obrazek_names[key], [tag_names[tup[2]] for tup in filtered]))
    return {"results": result}


@app.get("/images/{tag_id}")
def get_obrazki_by_tag(tag_id: int):
    con = sqlite3.connect("db.sqlite3")
    cur = con.cursor()
    res = cur.execute("SELECT id, nazwa FROM obrazki_obrazek")
    obrazek_names = dict(res.fetchall())
    res = cur.execute(f"SELECT obrazek_id FROM obrazki_obrazek_tags WHERE obrazektag_id = {tag_id}").fetchall()
    con.close()
    return {"result": [obrazek_names[o[0]] for o in res]}


@app.post("/images/del")
def delete_obrazki(plik_json):
    do_usuniecia = plik_json["obrazki"]
    return {"usuwam": do_usuniecia}
