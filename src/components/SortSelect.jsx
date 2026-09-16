

function SortSelect({ value, onChange }) {
  return (
    <div className="w-full">
      <label
        htmlFor="product-sort"
        className="mb-2 block text-sm font-medium text-shop-text"
      >
        Sort by
      </label>

      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="shop-control w-full rounded-lg border border-shop-border bg-shop-surface px-4 text-shop-text outline-none transition focus:border-shop-primary"
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name-az">Name: A to Z</option>
        <option value="name-za">Name: Z to A</option>
      </select>
    </div>
  );
}

export default SortSelect;