# Travel Buddy Application
Travel Buddy is a React + Flask web application that generates travel information for destinations using Google's Generative AI. The frontend is a React app built with Create React App, and the backend is a Flask API server that interfaces with Google's Generative AI API.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap, Build, and Test the Repository
- Install frontend dependencies: `npm install` -- takes 4-5 minutes. NEVER CANCEL. Set timeout to 10+ minutes.
- Build production frontend: `npm run build` -- takes 30-45 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
- Test frontend (note: tests currently fail due to outdated Create React App test): `npm test -- --watchAll=false` -- fails with axios import issues. This is a known limitation.
- Install Python backend dependencies: `pip3 install flask google-generativeai flask-cors python-dotenv` -- takes 2-3 minutes. NEVER CANCEL. Set timeout to 10+ minutes.
- Lint frontend code: `npx eslint src/ --ext .js,.jsx --max-warnings 0` -- takes 10-15 seconds. Always runs successfully.

### Run the Application
- Backend server: 
  - Navigate to backend directory: `cd backend`
  - Create .env file with: `GOOGLE_API_KEY=your_actual_google_api_key_here`
  - Start server: `python3 app.py` -- runs on http://127.0.0.1:5000 (port 5000)
  - Server starts in debug mode and shows "Debugger PIN" on startup
- Frontend server:
  - From repository root: `npm start` -- runs on http://localhost:3000 (port 3000)
  - Takes 15-20 seconds to compile and start. NEVER CANCEL. Set timeout to 5+ minutes.
  - Shows "Compiled successfully!" when ready
  - Displays browser URLs: Local (http://localhost:3000) and Network address

### Environment Requirements
- Node.js with npm (uses Create React App)
- Python 3.12+ with pip3
- Google Generative AI API key (required for backend functionality)

## Validation

### Manual Testing Scenarios
- ALWAYS test the complete user workflow after making changes:
  1. Start both backend (`cd backend && python3 app.py`) and frontend (`npm start`) servers
  2. Navigate to http://localhost:3000 in browser
  3. Enter a destination (e.g., "Paris") in the input field
  4. Click "Generate Info" button
  5. Verify the application shows either:
     - With valid Google API key: Travel information in 4 sections (Attractions, Restaurants, Itinerary, Travel Tips) plus Budget section
     - Without valid API key: Error messages in each section but UI remains functional
- The application gracefully handles API failures by displaying "Error: Unable to generate..." messages
- Budget section always appears when other sections complete (even with errors)

### Build and Lint Validation
- Always run `npm run build` to verify frontend builds successfully
- Always run `npx eslint src/ --ext .js,.jsx --max-warnings 0` before committing changes
- No Python linting tools are configured in this project

## Common Tasks

### Repo Structure
```
.
├── README.md              # Create React App default documentation
├── package.json           # Frontend dependencies and npm scripts
├── package-lock.json      # Locked frontend dependencies
├── .gitignore            # Git ignore rules (includes .env files)
├── public/               # Static assets (index.html, favicon, etc.)
├── src/                  # React frontend source code
│   ├── App.js           # Main React component with API calls
│   ├── App.css          # Main application styles
│   ├── Attractions.js   # Attractions component
│   ├── Restaurants.js   # Restaurants component
│   ├── Itinerary.js     # Itinerary component
│   ├── TravelTips.js    # Travel tips component
│   ├── budget.js        # Budget component
│   └── App.test.js      # Test file (currently broken)
└── backend/
    ├── app.py           # Flask API server
    └── .env             # Environment variables (create manually)
```

### API Endpoints
The Flask backend provides these endpoints (all require `topic` query parameter):
- `/generate_attractions_info` - Returns attractions information
- `/generate_restaurants_info` - Returns restaurant information  
- `/generate_itinerary_info` - Returns travel itinerary
- `/generate_travel_tips` - Returns travel tips
- `/generate_travel_budget` - Returns budget estimates

### Frontend API Integration
- Frontend makes HTTP requests to `http://127.0.0.1:5000` (hardcoded in App.js)
- Uses axios library for HTTP requests
- Implements loading states and error handling
- Processes API responses and formats them with markdown-style headings

### Common Issues and Workarounds
- **Tests fail with axios import errors**: This is a known Create React App + axios compatibility issue. Tests are not functional.
- **Backend requires Google API key**: Without a valid `GOOGLE_API_KEY` in backend/.env, API calls will fail with timeout/deadline errors
- **CORS is configured**: Flask-CORS is used to allow frontend (port 3000) to call backend (port 5000)
- **Build warnings about deprecated packages**: These are Create React App legacy warnings and can be ignored

### Development Workflow
1. Make code changes
2. Test locally by starting both servers and exercising the UI
3. Run `npx eslint src/ --ext .js,.jsx --max-warnings 0` to check for lint issues
4. Run `npm run build` to verify production build works
5. Commit changes

### Performance Notes
- Frontend npm install: ~4-5 minutes
- Frontend build: ~30-45 seconds  
- Backend pip install: ~2-3 minutes
- Server startup: ~15-20 seconds each
- API calls timeout after ~15-20 seconds without valid Google API key

### Critical Reminders
- NEVER CANCEL builds or installs - they may take several minutes
- Both backend and frontend servers must be running for full functionality
- API key is required in backend/.env for actual travel information generation
- Application works and displays appropriate errors even without valid API key