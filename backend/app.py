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
    # For demo purposes, provide mock responses if no API key is available
    if not api_key or api_key == "your_google_ai_api_key_here":
        return generate_mock_response(prompt)
    
    try:
        genai.configure(api_key=api_key)
        models = [m for m in genai.list_models() if 'generateText' in m.supported_generation_methods]
        if not models:
            return generate_mock_response(prompt)
        model = models[0].name
        completion = genai.generate_text(
            model=model,
            prompt=prompt,
            temperature=0.1,
            max_output_tokens=max_output_tokens
        )
        return completion.result
    except Exception as e:
        return generate_mock_response(prompt)

def generate_mock_response(prompt):
    """Generate mock responses for demo purposes"""
    if "attractions" in prompt.lower():
        return """### Top Attractions
* Tokyo Skytree - Iconic 634-meter tall broadcasting tower with observation decks
* Senso-ji Temple - Ancient Buddhist temple in historic Asakusa district
* Imperial Palace East Gardens - Beautiful traditional Japanese gardens
* Shibuya Crossing - World's busiest pedestrian crossing
* Meiji Shrine - Peaceful Shinto shrine surrounded by forest

### Cultural Sites
* Tokyo National Museum - Largest collection of Japanese art and artifacts
* Ghibli Museum - Dedicated to Studio Ghibli animated films
* Kabuki-za Theatre - Traditional Japanese performing arts venue

### Modern Attractions
* Tokyo Disneyland & DisneySea - World-famous theme parks
* TeamLab Borderless - Digital art museum with interactive exhibitions"""

    elif "restaurants" in prompt.lower():
        return """### Fine Dining
* Sukiyabashi Jiro - World-renowned sushi restaurant (3 Michelin stars)
* Narisawa - Innovative French-Japanese fusion cuisine
* Kikunoi - Traditional kaiseki restaurant with centuries of history

### Local Favorites
* Tsuta - First ramen shop to earn a Michelin star
* Gonpachi - Traditional izakaya featured in Kill Bill
* Jiro Dreams of Sushi - Famous tuna and sushi spot

### Street Food & Markets
* Tsukiji Outer Market - Fresh seafood and traditional breakfast
* Memory Lane (Omoide Yokocho) - Tiny yakitori stalls and bars
* Shibuya Food Show - Department store basement food court

### Budget-Friendly Options
* Ichiran Ramen - Popular tonkotsu ramen chain
* Ippudo - High-quality ramen at reasonable prices"""

    elif "itinerary" in prompt.lower():
        return """### Day 1: Traditional Tokyo
* Morning: Visit Senso-ji Temple and explore Asakusa district
* Afternoon: Imperial Palace East Gardens and Tokyo Station area
* Evening: Dinner in Ginza district

### Day 2: Modern Tokyo
* Morning: Tokyo Skytree and Sumida district
* Afternoon: Shibuya Crossing and shopping in Harajuku
* Evening: Shinjuku nightlife and observation deck

### Day 3: Culture & Entertainment
* Morning: Meiji Shrine and Omotesando shopping
* Afternoon: Ghibli Museum or Tokyo National Museum
* Evening: Traditional dinner and kabuki performance

### Day 4: Day Trip Options
* Option A: Nikko temples and hot springs
* Option B: Mount Fuji and Hakone region
* Option C: Kamakura temples and Great Buddha"""

    elif "travel tips" in prompt.lower():
        return """### Transportation
* Get a JR Pass for unlimited train travel
* Download Google Translate app with camera feature
* Use IC cards (Suica/Pasmo) for easy public transport

### Cultural Etiquette
* Bow when greeting and remove shoes indoors
* Don't eat or drink while walking
* Keep conversations quiet on public transport

### Best Time to Visit
* Spring (March-May): Cherry blossoms, mild weather
* Fall (September-November): Beautiful autumn colors
* Avoid Golden Week (late April-early May) and Obon (mid-August)

### Money & Communication
* Cash is still king - carry yen at all times
* Free WiFi available at most convenience stores
* Download offline maps and translation apps"""

    elif "flights" in prompt.lower():
        return """### Major Airlines
* Japan Airlines (JAL) - Premium service, $800-1200 round trip
* All Nippon Airways (ANA) - Excellent service, $850-1300 round trip
* United Airlines - Direct flights, $700-1100 round trip
* Delta Airlines - Good connectivity, $750-1150 round trip

### Budget Options
* AirAsia X - Budget carrier with stopovers, $400-700
* Jetstar - Low-cost with basic amenities, $450-800
* Korean Air - Via Seoul, competitive prices $600-900

### Flight Tips
* Book 2-3 months in advance for best prices
* Tuesday-Thursday departures often cheaper
* Consider stopovers in Seoul or Hong Kong for savings
* Flight time: 14-16 hours with connections, 12-13 hours direct"""

    elif "trains" in prompt.lower():
        return """### Long-Distance Options
* No direct train from New York to Tokyo (overseas travel required)
* Consider rail passes within Japan after arrival

### Japan Rail Pass
* 7-day pass: $280 (unlimited JR trains)
* 14-day pass: $450 (great for extended travel)
* 21-day pass: $580 (best value for long stays)

### Domestic Train Options in Japan
* Shinkansen (Bullet Train) - Fastest option between cities
* Express trains - Good balance of speed and cost
* Local trains - Cheapest but slowest option

### Booking Tips
* Reserve seats in advance during peak seasons
* JR Pass must be purchased before arriving in Japan
* Download Hyperdia app for train schedules"""

    elif "buses" in prompt.lower():
        return """### International Bus Travel
* No direct bus service from New York to Tokyo (requires flight)
* Bus travel within Japan after arrival

### Highway Buses in Japan
* Willer Express - Comfortable overnight buses, $30-80
* JR Bus - Reliable service connecting major cities
* Overnight buses - Tokyo to Osaka $40-60

### Local Bus Options
* City buses in Tokyo - $2-3 per ride
* Airport buses - Haneda to city center $6-8
* Tourist loop buses - $15-20 day passes

### Bus Pass Options
* Tokyo Metro & Bus Pass - $8 per day
* Regional bus passes available for longer stays
* Book through Willer Express website for discounts"""

    elif "hotels" in prompt.lower():
        if "budget" in prompt.lower():
            return """### Budget Hotels ($20-80/night)
* Capsule hotels - Unique Japanese experience, $25-40/night
* Business hotels - Basic amenities, $50-80/night
* Hostels - Shared accommodation, $20-35/night

### Recommended Budget Options
* The Millennials Shibuya - Modern capsule hotel
* Hotel Gracery Shinjuku - Godzilla-themed business hotel
* Nui Hostel - Stylish hostel in historic building

### Tips for Budget Travel
* Book early for better rates
* Stay slightly outside central Tokyo
* Consider shared bathrooms to save money"""
            
        elif "luxury" in prompt.lower():
            return """### Luxury Hotels ($200+/night)
* The Ritz-Carlton Tokyo - Ultimate luxury with city views
* Mandarin Oriental Tokyo - Sophisticated elegance
* Park Hyatt Tokyo - Featured in "Lost in Translation"

### Premium Ryokans
* Hoshinoya Tokyo - Traditional luxury in the city
* The Tokyo Station Hotel - Historic European-style elegance

### Luxury Amenities
* Michelin-starred restaurants on-site
* Spa and wellness facilities
* Concierge services for exclusive experiences
* Prime locations with stunning city views"""
            
        else:  # mid-range
            return """### Mid-Range Hotels ($80-200/night)
* Hotel New Otani Tokyo - Classic hotel with gardens
* Shibuya Sky Hotel - Modern comfort in trendy area
* Richmond Hotel Asakusa - Traditional area, modern amenities

### Boutique Options
* Hotel Ryumeikan Tokyo - Japanese hospitality with Western comfort
* Claska Hotel - Design hotel in residential area
* The Gate Hotel - Stylish hotels in prime locations

### What's Included
* Private bathrooms with high-tech toilets
* Free WiFi and international channels
* Continental or Japanese breakfast options
* 24-hour front desk service"""

    elif "weather" in prompt.lower():
        return """### Seasonal Weather Patterns
* Spring (March-May): Mild, 10-20°C, cherry blossom season
* Summer (June-August): Hot and humid, 25-35°C, rainy season in June
* Fall (September-November): Comfortable, 15-25°C, beautiful autumn colors
* Winter (December-February): Cool and dry, 5-15°C, occasional snow

### Best Time to Visit
* March-May: Perfect weather, cherry blossoms, festivals
* September-November: Comfortable temperatures, fall foliage
* Avoid: Golden Week (late April), Obon (mid-August), New Year

### What to Pack
* Spring: Light layers, rain jacket for occasional showers
* Summer: Light clothing, umbrella for rainy season
* Fall: Medium layers, light jacket for cooler evenings
* Winter: Warm clothing, but less than needed for New York winters

### Weather Tips
* Check typhoon season (September-October)
* Air quality is generally excellent
* Humidity can be high in summer months"""

    elif "budget" in prompt.lower():
        return """### Daily Budget Estimates
* Budget Travel: $60-100 per day
  - Accommodation: $25-40 (hostels, capsule hotels)
  - Food: $20-30 (convenience stores, budget restaurants)
  - Transportation: $10-15 (day passes)
  - Activities: $5-15 (temples, parks, free attractions)

* Mid-Range Travel: $150-250 per day
  - Accommodation: $80-120 (business hotels)
  - Food: $40-60 (mix of casual and nice restaurants)
  - Transportation: $15-25 (taxis occasionally)
  - Activities: $15-45 (museums, shows, experiences)

* Luxury Travel: $400+ per day
  - Accommodation: $200-500+ (luxury hotels, ryokans)
  - Food: $100-200+ (fine dining, exclusive experiences)
  - Transportation: $30-60 (private cars, premium services)
  - Activities: $50-150+ (private tours, exclusive experiences)

### Money-Saving Tips
* Use convenience store meals (surprisingly good and cheap)
* Visit temples and shrines (usually free or very cheap)
* Take advantage of free WiFi and apps
* Buy a JR Pass if traveling outside Tokyo"""

    else:
        return "I'd be happy to help you plan your trip! Please specify what type of information you're looking for."

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
    prompt = f"Provide a detailed budget estimate for a trip to {topic}. Include accommodation, food, transportation, activities, and shopping. Give headings with ### only."
    info = generate_text_with_prompt(prompt)
    return jsonify(info)

