import { Link, useParams } from "react-router-dom";
import {fetchProducts} from "../services/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

 function ProductDetails() {
  const { id } = useParams();
 const { addToCart } = useCart();

const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} = useWishlist();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await fetchProducts();
        const foundProduct = productData.find((item) => item.id === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <section className="shop-section">
        <div className="shop-container text-center">
          <h1 className="text-3xl font-bold text-shop-text">
            Product Not Found
          </h1>

          <p className="mt-3 text-shop-muted">
            The product you're looking for doesn't exist.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-shop-primary px-6 font-semibold text-white no-underline transition hover:bg-shop-primary-hover"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-section">
      <div className="shop-container">

        <div className="grid gap-10 lg:grid-cols-8">

          {/* Product Image */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-shop-border bg-shop-surface">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="aspect-square w-full bg-shop-image object-contain p-8"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-3">
            <p className="text-sm font-medium text-shop-muted">
              Product Details
            </p>

            <h1 className="mt-2 text-3xl font-bold text-shop-text">
              {product.title}
            </h1>

            <p className="mt-5 text-2xl font-bold text-shop-primary">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-6 leading-7 text-shop-muted">
              Discover more about this product and enjoy a simple shopping
              experience with ShopHub.
            </p>

           <button
                 type="button"
              onClick={() => addToCart(product)}
           className="mt-8 flex min-h-11 w-full items-center justify-center rounded-lg bg-shop-primary px-6 font-semibold text-white transition hover:bg-shop-primary-hover"
>
              Add to Cart
          </button>
      
       <button
          type="button"
             onClick={() =>
            isInWishlist(product.id)
                ? removeFromWishlist(product.id)
            : addToWishlist(product)
  }
  className="mt-3 flex min-h-11 w-full items-center justify-center rounded-lg border border-shop-primary px-6 font-semibold text-shop-primary transition hover:bg-shop-primary hover:!text-white"
>
          {isInWishlist(product.id)
                 ? "Remove from Wishlist"
                  : "Add to Wishlist"}
                </button>


            <Link
              to="/products"
              className="mt-3 flex min-h-11 items-center justify-center rounded-lg border border-shop-primary px-6 font-semibold text-shop-primary no-underline transition hover:bg-shop-primary hover:!text-white"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
