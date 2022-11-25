import logo from './reddit-icon.png';
import './header.css';
import { setSearchTerm } from '../../features/filter/filterSlice';
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();

  const handleTermChange = ({target}) => {
    dispatch(setSearchTerm(target.value));
  }

  return (
    <header>
      <div className='logo'>
        <div className='logo-image'>
          <img src={logo} alt='Reddit logo'/>
        </div>
        <div className='logo-text'>
          <span>Tiny</span><span className='orange'>Reddit</span>
        </div>
      </div>
      <div className='search'>
        <input id='search-box' placeholder="Search..." onChange={handleTermChange}/>
      </div>
    </header>
  );
}

export default Header;