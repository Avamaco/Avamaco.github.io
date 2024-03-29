import requests
import os
import re
from duckduckgo_search import DDGS


def get_html():
    return requests.get("https://www.dicebreaker.com/categories/roleplaying-game/best-games/best-tabletop-rpgs").text


def get_main_article(html_text):
    pattern = r'<div class="article_body_content">.*?<h2>Best tabletop RPGs 2024</h2>'
    find = re.search(pattern, html_text, re.DOTALL).span()
    article_text = html_text[find[0]:find[1]]
    article_text = (article_text.replace('<div class="article_body_content">', "")
                    .replace("<h2>Best tabletop RPGs 2024</h2>", "")
                    .replace("    ", "")
                    .replace("\n", "")
                    # .replace("&rsquo;", "'")
                    # .replace("&ndash;", "-")
                    # .replace("&amp;", "&")
                    .replace("<p>", "")
                    .replace("</p>", "\n\n"))

    out_file = open("article.md", "w", encoding='utf-8')
    out_file.write("# Best TTRPGs in 2024\n\n")
    out_file.write(article_text + "\n\n")
    out_file.close()


def get_list(html_text):
    # print(html_text)
    pattern = r'<h2>Best tabletop RPGs 2024</h2>.*?</ul>'
    find = re.search(pattern, html_text, re.DOTALL).span()
    list_text = html_text[find[0]:find[1]]
    list_text = list_text.replace("<h2>Best tabletop RPGs 2024</h2>", "")
    CLEANR = re.compile('<.*?>')
    cleantext = re.sub(CLEANR, '', list_text)
    result = cleantext.split(sep='\n')
    return [value for value in result if value != ""]


def more_articles(title_list):
    main_article = open("article.md", "a", encoding='utf-8')
    main_article.write("## List of the best tabletop RPGs\n\n")
    for title in title_list:
        inside_article = "Coś poszło nie tak :("
        link_outside = "Coś poszło nie tak :("
        for x in DDGS().text(title + " TTRPG", max_results=1):
            inside_article = x["body"]
            link_outside = x["href"]
        file_name = ''.join(filter(str.isalpha, title)).lower()
        file_path = os.path.join("list_elements", file_name + ".md")
        out_file = open(file_path, "w", encoding='utf-8')
        out_file.write("# " + title + "\n\n")
        out_file.write(inside_article + "\n\n")
        out_file.write("[Click here for more](" + link_outside + ")\n\n")
        out_file.write("[Back to the list](../article.html)\n\n")
        out_file.close()
        main_article.write("[" + title + "](list_elements/" + file_name + ".html)\n\n")
    main_article.close()


def finish_article():
    article = open("article.md", "a", encoding='utf-8')
    article.write("---\n\n[Back to the main page](main_page.html)")
    article.close()


def find_image_online(image_content):
    my_image = DDGS().images(image_content, max_results=1)
    im = "No image :("
    for x in my_image:
        im = x['image']
    return im

def write_main_page():
    main_page = open("main_page.md", "w", encoding='utf-8')
    image_link = find_image_online("Tabletop RPG")
    main_page.write("![Alt text](" + image_link + ")\n\n")
    main_page.write("# A few words about TTRPGs\n\n")
    main_page.write("Tabletop Role-Playing Games (TTRPGs) are cool because they unleash boundless creativity, allowing players to shape unique characters and weave imaginative narratives in collaborative worlds. The social interaction and dynamic storytelling inherent in TTRPGs create unforgettable experiences, fostering teamwork and a sense of camaraderie among players.")
    main_page.write("### [List of the best TTRPGs in 2024](article.html)")
    main_page.close()


if __name__ == "__main__":
    write_main_page()
    text = get_html()
    get_main_article(text)
    my_title_list = get_list(text)
    more_articles(my_title_list)
    finish_article()
