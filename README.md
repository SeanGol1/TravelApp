# 🧳 Backpackerer App

[🌐 Live Website](https://backpackererapp.web.app/)

Backpackerer is a full-stack travel itinerary planner designed for backpackers and long-term travelers. This app allows users to organize trips, manage destinations, and create day-by-day activity schedules — all from a clean, responsive interface.

---

## 🔧 Tech Stack

**Frontend**  
- Angular 15+  
- Angular Material (optional)  
- RxJS / HttpClient

**Backend**  
- ASP.NET Core Web API (.NET 6 or later)  
- Entity Framework Core  
- SQLite (local) or SQL Server (optional)  
- JWT Authentication

**Other**  
- RESTful API Architecture  
- Environment-based config handling  
- Third-party APIs (e.g., GeoDB via RapidAPI)

---

## 📸 Features

- 🗺️ **Trip Management**: Create and edit travel itineraries by date and location.
- 📍 **Destination Planning**: Add cities and countries using the GeoDB API.
- 🗓️ **Daily Activities**: Assign activities to days in a trip, including time and notes.
- 🔒 **Authentication**: JWT-based login for secure API access.
- 🌐 **Responsive UI**: Mobile-first design for on-the-go travel planning.

---

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/seangol1/backpackerer.git
cd backpackerer
```

---

### 2. Environment Configuration

Create a `.env` file (for local development) and define the following variables:

#### 🔐 Backend (.NET API)
Set environment variables via `launchSettings.json`, PowerShell, or `.env` loader like [DotNetEnv](https://www.nuget.org/packages/DotNetEnv/).

```json
"environmentVariables": {
  "TRAVEL_PLANNER_CONNECTION": "Data Source=travelplanner.db",
  "TOKEN_KEY": "your-jwt-secret",
  "RAPIDAPI_KEY": "your-rapidapi-key",
  "RAPIDAPI_HOST": "wft-geo-db.p.rapidapi.com"
}
```

#### 🌍 Frontend (Angular)
Create an `environment.ts` in `src/environments/`:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

---

### 3. Run the App

#### ⬆️ Backend (C# .NET)

```sh
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

#### 💻 Frontend (Angular)

```sh
cd frontend
npm install
ng serve
```

Open your browser at [http://localhost:4200](http://localhost:4200)

---

## 📦 Folder Structure

```
backpackerer/
│
├── API/               # ASP.NET Core Web API
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
│
├── website/              # Angular App
│   ├── src/
│   ├── angular.json
│   └── package.json
```

---

## 🔒 API Authentication

- JWT-based auth with Bearer tokens
- Secure login/register endpoints
- Token sent in `Authorization` header

---

## 🧪 Future Features

- ✈️ Flight and accommodation tracking
- 🧾 Budget tracking and expenses
- 🌐 PWA mode for offline use
- 📱 Mobile app wrapper (Capacitor/Ionic)

---

## 🛠️ Development Tips

- Use `launchSettings.json` to configure local environment variables for .NET.
- Use Postman or Swagger UI to test endpoints before integrating with Angular.
- Keep `config.json` and other secrets **out of version control** — use `.gitignore`.

---

## 🙌 Contributing

Contributions, ideas, and suggestions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

MIT License. See `LICENSE` file for details.

---
