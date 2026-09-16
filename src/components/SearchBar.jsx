

function SearchBar({ value, onChange }) {
  return (
    <div className="w-full">
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-medium text-shop-text"
      >
        Search products
      </label>

      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        className="shop-control w-full rounded-lg border border-shop-border bg-shop-surface px-4 text-shop-text outline-none transition placeholder:text-shop-muted focus:border-shop-primary"
      />
    </div>
  );
}

export default SearchBar;