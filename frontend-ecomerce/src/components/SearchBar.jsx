import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const location = useLocation();

  // Hide search automatically when leaving /collection
  useEffect(() => {
    if (!location.pathname.includes('collection')) {
      setShowSearch(false);
    }
  }, [location, setShowSearch]);

  // Only allow search bar on collection page
  const isCollectionPage = location.pathname.includes('collection');

  if (!showSearch || !isCollectionPage) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center py-4">
      <div className="inline-flex items-center justify-center border px-3 py-2 rounded-full bg-white">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm"
          placeholder="Search products..."
        />

        <img
          src={assets.search_icon}
          className="w-4 ml-2"
          alt="search"
        />
      </div>

      <img
        src={assets.cross_icon}
        className="inline w-3 ml-4 cursor-pointer"
        alt="close"
        onClick={() => setShowSearch(false)}
      />
    </div>
  );
};

export default SearchBar;
