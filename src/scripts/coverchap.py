import requests
from bs4 import BeautifulSoup

base_url = "https://littlexgarden.com/one-piece/{}"
cover = {}

for i in range(1087, 1088):
    url = base_url.format(i)
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        image_tags = soup.find_all('a', href=lambda href: href and href.startswith('/static/images/'))
        for image_tag in image_tags:
            image_link = image_tag['href']
            # cover.append("https://littlexgarden.com" + image_link)
            cover[i] = "https://littlexgarden.com" + image_link
    else:
        print("Error accessing page:", url)
        
print(cover)