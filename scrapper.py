import requests
import os
import re

response = requests.get("https://www.dicebreaker.com/categories/roleplaying-game/best-games/best-tabletop-rpgs")
# print(response.text)

pattern = r'<div class="article_body_content">.*?<h2>Best tabletop RPGs 2024</h2>'
find = re.search(pattern, response.text, re.DOTALL).span()
article_text = response.text[find[0]:find[1]]
article_text = (article_text.replace('<div class="article_body_content">', "")
                .replace("<h2>Best tabletop RPGs 2024</h2>", "")
                .replace("    ", "")
                .replace("\n", "")
                .replace("&rsquo;", "'")
                .replace("&ndash;", "-")
                .replace("&amp;", "&")
                .replace("<p>", "")
                .replace("</p>", "\n\n"))

out_file = open("article.md", "w")
out_file.write("# Best TTRPGs in 2024\n\n")
out_file.write(article_text)
