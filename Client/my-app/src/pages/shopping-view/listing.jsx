import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductFilter from "./filter";
import { ArrowUpDownIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllFilteredProducts } from "@/store/shop/Products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { ProductList } = useSelector((state) => state.shopProducts);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  console.log(ProductList, "product list");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p- border-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground "> 10 Products</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className=" flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {ProductList && ProductList.length > 0
            ? ProductList.map((productItem) => (
                <ShoppingProductTile
                key={productItem._id}
                 product={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