@app.route('/generate_flights')
def generate_flights():
    topic = request.args.get('topic')
    departure = request.args.get('departure', 'Your Location')
    if not topic:
        return "Error: Please provide a destination", 400
    prompt = f"Suggest flight options from {departure} to {topic}. Include major airlines, approximate prices, flight duration, and best booking tips. Give headings with ### only."
    info = generate_text_with_prompt(prompt, max_output_tokens=600)
    return jsonify(info)

@app.route('/generate_trains')
def generate_trains():
    topic = request.args.get('topic')
    departure = request.args.get('departure', 'Your Location')
    if not topic:
        return "Error: Please provide a destination", 400
    prompt = f"Suggest train travel options from {departure} to {topic}. Include train services, approximate prices, journey duration, and booking information. Give headings with ### only."
    info = generate_text_with_prompt(prompt, max_output_tokens=600)
    return jsonify(info)

@app.route('/generate_buses')
def generate_buses():
    topic = request.args.get('topic')
    departure = request.args.get('departure', 'Your Location')
    if not topic:
        return "Error: Please provide a destination", 400
    prompt = f"Suggest bus travel options from {departure} to {topic}. Include bus services, approximate prices, journey duration, and booking platforms. Give headings with ### only."
    info = generate_text_with_prompt(prompt, max_output_tokens=600)
    return jsonify(info)

