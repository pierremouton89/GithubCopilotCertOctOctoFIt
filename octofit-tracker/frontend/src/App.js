import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const logoUrl = 'https://raw.githubusercontent.com/pierremouton89/GithubCopilotCertOctOctoFIt/main/docs/octofitapp-small.png';

function Home() {
  return (
    <section className="container py-4">
      <div className="card shadow-sm border-0 app-hero-card">
        <div className="card-body p-4 p-md-5">
          <h1 className="display-6 fw-semibold mb-3">OctoFit Tracker</h1>
          <p className="lead text-secondary mb-4">
            Track activities, teams, users, workouts, and rankings with live data from the Django REST API.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <NavLink to="/activities" className="btn btn-primary btn-sm">Explore Activities</NavLink>
            <NavLink to="/leaderboard" className="btn btn-outline-primary btn-sm">Open Leaderboard</NavLink>
            <a
              className="btn btn-link btn-sm link-primary text-decoration-none"
              href={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`}
              target="_blank"
              rel="noreferrer"
            >
              Open API Root
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' }
];

function App() {
  return (
    <>
      <header className="app-nav-wrap">
        <nav className="navbar navbar-expand-lg bg-white border-bottom" aria-label="Main navigation">
          <div className="container py-2">
            <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 fw-semibold h5 mb-0 text-primary">
              <img src={logoUrl} alt="OctoFit logo" className="octofit-logo" />
              <span>OctoFit</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#octofitNavbar"
              aria-controls="octofitNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="octofitNavbar">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) => `nav-link px-3 rounded ${isActive ? 'active fw-semibold' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <a
                className="btn btn-outline-primary btn-sm"
                href={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`}
                target="_blank"
                rel="noreferrer"
              >
                API Docs
              </a>
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
