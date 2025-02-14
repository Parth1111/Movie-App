import "../css/CategoriesBar.css";

function CategoriesBar({ category, onCategoryClick }) {
  return (
    <div className='category-bar'>
      <button onClick={onCategoryClick}>{category}</button>
    </div>
  );
}

export default CategoriesBar;