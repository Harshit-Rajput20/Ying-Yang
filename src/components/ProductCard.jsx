// import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
  const { router, currency } = useAppContext();

  return (
    <li
      onClick={() => router.push(`/product/${product._id}`)}
      className="bg-white/20 backdrop-blur-md border border-white/30 list-none rounded-2xl p-4 hover:bg-white/30 hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105"
    >
      {/* Product Image Container */}
      <div className="group relative bg-white/30 backdrop-blur-sm rounded-xl w-full h-52 flex items-center justify-center border border-white/20 overflow-hidden">
        <Image
          src={product.image[0] || "/placeholder.svg"}
          alt={product.name}
          className="group-hover:scale-110 transition-transform duration-300 object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        
        {/* Heart Icon Button */}
        <button className="absolute top-3 right-3 bg-white/40 backdrop-blur-sm hover:bg-white/60 p-2 rounded-full shadow-lg border border-white/30 transition-all duration-200 hover:scale-110">
          <Image
            className="h-3 w-3"
            src={assets.heart_icon || "/placeholder.svg"}
            alt="heart_icon"
          />
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        {/* Product Name */}
        <p className="text-base font-bold text-gray-900 w-full truncate">
          {product.name}
        </p>

        {/* Product Description */}
        <p className="w-full text-sm text-gray-700 max-sm:hidden truncate leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-800">{4.5}</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                className="h-3 w-3"
                src={
                  index < Math.floor(4)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="star_icon"
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">(2.8k)</span>
        </div>

        {/* Price and Buy Button */}
        <div className="flex items-end justify-between w-full mt-3">
          <div className="flex flex-col">
            <p className="text-lg font-bold text-gray-900">
              {currency}{product.offerPrice}
            </p>
            {product.price !== product.offerPrice && (
              <p className="text-sm text-gray-500 line-through">
                {currency}{product.price}
              </p>
            )}
          </div>
          
          <button className="max-sm:hidden bg-white/30 backdrop-blur-sm hover:bg-white/50 px-4 py-2 text-gray-800 border border-white/40 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
            Buy now
          </button>
        </div>

        {/* Mobile Buy Button */}
        <button className="sm:hidden w-full bg-white/30 backdrop-blur-sm hover:bg-white/50 py-2 text-gray-800 border border-white/40 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 mt-3">
          Buy now
        </button>
      </div>

      {/* Glass Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
    </li>
  );
};

export default ProductCard;
