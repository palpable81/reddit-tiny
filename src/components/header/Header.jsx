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
      <div class='logo'>
        <div class='logo-image'>
          <img src={logo}/>
        </div>
        <div class='logo-text'>
          <span>Tiny</span><span class='orange'>Reddit</span>
        </div>
      </div>
      <div class='search'>
        <input id='search-box' placeholder="Search..." onChange={handleTermChange}/>
      </div>
    </header>
  );
}

export default Header;