@app.route('/generate_hotels')
def generate_hotels():
    topic = request.args.get('topic')
    budget = request.args.get('budget', 'mid-range')
    if not topic:
        return "Error: Please provide a destination", 400
    prompt = f"Suggest {budget} hotels and accommodations in {topic}. Include hotel names, approximate prices, amenities, location benefits, and booking tips. Give headings with ### only."
    info = generate_text_with_prompt(prompt, max_output_tokens=600)
    return jsonify(info)

@app.route('/generate_weather')
def generate_weather():
    topic = request.args.get('topic')
    if not topic:
        return "Error: Please provide a destination", 400
    prompt = f"Provide weather information and best time to visit {topic}. Include seasonal weather patterns, what to pack, and climate considerations. Give headings with ### only."
    info = generate_text_with_prompt(prompt, max_output_tokens=500)
    return jsonify(info)

@app.route('/generate_local_transport')
def generate_local_transport():
    topic = request.args.get('topic')
    if not topic:
        return "Error: Please provide a destination", 400
    prompt = f"Provide information about local transportation in {topic}. Include public transport, taxis, car rentals, bike rentals, and walking areas. Give headings with ### only."
    info = generate_text_with_prompt(prompt, max_output_tokens=500)
    return jsonify(info)

if __name__ == '__main__':
    app.run(debug=True)
