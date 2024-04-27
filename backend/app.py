from flask import Flask, jsonify, request
import google.generativeai as genai
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
api_key = os.getenv("GOOGLE_API_KEY")

def generate_text_with_prompt(prompt, max_output_tokens=500):
    genai.configure(api_key=api_key)
    models = [m for m in genai.list_models() if 'generateText' in m.supported_generation_methods]
    if not models:
        return "Error: No models found", 500
    model = models[0].name
    completion = genai.generate_text(
        model=model,
        prompt=prompt,
        temperature=0.1,
        max_output_tokens=max_output_tokens
    )
    return completion.result

@app.route('/generate_attractions_info')
def generate_attractions_info():
    topic = request.args.get('topic')
    if not topic:
        return "Error: Please provide a topic", 400
    prompt = f"Provide detailed information about {topic}'s attractions only. Give headings with ### only."
    info = generate_text_with_prompt(prompt)
    return jsonify(info)

@app.route('/generate_restaurants_info')
def generate_restaurants_info():
    topic = request.args.get('topic')
    if not topic:
        return "Error: Please provide a topic", 400
    prompt = f"Provide detailed information about {topic}'s restaurants and food spots only. Give headings with ### only."
    info = generate_text_with_prompt(prompt)
    return jsonify(info)

@app.route('/generate_itinerary_info')
def generate_itinerary_info():
    topic = request.args.get('topic')

    if not topic:
        return "Error: Please provide a topic", 400

    prompt = f"Create a travel itinerary for a trip to {topic}. Give headings with ### only."
    info = generate_text_with_prompt(prompt)

    return jsonify(info)

@app.route('/generate_travel_tips')
def generate_travel_tips():
    topic = request.args.get('topic')
    if not topic:
        return "Error: Please provide a topic", 400
    prompt = f"Provide travel tips for {topic} related to transportation, Staying and Time to visit only. Give headings with ### only."
    info = generate_text_with_prompt(prompt)
    return jsonify(info)

@app.route('/generate_travel_budget')
def generate_travel_budget():
    topic = request.args.get('topic')
    if not topic:
        return "Error: Please provide a topic", 400
    prompt = f"Provide a budget estimate for a trip to {topic}."
    info = generate_text_with_prompt(prompt)
    return jsonify(info)

if __name__ == '__main__':
    app.run(debug=True)
