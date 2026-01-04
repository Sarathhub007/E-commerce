import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductFilter from "./filter";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllFilteredProducts } from "@/store/shop/Products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [filter, setFilter] = useState(null);
  const[sort,setSort]=useState(null);
  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  console.log(productList, "product list");

  function handlesort(value){
   
    setSort(value);
  }

  function handlefilter(getSectionId,getCurrentOpion){
     console.log(getSectionId,getCurrentOpion);
     
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:p-6">
      <ProductFilter  
      filter={filter}
      handlefilter={handlefilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground ">
              {" "}
              {productList?.length} Products
            </span>

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
              </DropdownMenuTrigger >
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handlesort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem  value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile product={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
