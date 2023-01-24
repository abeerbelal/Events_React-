import { useNavigate, useLocation } from 'react-router-dom';
import classes from './Nav.module.css';

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const showCreateEvent = location.pathname === '/form';
  const showEditEvent = location.pathname === '/formE';

  return (
    <header className={classes.header}>
        { !showCreateEvent && !showEditEvent && <h2>Events</h2>}
        { showCreateEvent && <h2>Create New Event</h2>}
        { showEditEvent && <h2>Edit Event</h2>}
        {location.pathname !== '/form' && location.pathname !== '/formE' && <button className={classes.btnNav} onClick={() => navigate('/form')}>+New </button>}
    </header>
  );
}

export default NavigationBar;
