# app.py
import os
import requests
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import openai
from openai import OpenAI
from dotenv import load_dotenv
import logging

app = Flask(__name__)
# Allow CORS for React frontend running on localhost:5173
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Set your OpenAI API key as an environment variable: OPENAI_API_KEY
openai.api_key = os.getenv("OPENAI_API_KEY")
load_dotenv('keys.env')

client = OpenAI(
    api_key="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"
)

def scrape_product_data(url):
    """Scrapes product data from a given Amazon URL with improved headers and debugging."""
    custom_headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        'Accept-Language': 'da, en-gb, en',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Referer': 'https://www.google.com/'
    }
    r = requests.get(url, headers=custom_headers)
    
    soup = BeautifulSoup(r.content, 'html.parser')

    with open("output.html", "w", encoding="utf-8") as file:
        file.write(soup.prettify())


    title_element = soup.find("span", id="productTitle")
    title_text = title_element.get_text(strip=True) if title_element else "Title not found"

    details_table = soup.find("table", id="productDetails_detailBullets_sections1")
    if not details_table:
        return {"title": title_text, "details": {}}
    
    product_details = {}
    rows = details_table.find_all("tr")
    for row in rows:
        header_cell = row.find("th")
        value_cell = row.find("td")
        if header_cell and value_cell:
            key = header_cell.get_text(strip=True)
            value = value_cell.get_text(strip=True)
            product_details[key] = value

    product_data = {
        "title": title_text,
        "details": product_details
    }
    return product_data

def analyze_carbon_friendliness(product_data):
    prompt = f"""You are an environmental analyst AI. Evaluate the carbon-friendliness of the product based on the following details:
    
Title: {product_data.get('title')}
Details: {product_data.get('details')}

Please provide a carbon-friendliness score between 0 (not carbon-friendly) and 100 (highly carbon-friendly) along with a brief explanation.
"""
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="gpt-4o",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print("Error calling OpenAI API:", e)
        return "Error: Unable to analyze product data at this time."

@app.route("/api/analyze", methods=["POST"])
def analyze_url():
    data = request.get_json()
    url = data.get("url")
    if not url:
        return jsonify({"error": "Please provide a valid URL"}), 400
    
    product_data = scrape_product_data(url)
    if not product_data:
        return jsonify({"error": "Failed to scrape product data"}), 400
    
    analysis = analyze_carbon_friendliness(product_data)
    return jsonify({
        "product": product_data,
        "analysis": analysis
    })

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)