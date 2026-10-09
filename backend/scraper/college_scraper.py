import requests
from bs4 import BeautifulSoup


def scrape_page(url):
    try:
        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        response.raise_for_status()

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        title = soup.title.string if soup.title else "No title"

        return {
            "url": url,
            "title": title.strip()
        }

    except requests.RequestException as e:
        print("Error:", e)
        return None


if __name__ == "__main__":

    url = "https://www.coeptech.ac.in/"

    data = scrape_page(url)

    print(data)